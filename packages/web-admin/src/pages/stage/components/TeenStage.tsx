import { Card, Table, Switch, Form, InputNumber, Button, App } from 'antd'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { stageService } from '@/services/stage.service'

export default function TeenStage() {
  const { message } = App.useApp()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['stage-config', 'adolescence'],
    queryFn: () => stageService.getConfig('adolescence'),
  })

  const saveMutation = useMutation({
    mutationFn: (values: Record<string, unknown>) => stageService.updateConfig('adolescence', values),
    onSuccess: () => {
      message.success('保存成功')
      queryClient.invalidateQueries({ queryKey: ['stage-config', 'adolescence'] })
    },
  })

  const config = data?.data as Record<string, unknown> | undefined

  const modeColumns = [
    { title: '学习模式', dataIndex: 'name', key: 'name' },
    { title: '触发条件', dataIndex: 'trigger', key: 'trigger', ellipsis: true },
    { title: '时间限制', dataIndex: 'timeLimit', key: 'timeLimit', width: 100 },
    {
      title: '启用',
      dataIndex: 'enabled',
      key: 'enabled',
      width: 80,
      render: (v: boolean) => <Switch size="small" checked={v} />,
    },
  ]

  const diaryColumns = [
    { title: '引导语', dataIndex: 'prompt', key: 'prompt', ellipsis: true },
    { title: '适用情绪', dataIndex: 'emotion', key: 'emotion', width: 100 },
    { title: '优先级', dataIndex: 'priority', key: 'priority', width: 80 },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card title="学习模式规则" loading={isLoading} size="small">
        <Table
          rowKey="name"
          columns={modeColumns}
          dataSource={(config?.learningModes as Array<Record<string, unknown>>) ?? []}
          pagination={false}
          size="small"
        />
      </Card>

      <Card title="情绪日记引导语" size="small">
        <Table
          rowKey="prompt"
          columns={diaryColumns}
          dataSource={(config?.diaryPrompts as Array<Record<string, unknown>>) ?? []}
          pagination={false}
          size="small"
        />
      </Card>

      <Card title="专注计时器标准" size="small">
        <Form layout="inline">
          <Form.Item label="默认专注时长(分钟)">
            <InputNumber min={5} max={60} defaultValue={25} />
          </Form.Item>
          <Form.Item label="休息时长(分钟)">
            <InputNumber min={3} max={15} defaultValue={5} />
          </Form.Item>
          <Form.Item label="每日建议轮次">
            <InputNumber min={1} max={10} defaultValue={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => saveMutation.mutate({})}>保存</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
