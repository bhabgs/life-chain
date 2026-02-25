import { Table, Tag, Card, Row, Col, Statistic, Spin } from 'antd'
import { WarningOutlined, SafetyOutlined, BugOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import PageContainer from '@/components/common/PageContainer'
import { systemService } from '@/services/system.service'

interface IAuditEvent {
  id: string
  type: string
  severity: string
  description: string
  source: string
  operator: string
  time: string
  resolved: boolean
}

const severityColorMap: Record<string, string> = {
  '严重': 'red',
  '高危': 'orange',
  '中危': 'gold',
  '低危': 'blue',
  '信息': 'default',
}

export default function SecurityAuditPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['security-audit'],
    queryFn: () => systemService.getSecurityAuditEvents(),
  })

  const events = (data?.data ?? []) as IAuditEvent[]
  const unresolvedCount = events.filter((e) => !e.resolved).length
  const criticalCount = events.filter((e) => e.severity === '严重' || e.severity === '高危').length

  const columns: ColumnsType<IAuditEvent> = [
    { title: '事件类型', dataIndex: 'type', key: 'type' },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
      render: (v: string) => <Tag color={severityColorMap[v]}>{v}</Tag>,
    },
    { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true },
    { title: '来源', dataIndex: 'source', key: 'source', width: 120 },
    { title: '操作人', dataIndex: 'operator', key: 'operator', width: 100 },
    { title: '时间', dataIndex: 'time', key: 'time', width: 170 },
    {
      title: '状态',
      dataIndex: 'resolved',
      key: 'resolved',
      width: 80,
      render: (v: boolean) => <Tag color={v ? 'green' : 'red'}>{v ? '已处理' : '未处理'}</Tag>,
    },
  ]

  return (
    <PageContainer title="安全审计">
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card>
            <Statistic title="安全事件总数" value={events.length} prefix={<SafetyOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="未处理事件" value={unresolvedCount} prefix={<WarningOutlined />} valueStyle={{ color: unresolvedCount > 0 ? '#f5222d' : '#52c41a' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="高危/严重" value={criticalCount} prefix={<BugOutlined />} valueStyle={{ color: criticalCount > 0 ? '#faad14' : '#52c41a' }} />
          </Card>
        </Col>
      </Row>

      <Spin spinning={isLoading}>
        <Table<IAuditEvent>
          rowKey="id"
          columns={columns}
          dataSource={events}
          pagination={{ showTotal: (t) => `共 ${t} 条`, pageSize: 15 }}
        />
      </Spin>
    </PageContainer>
  )
}
