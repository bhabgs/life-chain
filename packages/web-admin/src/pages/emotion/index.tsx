import { useState } from 'react'
import { Tabs, Table, Switch, Tag, Modal, Form, InputNumber, Button, Spin, message } from 'antd'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import PageContainer from '@/components/common/PageContainer'
import { emotionService } from '@/services/emotion.service'
import type { IEmotionConfig, ICrisisRule } from '@/services/emotion.service'

export default function EmotionPage() {
  const queryClient = useQueryClient()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingConfig, setEditingConfig] = useState<IEmotionConfig | null>(null)
  const [form] = Form.useForm()

  const { data: configsRes, isLoading: configsLoading } = useQuery({
    queryKey: ['emotion', 'configs'],
    queryFn: () => emotionService.getConfigs(),
  })

  const { data: rulesRes, isLoading: rulesLoading } = useQuery({
    queryKey: ['emotion', 'crisis-rules'],
    queryFn: () => emotionService.getCrisisRules(),
  })

  const { data: boundariesRes, isLoading: boundariesLoading } = useQuery({
    queryKey: ['emotion', 'health-boundaries'],
    queryFn: () => emotionService.getHealthBoundaries(),
  })

  const { data: reportsRes, isLoading: reportsLoading } = useQuery({
    queryKey: ['emotion', 'health-reports'],
    queryFn: () => emotionService.getHealthReports(),
  })

  const updateConfigMutation = useMutation({
    mutationFn: ({ key, data }: { key: string; data: Partial<IEmotionConfig> }) =>
      emotionService.updateConfig(key, data),
    onSuccess: () => {
      message.success('配置更新成功')
      queryClient.invalidateQueries({ queryKey: ['emotion', 'configs'] })
      setEditModalOpen(false)
    },
  })

  const toggleRuleMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      emotionService.toggleCrisisRule(id, enabled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emotion', 'crisis-rules'] })
    },
  })

  const updateBoundaryMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      emotionService.updateHealthBoundary(id, data),
    onSuccess: () => {
      message.success('边界设置更新成功')
      queryClient.invalidateQueries({ queryKey: ['emotion', 'health-boundaries'] })
    },
  })

  const openEdit = (record: IEmotionConfig) => {
    setEditingConfig(record)
    form.setFieldsValue({
      lowThreshold: record.lowThreshold,
      mediumThreshold: record.mediumThreshold,
      highThreshold: record.highThreshold,
    })
    setEditModalOpen(true)
  }

  const handleEditSubmit = async () => {
    const values = await form.validateFields()
    if (editingConfig) {
      updateConfigMutation.mutate({ key: editingConfig.key, data: values })
    }
  }

  const emotionColumns = [
    { title: '情绪标签', dataIndex: 'label', key: 'label' },
    {
      title: '颜色',
      dataIndex: 'color',
      key: 'color',
      render: (color: string) => (
        <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: color }} />
      ),
    },
    { title: '低阈值', dataIndex: 'lowThreshold', key: 'lowThreshold' },
    { title: '中阈值', dataIndex: 'mediumThreshold', key: 'mediumThreshold' },
    { title: '高阈值', dataIndex: 'highThreshold', key: 'highThreshold' },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: IEmotionConfig) => (
        <Button type="link" size="small" onClick={() => openEdit(record)}>
          编辑
        </Button>
      ),
    },
  ]

  const crisisColumns = [
    { title: '规则名', dataIndex: 'name', key: 'name' },
    { title: '情绪类型', dataIndex: 'emotion', key: 'emotion' },
    { title: '触发条件', dataIndex: 'condition', key: 'condition' },
    { title: '通知方式', dataIndex: 'notify', key: 'notify' },
    {
      title: '状态',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (enabled: boolean, record: ICrisisRule) => (
        <Switch
          checked={enabled}
          onChange={(checked) => toggleRuleMutation.mutate({ id: record.id, enabled: checked })}
        />
      ),
    },
  ]

  const boundaryColumns = [
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '分类', dataIndex: 'category', key: 'category' },
    {
      title: '阈值',
      key: 'value',
      render: (_: unknown, record: Record<string, unknown>) =>
        `${record.value}${record.unit ? ` ${record.unit}` : ''}`,
    },
    { title: '说明', dataIndex: 'description', key: 'description', ellipsis: true },
    {
      title: '状态',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (enabled: boolean, record: Record<string, unknown>) => (
        <Switch
          checked={enabled}
          onChange={(checked) =>
            updateBoundaryMutation.mutate({ id: record.id as string, data: { enabled: checked } })
          }
        />
      ),
    },
  ]

  const reportColumns = [
    { title: '用户', dataIndex: 'userName', key: 'userName' },
    { title: '周期', dataIndex: 'period', key: 'period' },
    { title: '综合评分', dataIndex: 'overallScore', key: 'overallScore', sorter: (a: Record<string, unknown>, b: Record<string, unknown>) => (a.overallScore as number) - (b.overallScore as number) },
    { title: '情绪评分', dataIndex: 'emotionScore', key: 'emotionScore' },
    { title: '使用评分', dataIndex: 'usageScore', key: 'usageScore' },
    { title: '社交评分', dataIndex: 'socialScore', key: 'socialScore' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '需关注' ? 'orange' : 'green'}>{status}</Tag>
      ),
    },
  ]

  const tabItems = [
    {
      key: 'config',
      label: '情绪配置',
      children: (
        <Spin spinning={configsLoading}>
          <Table rowKey="key" columns={emotionColumns} dataSource={configsRes?.data ?? []} pagination={false} />
        </Spin>
      ),
    },
    {
      key: 'crisis',
      label: '危机预警',
      children: (
        <Spin spinning={rulesLoading}>
          <Table rowKey="id" columns={crisisColumns} dataSource={rulesRes?.data ?? []} pagination={false} />
        </Spin>
      ),
    },
    {
      key: 'boundary',
      label: '健康边界设置',
      children: (
        <Spin spinning={boundariesLoading}>
          <Table rowKey="id" columns={boundaryColumns} dataSource={(boundariesRes?.data ?? []) as Record<string, unknown>[]} pagination={false} />
        </Spin>
      ),
    },
    {
      key: 'report',
      label: '健康报告',
      children: (
        <Spin spinning={reportsLoading}>
          <Table rowKey="id" columns={reportColumns} dataSource={(reportsRes?.data ?? []) as Record<string, unknown>[]} pagination={{ pageSize: 10 }} />
        </Spin>
      ),
    },
  ]

  return (
    <PageContainer title="情绪健康管理">
      <Tabs items={tabItems} />

      <Modal
        title={`编辑阈值 - ${editingConfig?.label}`}
        open={editModalOpen}
        onOk={handleEditSubmit}
        onCancel={() => setEditModalOpen(false)}
        confirmLoading={updateConfigMutation.isPending}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="lowThreshold" label="低阈值" rules={[{ required: true }]}>
            <InputNumber min={0} max={1} step={0.05} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="mediumThreshold" label="中阈值" rules={[{ required: true }]}>
            <InputNumber min={0} max={1} step={0.05} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="highThreshold" label="高阈值" rules={[{ required: true }]}>
            <InputNumber min={0} max={1} step={0.05} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  )
}
