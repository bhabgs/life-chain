import { Card, Row, Col, Statistic, Spin, Table, Tag } from 'antd'
import { SmileOutlined, WarningOutlined, HeartOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import ReactECharts from 'echarts-for-react'
import { analysisService } from '@/services/analysis.service'

export default function EmotionAnalysis() {
  const { data, isLoading } = useQuery({
    queryKey: ['analysis', 'emotion'],
    queryFn: () => analysisService.getEmotionAnalysis(),
  })

  const result = data?.data as Record<string, unknown> | undefined
  const stats = result?.stats as Record<string, number> | undefined
  const trendData = result?.trend as { labels: string[]; positive: number[]; negative: number[]; neutral: number[] } | undefined
  const anomalies = result?.anomalies as Array<Record<string, unknown>> | undefined

  const trendOption = trendData ? {
    title: { text: '情绪趋势', left: 'center', textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'axis' as const },
    legend: { bottom: 0 },
    xAxis: { type: 'category' as const, data: trendData.labels },
    yAxis: { type: 'value' as const, name: '次数' },
    series: [
      { name: '积极', type: 'line', data: trendData.positive, smooth: true, itemStyle: { color: '#52c41a' } },
      { name: '中性', type: 'line', data: trendData.neutral, smooth: true, itemStyle: { color: '#faad14' } },
      { name: '消极', type: 'line', data: trendData.negative, smooth: true, itemStyle: { color: '#f5222d' } },
    ],
    grid: { left: 60, right: 20, bottom: 50, top: 50 },
  } : {}

  const anomalyColumns = [
    { title: '用户', dataIndex: 'userName', key: 'userName' },
    { title: '异常类型', dataIndex: 'type', key: 'type' },
    {
      title: '严重度',
      dataIndex: 'severity',
      key: 'severity',
      render: (v: string) => <Tag color={v === '高' ? 'red' : v === '中' ? 'orange' : 'green'}>{v}</Tag>,
    },
    { title: '发现时间', dataIndex: 'detectedAt', key: 'detectedAt' },
    { title: '干预状态', dataIndex: 'interventionStatus', key: 'interventionStatus',
      render: (v: string) => <Tag color={v === '已干预' ? 'green' : 'orange'}>{v}</Tag>,
    },
  ]

  return (
    <Spin spinning={isLoading}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}><Card><Statistic title="积极情绪占比" value={stats?.positiveRate ?? 0} suffix="%" prefix={<SmileOutlined />} valueStyle={{ color: '#52c41a' }} /></Card></Col>
        <Col span={8}><Card><Statistic title="异常统计" value={stats?.anomalyCount ?? 0} prefix={<WarningOutlined />} valueStyle={{ color: '#faad14' }} /></Card></Col>
        <Col span={8}><Card><Statistic title="干预有效率" value={stats?.interventionRate ?? 0} suffix="%" prefix={<HeartOutlined />} valueStyle={{ color: '#5BA3FF' }} /></Card></Col>
      </Row>

      <Card bordered={false} style={{ marginBottom: 16 }}>
        {trendData && <ReactECharts option={trendOption} style={{ height: 320 }} />}
      </Card>

      <Card title="情绪异常统计" bordered={false} size="small">
        <Table rowKey="userName" columns={anomalyColumns} dataSource={anomalies ?? []} pagination={false} size="small" />
      </Card>
    </Spin>
  )
}
