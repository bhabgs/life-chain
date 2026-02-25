import ReactECharts from 'echarts-for-react'
import { Card } from 'antd'
import type { IStageDistribution } from '@/services/dashboard.service'

interface StageDistributionProps {
  data?: IStageDistribution[]
  loading: boolean
}

export default function StageDistribution({ data, loading }: StageDistributionProps) {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: '10%',
      top: 'center',
    },
    series: [
      {
        name: '人生阶段',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
        data: (data ?? []).map((item) => ({
          name: item.label,
          value: item.count,
        })),
        color: ['#FFD700', '#FF8A5B', '#5BA3FF', '#52C41A', '#8B5CF6'],
      },
    ],
  }

  return (
    <Card title="人生阶段分布" bordered={false} loading={loading}>
      <ReactECharts option={option} style={{ height: 300 }} />
    </Card>
  )
}
