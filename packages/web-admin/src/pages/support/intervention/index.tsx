import { Table, Tag, Spin } from 'antd'
import { useQuery } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import PageContainer from '@/components/common/PageContainer'
import { supportService } from '@/services/support.service'

interface IIntervention {
  id: string
  userName: string
  operator: string
  reason: string
  result: string
  status: string
  startTime: string
  endTime: string | null
}

export default function InterventionPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['interventions'],
    queryFn: () => supportService.getInterventions(),
  })

  const columns: ColumnsType<IIntervention> = [
    { title: '用户', dataIndex: 'userName', key: 'userName' },
    { title: '处理人', dataIndex: 'operator', key: 'operator' },
    { title: '介入原因', dataIndex: 'reason', key: 'reason', ellipsis: true },
    { title: '处理结果', dataIndex: 'result', key: 'result', ellipsis: true },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (v: string) => <Tag color={v === '已完成' ? 'green' : v === '进行中' ? 'blue' : 'orange'}>{v}</Tag>,
    },
    { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
    { title: '结束时间', dataIndex: 'endTime', key: 'endTime', render: (v: string | null) => v ?? '-' },
  ]

  return (
    <PageContainer title="人工介入记录">
      <Spin spinning={isLoading}>
        <Table<IIntervention>
          rowKey="id"
          columns={columns}
          dataSource={(data?.data ?? []) as IIntervention[]}
          pagination={{ showTotal: (t) => `共 ${t} 条`, pageSize: 15 }}
        />
      </Spin>
    </PageContainer>
  )
}
