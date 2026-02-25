import { useState } from 'react'
import { Table, Button, Space, Modal, Form, Input, Select, Tag, Popconfirm, App } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import PageContainer from '@/components/common/PageContainer'
import { supportService } from '@/services/support.service'

interface IFAQ {
  id: string
  question: string
  answer: string
  category: string
  views: number
  createdAt: string
}

const categoryOptions = [
  { label: '账号问题', value: '账号问题' },
  { label: '功能使用', value: '功能使用' },
  { label: '隐私安全', value: '隐私安全' },
  { label: '记忆相关', value: '记忆相关' },
  { label: '人格相关', value: '人格相关' },
  { label: '其他', value: '其他' },
]

export default function FAQPage() {
  const { message } = App.useApp()
  const queryClient = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<IFAQ | null>(null)
  const [form] = Form.useForm()

  const { data, isLoading } = useQuery({
    queryKey: ['faqs'],
    queryFn: () => supportService.getFAQs(),
  })

  const saveMutation = useMutation({
    mutationFn: (values: Partial<IFAQ>) =>
      editing ? supportService.updateFAQ(editing.id, values) : supportService.createFAQ(values),
    onSuccess: () => {
      message.success(editing ? '更新成功' : '创建成功')
      queryClient.invalidateQueries({ queryKey: ['faqs'] })
      closeModal()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => supportService.deleteFAQ(id),
    onSuccess: () => {
      message.success('删除成功')
      queryClient.invalidateQueries({ queryKey: ['faqs'] })
    },
  })

  const closeModal = () => {
    setModalOpen(false)
    setEditing(null)
    form.resetFields()
  }

  const openEdit = (record: IFAQ) => {
    setEditing(record)
    form.setFieldsValue(record)
    setModalOpen(true)
  }

  const columns: ColumnsType<IFAQ> = [
    { title: '问题', dataIndex: 'question', key: 'question', ellipsis: true },
    { title: '回答', dataIndex: 'answer', key: 'answer', ellipsis: true },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      render: (v: string) => <Tag color="blue">{v}</Tag>,
    },
    { title: '浏览量', dataIndex: 'views', key: 'views', width: 80, sorter: (a, b) => a.views - b.views },
    {
      title: '操作',
      key: 'action',
      width: 140,
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => openEdit(record)}>编辑</Button>
          <Popconfirm title="确定删除？" onConfirm={() => deleteMutation.mutate(record.id)} okText="确定" cancelText="取消">
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <PageContainer
      title="常见问题管理"
      extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>新增FAQ</Button>}
    >
      <Table<IFAQ>
        rowKey="id"
        columns={columns}
        dataSource={(data?.data ?? []) as IFAQ[]}
        loading={isLoading}
        pagination={{ showTotal: (t) => `共 ${t} 条` }}
      />

      <Modal
        title={editing ? '编辑FAQ' : '新增FAQ'}
        open={modalOpen}
        onOk={() => form.validateFields().then((v) => saveMutation.mutate(v))}
        onCancel={closeModal}
        confirmLoading={saveMutation.isPending}
        okText="确定"
        cancelText="取消"
        width={640}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="question" label="问题" rules={[{ required: true, message: '请输入问题' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="answer" label="回答" rules={[{ required: true, message: '请输入回答' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="category" label="分类" rules={[{ required: true, message: '请选择分类' }]}>
            <Select options={categoryOptions} />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  )
}
