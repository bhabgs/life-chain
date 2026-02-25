import { useState } from 'react'
import { Collapse, Table, Button, Space, Modal, Form, Input, InputNumber, Switch, Tag, Popconfirm, App } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import PageContainer from '@/components/common/PageContainer'
import { memoryService } from '@/services/memory.service'

interface IStructuringRule {
  id: string
  name: string
  expression: string
  priority: number
  enabled: boolean
  category: string
}

const categoryLabels: Record<string, string> = {
  keyword: '关键词提取规则',
  person: '人物识别规则',
  event: '事件分类规则',
  stage: '阶段划分规则',
}

function RulesTable({ category }: { category: string }) {
  const { message } = App.useApp()
  const queryClient = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<IStructuringRule | null>(null)
  const [form] = Form.useForm()

  const { data, isLoading } = useQuery({
    queryKey: ['structuring-rules', category],
    queryFn: () => memoryService.getStructuringRules(category),
  })

  const saveMutation = useMutation({
    mutationFn: (values: Partial<IStructuringRule>) =>
      editing
        ? memoryService.updateStructuringRule(editing.id, values)
        : memoryService.createStructuringRule({ ...values, category }),
    onSuccess: () => {
      message.success(editing ? '更新成功' : '创建成功')
      queryClient.invalidateQueries({ queryKey: ['structuring-rules', category] })
      closeModal()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => memoryService.deleteStructuringRule(id),
    onSuccess: () => {
      message.success('删除成功')
      queryClient.invalidateQueries({ queryKey: ['structuring-rules', category] })
    },
  })

  const toggleMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      memoryService.updateStructuringRule(id, { enabled }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['structuring-rules', category] })
    },
  })

  const closeModal = () => {
    setModalOpen(false)
    setEditing(null)
    form.resetFields()
  }

  const openEdit = (record: IStructuringRule) => {
    setEditing(record)
    form.setFieldsValue(record)
    setModalOpen(true)
  }

  const columns: ColumnsType<IStructuringRule> = [
    { title: '规则名称', dataIndex: 'name', key: 'name' },
    { title: '规则表达式', dataIndex: 'expression', key: 'expression', ellipsis: true },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 80,
      sorter: (a, b) => a.priority - b.priority,
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      key: 'enabled',
      width: 80,
      render: (enabled: boolean, record: IStructuringRule) => (
        <Switch
          size="small"
          checked={enabled}
          onChange={(checked) => toggleMutation.mutate({ id: record.id, enabled: checked })}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 140,
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => openEdit(record)}>
            编辑
          </Button>
          <Popconfirm title="确定删除？" onConfirm={() => deleteMutation.mutate(record.id)} okText="确定" cancelText="取消">
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <>
      <div style={{ marginBottom: 12, textAlign: 'right' }}>
        <Button size="small" type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
          新增规则
        </Button>
      </div>
      <Table<IStructuringRule>
        rowKey="id"
        columns={columns}
        dataSource={(data?.data ?? []) as IStructuringRule[]}
        loading={isLoading}
        pagination={false}
        size="small"
      />
      <Modal
        title={editing ? '编辑规则' : '新增规则'}
        open={modalOpen}
        onOk={() => form.validateFields().then((v) => saveMutation.mutate(v))}
        onCancel={closeModal}
        confirmLoading={saveMutation.isPending}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="规则名称" rules={[{ required: true, message: '请输入' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="expression" label="规则表达式/条件" rules={[{ required: true, message: '请输入' }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="priority" label="优先级" initialValue={5} rules={[{ required: true }]}>
            <InputNumber min={1} max={10} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="enabled" label="启用" valuePropName="checked" initialValue={true}>
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default function MemoryStructuringPage() {
  const categories = ['keyword', 'person', 'event', 'stage']

  return (
    <PageContainer title="记忆结构化配置">
      <Collapse
        defaultActiveKey={['keyword']}
        items={categories.map((cat) => ({
          key: cat,
          label: (
            <Space>
              {categoryLabels[cat]}
              <Tag>{cat}</Tag>
            </Space>
          ),
          children: <RulesTable category={cat} />,
        }))}
      />
    </PageContainer>
  )
}
