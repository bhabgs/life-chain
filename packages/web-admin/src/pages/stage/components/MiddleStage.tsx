import { Card, Table, Tag } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { stageService } from '@/services/stage.service'

export default function MiddleStage() {
  const { data, isLoading } = useQuery({
    queryKey: ['stage-config', 'middle_age'],
    queryFn: () => stageService.getConfig('middle_age'),
  })

  const config = data?.data as Record<string, unknown> | undefined

  const eventColumns = [
    { title: '事件分类', dataIndex: 'category', key: 'category' },
    { title: '子类数量', dataIndex: 'subCount', key: 'subCount', width: 100 },
    { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 80,
      render: (p: string) => <Tag color={p === '高' ? 'red' : p === '中' ? 'orange' : 'blue'}>{p}</Tag>,
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card title="家庭事件分类" loading={isLoading} size="small">
        <Table
          rowKey="category"
          columns={eventColumns}
          dataSource={(config?.familyEvents as Array<Record<string, unknown>>) ?? []}
          pagination={false}
          size="small"
        />
      </Card>
    </div>
  )
}
