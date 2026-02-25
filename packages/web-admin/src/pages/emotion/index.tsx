import { useState } from 'react'
import { Tabs, Table, Switch, Empty, Modal, Form, InputNumber, Button } from 'antd'
import { EMOTION_LABELS } from '@lifechain/shared'
import type { TEmotionLabel } from '@lifechain/shared'
import PageContainer from '@/components/common/PageContainer'

interface IEmotionConfigRow {
  key: TEmotionLabel
  label: string
  color: string
  lowThreshold: number
  mediumThreshold: number
  highThreshold: number
}

const initialEmotionConfigs: IEmotionConfigRow[] = (Object.keys(EMOTION_LABELS) as TEmotionLabel[]).map((key) => ({
  key,
  label: EMOTION_LABELS[key].label,
  color: EMOTION_LABELS[key].color,
  lowThreshold: 0.3,
  mediumThreshold: 0.6,
  highThreshold: 0.85,
}))

const crisisRules = [
  { id: '1', name: '持续悲伤预警', emotion: '悲伤', condition: '连续3天高强度', notify: '短信+站内信', enabled: true },
  { id: '2', name: '愤怒激增预警', emotion: '愤怒', condition: '1小时内3次高强度', notify: '站内信', enabled: true },
  { id: '3', name: '焦虑持续预警', emotion: '焦虑', condition: '连续7天中强度以上', notify: '短信+站内信', enabled: false },
  { id: '4', name: '恐惧突发预警', emotion: '恐惧', condition: '单次高强度', notify: '电话+短信', enabled: true },
  { id: '5', name: '情绪波动预警', emotion: '多种', condition: '24小时内情绪波动>5次', notify: '站内信', enabled: false },
  { id: '6', name: '长期低落预警', emotion: '悲伤', condition: '连续14天平均偏负', notify: '短信+邮件', enabled: true },
]

export default function EmotionPage() {
  const [emotionConfigs, setEmotionConfigs] = useState(initialEmotionConfigs)
  const [rules, setRules] = useState(crisisRules)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingConfig, setEditingConfig] = useState<IEmotionConfigRow | null>(null)
  const [form] = Form.useForm()

  const openEdit = (record: IEmotionConfigRow) => {
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
    setEmotionConfigs((prev) =>
      prev.map((item) =>
        item.key === editingConfig?.key ? { ...item, ...values } : item,
      ),
    )
    setEditModalOpen(false)
  }

  const toggleRule = (id: string, checked: boolean) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: checked } : r)))
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
      render: (_: unknown, record: IEmotionConfigRow) => (
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
      render: (enabled: boolean, record: (typeof crisisRules)[number]) => (
        <Switch checked={enabled} onChange={(checked) => toggleRule(record.id, checked)} />
      ),
    },
  ]

  const tabItems = [
    {
      key: 'config',
      label: '情绪配置',
      children: (
        <Table rowKey="key" columns={emotionColumns} dataSource={emotionConfigs} pagination={false} />
      ),
    },
    {
      key: 'crisis',
      label: '危机预警',
      children: (
        <Table rowKey="id" columns={crisisColumns} dataSource={rules} pagination={false} />
      ),
    },
    {
      key: 'report',
      label: '健康报告',
      children: <Empty description="功能开发中" />,
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
