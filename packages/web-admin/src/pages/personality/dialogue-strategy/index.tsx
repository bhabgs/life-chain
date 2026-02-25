import { useState } from 'react'
import {
  Tabs,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Switch,
  Tag,
  Card,
  Descriptions,
  Popconfirm,
  App,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import PageContainer from '@/components/common/PageContainer'
import { personalityService } from '@/services/personality.service'
import type {
  IReplyTemplate,
  ICompanionMode,
  IEmotionStrategy,
} from '@/mocks/data/personality-templates'

// ============ 回复模板库 Tab ============

function ReplyTemplateTab() {
  const { message } = App.useApp()
  const queryClient = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<IReplyTemplate | null>(null)
  const [form] = Form.useForm()

  const { data, isLoading } = useQuery({
    queryKey: ['reply-templates'],
    queryFn: () => personalityService.getReplyTemplates(),
  })

  const createMutation = useMutation({
    mutationFn: (values: Partial<IReplyTemplate>) =>
      personalityService.createReplyTemplate(values),
    onSuccess: () => {
      message.success('创建成功')
      queryClient.invalidateQueries({ queryKey: ['reply-templates'] })
      closeModal()
    },
    onError: () => message.error('创建失败'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: Partial<IReplyTemplate> }) =>
      personalityService.updateReplyTemplate(id, values),
    onSuccess: () => {
      message.success('更新成功')
      queryClient.invalidateQueries({ queryKey: ['reply-templates'] })
      closeModal()
    },
    onError: () => message.error('更新失败'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => personalityService.deleteReplyTemplate(id),
    onSuccess: () => {
      message.success('删除成功')
      queryClient.invalidateQueries({ queryKey: ['reply-templates'] })
    },
    onError: () => message.error('删除失败'),
  })

  const closeModal = () => {
    setModalOpen(false)
    setEditingRecord(null)
    form.resetFields()
  }

  const openEdit = (record: IReplyTemplate) => {
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

  const columns: ColumnsType<IReplyTemplate> = [
    { title: '场景', dataIndex: 'scene', key: 'scene', width: 120 },
    { title: '模板内容', dataIndex: 'content', key: 'content', ellipsis: true },
    {
      title: '使用频次',
      dataIndex: 'usageCount',
      key: 'usageCount',
      width: 100,
      sorter: (a, b) => a.usageCount - b.usageCount,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status === 'active' ? '启用' : '停用'}
        </Tag>
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
          <Popconfirm
            title="确定删除该模板？"
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
    <>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
          新增模板
        </Button>
      </div>
      <Table<IReplyTemplate>
        rowKey="id"
        columns={columns}
        dataSource={(data?.data ?? []) as IReplyTemplate[]}
        loading={isLoading}
        pagination={{ showTotal: (total) => `共 ${total} 条` }}
      />
      <Modal
        title={editingRecord ? '编辑回复模板' : '新增回复模板'}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={closeModal}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="scene" label="场景" rules={[{ required: true, message: '请输入场景' }]}>
            <Input placeholder="如：初次见面、生日祝福等" />
          </Form.Item>
          <Form.Item
            name="content"
            label="模板内容"
            rules={[{ required: true, message: '请输入模板内容' }]}
          >
            <Input.TextArea rows={4} placeholder="请输入回复模板内容" />
          </Form.Item>
          <Form.Item name="status" label="状态" valuePropName="checked">
            <Switch
              checkedChildren="启用"
              unCheckedChildren="停用"
              defaultChecked
              onChange={(checked) => form.setFieldValue('status', checked ? 'active' : 'inactive')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

// ============ 陪伴模式规则 Tab ============

function CompanionModeTab() {
  const { message } = App.useApp()
  const queryClient = useQueryClient()
  const [editingMode, setEditingMode] = useState<ICompanionMode | null>(null)
  const [configOpen, setConfigOpen] = useState(false)
  const [form] = Form.useForm()

  const { data, isLoading } = useQuery({
    queryKey: ['companion-modes'],
    queryFn: () => personalityService.getCompanionModes(),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: Partial<ICompanionMode> }) =>
      personalityService.updateCompanionMode(id, values),
    onSuccess: () => {
      message.success('更新成功')
      queryClient.invalidateQueries({ queryKey: ['companion-modes'] })
      setConfigOpen(false)
      setEditingMode(null)
      form.resetFields()
    },
    onError: () => message.error('更新失败'),
  })

  const handleToggle = (mode: ICompanionMode, enabled: boolean) => {
    updateMutation.mutate({ id: mode.id, values: { enabled } })
  }

  const openConfig = (mode: ICompanionMode) => {
    setEditingMode(mode)
    form.setFieldsValue({
      triggerCondition: mode.config.triggerCondition,
      duration: mode.config.duration,
      responseStyle: mode.config.responseStyle,
    })
    setConfigOpen(true)
  }

  const handleConfigSave = () => {
    form.validateFields().then((values) => {
      if (editingMode) {
        updateMutation.mutate({
          id: editingMode.id,
          values: { config: values },
        })
      }
    })
  }

  const modes = (data?.data ?? []) as ICompanionMode[]

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {isLoading ? (
          <Card loading />
        ) : (
          modes.map((mode) => (
            <Card key={mode.id} size="small">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ flex: 1 }}>
                  <Space style={{ marginBottom: 8 }}>
                    <h4 style={{ margin: 0 }}>{mode.name}</h4>
                    <Tag color={mode.enabled ? 'green' : 'default'}>
                      {mode.enabled ? '已启用' : '已停用'}
                    </Tag>
                  </Space>
                  <p style={{ color: '#666', marginBottom: 12 }}>{mode.description}</p>
                  <Descriptions size="small" column={1}>
                    <Descriptions.Item label="触发条件">
                      {mode.config.triggerCondition}
                    </Descriptions.Item>
                    <Descriptions.Item label="持续时长">{mode.config.duration}</Descriptions.Item>
                    <Descriptions.Item label="回复风格">
                      {mode.config.responseStyle}
                    </Descriptions.Item>
                  </Descriptions>
                </div>
                <Space direction="vertical" align="center">
                  <Switch
                    checked={mode.enabled}
                    onChange={(checked) => handleToggle(mode, checked)}
                  />
                  <Button type="link" size="small" onClick={() => openConfig(mode)}>
                    配置
                  </Button>
                </Space>
              </div>
            </Card>
          ))
        )}
      </div>

      <Modal
        title={`配置 - ${editingMode?.name}`}
        open={configOpen}
        onOk={handleConfigSave}
        onCancel={() => {
          setConfigOpen(false)
          setEditingMode(null)
          form.resetFields()
        }}
        confirmLoading={updateMutation.isPending}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="triggerCondition"
            label="触发条件"
            rules={[{ required: true, message: '请输入触发条件' }]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item
            name="duration"
            label="持续时长"
            rules={[{ required: true, message: '请输入持续时长' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="responseStyle"
            label="回复风格"
            rules={[{ required: true, message: '请输入回复风格' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

// ============ 情绪响应策略 Tab ============

function EmotionStrategyTab() {
  const { message } = App.useApp()
  const queryClient = useQueryClient()
  const [editingRecord, setEditingRecord] = useState<IEmotionStrategy | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [form] = Form.useForm()

  const { data, isLoading } = useQuery({
    queryKey: ['emotion-strategies'],
    queryFn: () => personalityService.getEmotionStrategies(),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: Partial<IEmotionStrategy> }) =>
      personalityService.updateEmotionStrategy(id, values),
    onSuccess: () => {
      message.success('更新成功')
      queryClient.invalidateQueries({ queryKey: ['emotion-strategies'] })
      setModalOpen(false)
      setEditingRecord(null)
      form.resetFields()
    },
    onError: () => message.error('更新失败'),
  })

  const openEdit = (record: IEmotionStrategy) => {
    setEditingRecord(record)
    form.setFieldsValue(record)
    setModalOpen(true)
  }

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingRecord) {
        updateMutation.mutate({ id: editingRecord.id, values })
      }
    })
  }

  const priorityColorMap: Record<number, string> = {
    1: 'red',
    2: 'orange',
    3: 'blue',
    4: 'green',
    5: 'default',
  }

  const columns: ColumnsType<IEmotionStrategy> = [
    { title: '情绪类型', dataIndex: 'emotionType', key: 'emotionType', width: 100 },
    { title: '响应策略', dataIndex: 'strategy', key: 'strategy', ellipsis: true },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      sorter: (a, b) => a.priority - b.priority,
      render: (p: number) => (
        <Tag color={priorityColorMap[p] || 'default'}>P{p}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      render: (_, record) => (
        <Button type="link" size="small" icon={<EditOutlined />} onClick={() => openEdit(record)}>
          编辑
        </Button>
      ),
    },
  ]

  return (
    <>
      <Table<IEmotionStrategy>
        rowKey="id"
        columns={columns}
        dataSource={(data?.data ?? []) as IEmotionStrategy[]}
        loading={isLoading}
        pagination={{ showTotal: (total) => `共 ${total} 条` }}
      />
      <Modal
        title="编辑情绪响应策略"
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={() => {
          setModalOpen(false)
          setEditingRecord(null)
          form.resetFields()
        }}
        confirmLoading={updateMutation.isPending}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="emotionType" label="情绪类型">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="strategy"
            label="响应策略"
            rules={[{ required: true, message: '请输入响应策略' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="priority"
            label="优先级"
            rules={[{ required: true, message: '请输入优先级' }]}
          >
            <InputNumber min={1} max={5} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

// ============ 主页面 ============

export default function DialogueStrategyPage() {
  return (
    <PageContainer title="对话策略配置">
      <Tabs
        items={[
          { key: 'reply', label: '回复模板库', children: <ReplyTemplateTab /> },
          { key: 'companion', label: '陪伴模式规则', children: <CompanionModeTab /> },
          { key: 'emotion', label: '情绪响应策略', children: <EmotionStrategyTab /> },
        ]}
      />
    </PageContainer>
  )
}
