import { Card, Row, Col, Spin } from 'antd'
import { useQuery } from '@tanstack/react-query'
import ReactECharts from 'echarts-for-react'
import { analysisService } from '@/services/analysis.service'

export default function MemoryAnalysis() {
  const { data, isLoading } = useQuery({
    queryKey: ['analysis', 'memory'],
    queryFn: () => analysisService.getMemoryAnalysis(),
  })

  const result = data?.data as Record<string, unknown> | undefined
  const trendData = result?.trend as { labels: string[]; values: number[] } | undefined
  const typeData = result?.typeDistribution as Array<{ name: string; value: number }> | undefined
  const stageData = result?.stageDistribution as Array<{ name: string; value: number }> | undefined

  const trendOption = trendData ? {
    title: { text: '记忆采集趋势', left: 'center', textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'axis' as const },
    xAxis: { type: 'category' as const, data: trendData.labels },
    yAxis: { type: 'value' as const },
    series: [{ type: 'line', data: trendData.values, smooth: true, areaStyle: { opacity: 0.3 }, itemStyle: { color: '#5BA3FF' } }],
    grid: { left: 60, right: 20, bottom: 30, top: 50 },
  } : {}

  const pieOption = (data: Array<{ name: string; value: number }> | undefined, title: string) =>
    data ? {
      title: { text: title, left: 'center', textStyle: { fontSize: 14 } },
      tooltip: { trigger: 'item' as const, formatter: '{b}: {c} ({d}%)' },
      legend: { bottom: 0 },
      series: [{ type: 'pie', radius: ['35%', '65%'], data, itemStyle: { borderRadius: 6 } }],
    } : {}

  return (
    <Spin spinning={isLoading}>
      <Card bordered={false} style={{ marginBottom: 16 }}>
        {trendData && <ReactECharts option={trendOption} style={{ height: 300 }} />}
      </Card>
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={false}>
            {typeData && <ReactECharts option={pieOption(typeData, '记忆类型分布')} style={{ height: 320 }} />}
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            {stageData && <ReactECharts option={pieOption(stageData, '阶段分布')} style={{ height: 320 }} />}
          </Card>
        </Col>
      </Row>
    </Spin>
  )
}
