import { Card, Row, Col, Statistic, Spin, Table, Tag } from 'antd'
import { UserOutlined, ClockCircleOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import ReactECharts from 'echarts-for-react'
import { analysisService } from '@/services/analysis.service'

export default function UserBehavior() {
  const { data, isLoading } = useQuery({
    queryKey: ['analysis', 'user-behavior'],
    queryFn: () => analysisService.getUserBehavior(),
  })

  const result = data?.data as Record<string, unknown> | undefined
  const stats = result?.stats as Record<string, number> | undefined
  const retentionData = result?.retention as Array<Record<string, unknown>> | undefined
  const churnData = result?.churnRisk as Array<Record<string, unknown>> | undefined

  const retentionOption = retentionData ? {
    title: { text: '用户留存率', left: 'center', textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'axis' as const },
    xAxis: { type: 'category' as const, data: retentionData.map((d) => d.day) },
    yAxis: { type: 'value' as const, name: '%', max: 100 },
    series: [{ type: 'line', data: retentionData.map((d) => d.rate), smooth: true, itemStyle: { color: '#FF8A5B' } }],
    grid: { left: 60, right: 20, bottom: 30, top: 50 },
  } : {}

  const churnColumns = [
    { title: '用户', dataIndex: 'userName', key: 'userName' },
    { title: '最后活跃', dataIndex: 'lastActive', key: 'lastActive' },
    { title: '使用天数', dataIndex: 'activeDays', key: 'activeDays', width: 90 },
    {
      title: '流失风险',
      dataIndex: 'risk',
      key: 'risk',
      render: (v: string) => <Tag color={v === '高' ? 'red' : v === '中' ? 'orange' : 'green'}>{v}</Tag>,
    },
  ]

  return (
    <Spin spinning={isLoading}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}><Card><Statistic title="日均使用时长" value={stats?.avgDuration ?? 0} suffix="分钟" prefix={<ClockCircleOutlined />} /></Card></Col>
        <Col span={6}><Card><Statistic title="日活用户" value={stats?.dau ?? 0} prefix={<UserOutlined />} /></Card></Col>
        <Col span={6}><Card><Statistic title="7日留存率" value={stats?.retention7d ?? 0} suffix="%" prefix={<RiseOutlined />} valueStyle={{ color: '#52c41a' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="流失预警" value={stats?.churnWarning ?? 0} prefix={<FallOutlined />} valueStyle={{ color: '#f5222d' }} /></Card></Col>
      </Row>

      <Row gutter={16}>
        <Col span={14}>
          <Card bordered={false}>
            {retentionData && <ReactECharts option={retentionOption} style={{ height: 320 }} />}
          </Card>
        </Col>
        <Col span={10}>
          <Card title="流失预警用户" bordered={false} size="small">
            <Table rowKey="userName" columns={churnColumns} dataSource={churnData ?? []} pagination={false} size="small" />
          </Card>
        </Col>
      </Row>
    </Spin>
  )
}
