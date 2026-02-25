import ReactECharts from 'echarts-for-react'
import { Card } from 'antd'
import type { IChartData } from '@/services/dashboard.service'

interface InteractionChartProps {
  data?: IChartData
  loading: boolean
}

export default function InteractionChart({ data, loading }: InteractionChartProps) {
  const option = {
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: data?.labels ?? [],
      axisLabel: { rotate: 30 },
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: '互动频次',
        type: 'line',
        smooth: true,
        data: data?.values ?? [],
        itemStyle: { color: '#52C41A' },
        areaStyle: { opacity: 0.1 },
      },
    ],
  }

  return (
    <Card title="互动频次" bordered={false} loading={loading}>
      <ReactECharts option={option} style={{ height: 300 }} />
    </Card>
  )
}
