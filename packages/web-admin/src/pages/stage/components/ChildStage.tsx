import { Card, Table, Switch, Form, InputNumber, Button, App } from 'antd'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { stageService } from '@/services/stage.service'

export default function ChildStage() {
  const { message } = App.useApp()
  const queryClient = useQueryClient()
  const [form] = Form.useForm()

  const { data, isLoading } = useQuery({
    queryKey: ['stage-config', 'childhood'],
    queryFn: () => stageService.getConfig('childhood'),
  })

  const saveMutation = useMutation({
    mutationFn: (values: Record<string, unknown>) => stageService.updateConfig('childhood', values),
    onSuccess: () => {
      message.success('保存成功')
      queryClient.invalidateQueries({ queryKey: ['stage-config', 'childhood'] })
    },
  })

  const config = data?.data as Record<string, unknown> | undefined

  const milestoneColumns = [
    { title: '里程碑名称', dataIndex: 'name', key: 'name' },
    { title: '触发月龄', dataIndex: 'monthAge', key: 'monthAge', width: 100 },
    { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true },
    {
      title: '启用',
      dataIndex: 'enabled',
      key: 'enabled',
      width: 80,
      render: (v: boolean) => <Switch size="small" checked={v} />,
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card title="成长里程碑标准" loading={isLoading} size="small">
        <Table
          rowKey="name"
          columns={milestoneColumns}
          dataSource={(config?.milestones as Array<Record<string, unknown>>) ?? []}
          pagination={false}
          size="small"
        />
      </Card>

      <Card title="安抚内容库配置" size="small">
        <Form form={form} layout="inline" initialValues={config?.comfortConfig as Record<string, unknown>}>
          <Form.Item name="maxDailyPush" label="每日推送上限">
            <InputNumber min={1} max={20} />
          </Form.Item>
          <Form.Item name="minInterval" label="最小推送间隔(分钟)">
            <InputNumber min={5} max={120} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => form.validateFields().then((v) => saveMutation.mutate({ comfortConfig: v }))}>
              保存
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="哭声识别模型配置" size="small">
        <Form layout="vertical">
          <Form.Item label="识别灵敏度阈值">
            <InputNumber min={0} max={1} step={0.05} defaultValue={0.75} style={{ width: 200 }} />
          </Form.Item>
          <Form.Item label="模型版本">
            <span style={{ color: '#666' }}>cry-detection-v2.1.0</span>
          </Form.Item>
          <Form.Item label="启用状态">
            <Switch defaultChecked />
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
