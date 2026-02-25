import { useState } from 'react'
import { Tabs, Card, Button, Space, Tag, Modal, Form, Input, Select, Popconfirm, Empty, App } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import PageContainer from '@/components/common/PageContainer'
import { memoryService } from '@/services/memory.service'

interface IReviewTemplate {
  id: string
  name: string
  description: string
  type: string
  stage: string
  version: string
  content: string
  createdAt: string
}

const typeLabels: Record<string, string> = {
  stage_summary: '阶段总结模板',
  annual_report: '年度报告模板',
  life_story: '人生故事模板',
}

const stageOptions = [
  { label: '全部阶段', value: 'all' },
  { label: '童年', value: 'childhood' },
  { label: '青少年', value: 'adolescence' },
  { label: '青年', value: 'youth' },
  { label: '中年', value: 'middle_age' },
  { label: '老年', value: 'old_age' },
]

function TemplateCards({ type }: { type: string }) {
  const { message } = App.useApp()
  const queryClient = useQueryClient()
  const [formOpen, setFormOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [editing, setEditing] = useState<IReviewTemplate | null>(null)
  const [previewing, setPreviewing] = useState<IReviewTemplate | null>(null)
  const [form] = Form.useForm()

  const { data, isLoading } = useQuery({
    queryKey: ['review-templates', type],
    queryFn: () => memoryService.getReviewTemplates(type),
  })

  const saveMutation = useMutation({
    mutationFn: (values: Partial<IReviewTemplate>) =>
      editing
        ? memoryService.updateReviewTemplate(editing.id, values)
        : memoryService.createReviewTemplate({ ...values, type }),
    onSuccess: () => {
      message.success(editing ? '更新成功' : '创建成功')
      queryClient.invalidateQueries({ queryKey: ['review-templates', type] })
      closeForm()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => memoryService.deleteReviewTemplate(id),
    onSuccess: () => {
      message.success('删除成功')
      queryClient.invalidateQueries({ queryKey: ['review-templates', type] })
    },
  })

  const closeForm = () => {
    setFormOpen(false)
    setEditing(null)
    form.resetFields()
  }

  const openEdit = (record: IReviewTemplate) => {
    setEditing(record)
    form.setFieldsValue(record)
    setFormOpen(true)
  }

  const templates = (data?.data ?? []) as IReviewTemplate[]

  return (
    <>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setFormOpen(true)}>
          新增模板
        </Button>
      </div>

      {isLoading ? (
        <Card loading />
      ) : templates.length === 0 ? (
        <Empty description="暂无模板" />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {templates.map((tpl) => (
            <Card
              key={tpl.id}
              size="small"
              title={tpl.name}
              extra={<Tag color="blue">v{tpl.version}</Tag>}
              actions={[
                <Button key="preview" type="link" size="small" icon={<EyeOutlined />} onClick={() => { setPreviewing(tpl); setPreviewOpen(true) }}>
                  预览
                </Button>,
                <Button key="edit" type="link" size="small" icon={<EditOutlined />} onClick={() => openEdit(tpl)}>
                  编辑
                </Button>,
                <Popconfirm key="del" title="确定删除？" onConfirm={() => deleteMutation.mutate(tpl.id)} okText="确定" cancelText="取消">
                  <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
                </Popconfirm>,
              ]}
            >
              <p style={{ color: '#666', marginBottom: 8 }}>{tpl.description}</p>
              <Space>
                <Tag>{stageOptions.find((s) => s.value === tpl.stage)?.label ?? tpl.stage}</Tag>
              </Space>
            </Card>
          ))}
        </div>
      )}

      <Modal
        title={editing ? '编辑模板' : '新增模板'}
        open={formOpen}
        onOk={() => form.validateFields().then((v) => saveMutation.mutate(v))}
        onCancel={closeForm}
        confirmLoading={saveMutation.isPending}
        okText="确定"
        cancelText="取消"
        width={640}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="模板名称" rules={[{ required: true, message: '请输入' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="描述" rules={[{ required: true, message: '请输入' }]}>
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="stage" label="适用阶段" initialValue="all" rules={[{ required: true }]}>
            <Select options={stageOptions} />
          </Form.Item>
          <Form.Item name="version" label="版本号" initialValue="1.0" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="模板内容" rules={[{ required: true, message: '请输入模板内容' }]}>
            <Input.TextArea rows={8} placeholder="支持使用 {变量名} 作为占位符" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={`预览 - ${previewing?.name}`}
        open={previewOpen}
        onCancel={() => setPreviewOpen(false)}
        footer={null}
        width={640}
      >
        <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: 16, borderRadius: 8, maxHeight: 400, overflow: 'auto' }}>
          {previewing?.content}
        </pre>
      </Modal>
    </>
  )
}

export default function MemoryReviewTemplatePage() {
  return (
    <PageContainer title="记忆回顾模板">
      <Tabs
        items={Object.entries(typeLabels).map(([key, label]) => ({
          key,
          label,
          children: <TemplateCards type={key} />,
        }))}
      />
    </PageContainer>
  )
}
