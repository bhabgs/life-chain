import { Card, Table } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { stageService } from '@/services/stage.service'

export default function SeniorStage() {
  const { data, isLoading } = useQuery({
    queryKey: ['stage-config', 'old_age'],
    queryFn: () => stageService.getConfig('old_age'),
  })

  const config = data?.data as Record<string, unknown> | undefined

  const templateColumns = [
    { title: '模板名称', dataIndex: 'name', key: 'name' },
    { title: '访谈主题', dataIndex: 'topic', key: 'topic' },
    { title: '参考问题数', dataIndex: 'questionCount', key: 'questionCount', width: 120 },
    { title: '建议时长', dataIndex: 'duration', key: 'duration', width: 100 },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card title="回忆访谈模板配置" loading={isLoading} size="small">
        <Table
          rowKey="name"
          columns={templateColumns}
          dataSource={(config?.interviewTemplates as Array<Record<string, unknown>>) ?? []}
          pagination={false}
          size="small"
        />
      </Card>
    </div>
  )
}
