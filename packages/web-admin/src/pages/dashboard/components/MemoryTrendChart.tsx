import ReactECharts from 'echarts-for-react'
import { Card } from 'antd'
import type { IChartData } from '@/services/dashboard.service'

interface MemoryTrendChartProps {
  data?: IChartData
  loading: boolean
}

export default function MemoryTrendChart({ data, loading }: MemoryTrendChartProps) {
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
        name: '记忆采集量',
        type: 'bar',
        data: data?.values ?? [],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#5BA3FF' },
              { offset: 1, color: '#5BA3FF40' },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  }

  return (
    <Card title="记忆采集趋势" bordered={false} loading={loading}>
      <ReactECharts option={option} style={{ height: 300 }} />
    </Card>
  )
}
