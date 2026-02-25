import { useState } from 'react'
import { Table, Button, Space, Modal, Form, Input, Switch, Popconfirm, App } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import PageContainer from '@/components/common/PageContainer'
import { personalityService } from '@/services/personality.service'
import type { INaming } from '@/mocks/data/personality-templates'

export default function NamingPage() {
  const { message } = App.useApp()
  const queryClient = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<INaming | null>(null)
  const [form] = Form.useForm()

  const { data, isLoading } = useQuery({
    queryKey: ['namings'],
    queryFn: () => personalityService.getNamings(),
  })

  const createMutation = useMutation({
    mutationFn: (values: Partial<INaming>) => personalityService.createNaming(values),
    onSuccess: () => {
      message.success('创建成功')
      queryClient.invalidateQueries({ queryKey: ['namings'] })
      closeModal()
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: Partial<INaming> }) =>
      personalityService.updateNaming(id, values),
    onSuccess: () => {
      message.success('更新成功')
      queryClient.invalidateQueries({ queryKey: ['namings'] })
      closeModal()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => personalityService.deleteNaming(id),
    onSuccess: () => {
      message.success('删除成功')
      queryClient.invalidateQueries({ queryKey: ['namings'] })
    },
  })

  const closeModal = () => {
    setModalOpen(false)
    setEditingRecord(null)
    form.resetFields()
  }

  const openEdit = (record: INaming) => {
    setEditingRecord(record)
    form.setFieldsValue(record)
    setModalOpen(true)
  }

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingRecord) {
        updateMutation.mutate({ id: editingRecord.id, values })
      } else {
        createMutation.mutate(values)
      }
    })
  }

  const columns: ColumnsType<INaming> = [
    { title: '称呼方式', dataIndex: 'name', key: 'name' },
    { title: '适用关系', dataIndex: 'relationship', key: 'relationship' },
    {
      title: '使用频率',
      dataIndex: 'usageCount',
      key: 'usageCount',
      sorter: (a, b) => a.usageCount - b.usageCount,
    },
    {
      title: '是否默认',
      dataIndex: 'isDefault',
      key: 'isDefault',
      render: (val: boolean) => (val ? '是' : '否'),
    },
    {
      title: '操作',
      key: 'action',
      width: 160,
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => openEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定删除该称呼？"
            onConfirm={() => deleteMutation.mutate(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <PageContainer
      title="称呼系统配置"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
          新增称呼
        </Button>
      }
    >
      <Table<INaming>
        rowKey="id"
        columns={columns}
        dataSource={(data?.data ?? []) as INaming[]}
        loading={isLoading}
        pagination={{ showTotal: (total) => `共 ${total} 条` }}
      />

      <Modal
        title={editingRecord ? '编辑称呼' : '新增称呼'}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={closeModal}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="称呼方式" rules={[{ required: true, message: '请输入称呼方式' }]}>
            <Input placeholder="如：小助手、贴心伙伴" />
          </Form.Item>
          <Form.Item name="relationship" label="适用关系" rules={[{ required: true, message: '请输入适用关系' }]}>
            <Input placeholder="如：朋友、长辈、老师" />
          </Form.Item>
          <Form.Item name="isDefault" label="设为默认" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  )
}
