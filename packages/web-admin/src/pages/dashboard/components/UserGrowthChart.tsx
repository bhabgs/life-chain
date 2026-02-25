import ReactECharts from 'echarts-for-react'
import { Card } from 'antd'
import type { IChartData } from '@/services/dashboard.service'

interface UserGrowthChartProps {
  data?: IChartData
  loading: boolean
}

export default function UserGrowthChart({ data, loading }: UserGrowthChartProps) {
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
        name: '新增用户',
        type: 'line',
        smooth: true,
        data: data?.values ?? [],
        areaStyle: { opacity: 0.15 },
        itemStyle: { color: '#FF8A5B' },
      },
    ],
  }

  return (
    <Card title="用户增长趋势" bordered={false} loading={loading}>
      <ReactECharts option={option} style={{ height: 300 }} />
    </Card>
  )
}
