import { useState, useMemo } from 'react'
import { Card, Table, Button, Modal, Input, Form, message, Collapse, Tag, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import PageContainer from '@/components/common/PageContainer'
import { systemService } from '@/services/system.service'
import type { ISystemConfig } from '@/services/system.service'
import { formatDateTime } from '@/utils'

export default function SystemConfigPage() {
  const queryClient = useQueryClient()
  const [editingItem, setEditingItem] = useState<ISystemConfig | null>(null)
  const [form] = Form.useForm()

  const { data, isLoading } = useQuery({
    queryKey: ['system', 'config'],
    queryFn: () => systemService.getConfig(),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, value }: { id: string; value: string }) =>
      systemService.updateConfig(id, value),
    onSuccess: () => {
      message.success('更新成功')
      setEditingItem(null)
      form.resetFields()
      queryClient.invalidateQueries({ queryKey: ['system', 'config'] })
    },
    onError: () => {
      message.error('更新失败')
    },
  })

  const grouped = useMemo(() => {
    const configs = data?.data ?? []
    const map: Record<string, ISystemConfig[]> = {}
    configs.forEach((item) => {
      const group = item.group || '未分组'
      if (!map[group]) map[group] = []
      map[group].push(item)
    })
    return map
  }, [data])

  const handleEdit = (item: ISystemConfig) => {
    setEditingItem(item)
    form.setFieldsValue({ value: item.value })
  }

  const handleSave = async () => {
    const values = await form.validateFields()
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, value: values.value })
    }
  }

  const columns = [
    {
      title: '配置项',
      dataIndex: 'key',
      key: 'key',
      width: 200,
      render: (text: string) => <Tag>{text}</Tag>,
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
      ellipsis: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '最后更新',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 170,
      render: (text: string) => formatDateTime(text),
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      render: (_: unknown, record: ISystemConfig) => (
        <Button
          type="link"
          size="small"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          编辑
        </Button>
      ),
    },
  ]

  const collapseItems = Object.entries(grouped).map(([group, configs]) => ({
    key: group,
    label: (
      <Space>
        <span>{group}</span>
        <Tag color="blue">{configs.length} 项</Tag>
      </Space>
    ),
    children: (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={configs}
        pagination={false}
        size="small"
      />
    ),
  }))

  return (
    <PageContainer title="系统配置">
      <Card bordered={false} loading={isLoading}>
        <Collapse
          defaultActiveKey={Object.keys(grouped)}
          items={collapseItems}
        />
      </Card>

      <Modal
        title="编辑配置"
        open={!!editingItem}
        onOk={handleSave}
        onCancel={() => {
          setEditingItem(null)
          form.resetFields()
        }}
        confirmLoading={updateMutation.isPending}
        okText="保存"
        cancelText="取消"
      >
        {editingItem && (
          <>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#8C8C8C', marginBottom: 4 }}>配置项</div>
              <Tag>{editingItem.key}</Tag>
            </div>
            {editingItem.description && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#8C8C8C', marginBottom: 4 }}>描述</div>
                <div>{editingItem.description}</div>
              </div>
            )}
            <Form form={form} layout="vertical">
              <Form.Item
                name="value"
                label="值"
                rules={[{ required: true, message: '请输入配置值' }]}
              >
                <Input.TextArea rows={4} placeholder="请输入配置值" />
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </PageContainer>
  )
}
