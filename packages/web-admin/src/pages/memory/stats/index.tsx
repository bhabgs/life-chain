import { Row, Col, Card, Statistic, Spin } from 'antd'
import {
  FileTextOutlined,
  AudioOutlined,
  PictureOutlined,
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import ReactECharts from 'echarts-for-react'
import PageContainer from '@/components/common/PageContainer'
import { memoryService } from '@/services/memory.service'
import { MEMORY_TYPES, LIFE_STAGES } from '@lifechain/shared'
import type { IMemoryStats } from '@lifechain/shared'

const typeColors = ['#5BA3FF', '#8B5CF6', '#52C41A', '#FF8A5B', '#00BCD4']
const stageColors = ['#FFD700', '#FF8A5B', '#5BA3FF', '#52C41A', '#8B5CF6']

export default function MemoryStatsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['memory', 'stats'],
    queryFn: () => memoryService.getStats(),
  })

  const stats: IMemoryStats | undefined = data?.data

  if (isLoading) {
    return (
      <PageContainer title="记忆统计">
        <div style={{ textAlign: 'center', padding: 80 }}>
          <Spin size="large" />
        </div>
      </PageContainer>
    )
  }

  const typePieOption = {
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: { orient: 'vertical' as const, right: '5%', top: 'center' },
    series: [
      {
        name: '记忆类型',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
        data: stats
          ? Object.entries(stats.byType).map(([key, value]) => ({
              name: MEMORY_TYPES[key as keyof typeof MEMORY_TYPES]?.label ?? key,
              value,
            }))
          : [],
        color: typeColors,
      },
    ],
  }

  const stagePieOption = {
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: { orient: 'vertical' as const, right: '5%', top: 'center' },
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
        data: stats
          ? Object.entries(stats.byStage).map(([key, value]) => ({
              name: LIFE_STAGES[key as keyof typeof LIFE_STAGES]?.label ?? key,
              value,
            }))
          : [],
        color: stageColors,
      },
    ],
  }

  const trendLineOption = {
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: stats?.byMonth.map((item) => item.month) ?? [],
      axisLabel: { rotate: 30 },
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: '记忆数量',
        type: 'line',
        smooth: true,
        data: stats?.byMonth.map((item) => item.count) ?? [],
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#5BA3FF80' },
              { offset: 1, color: '#5BA3FF10' },
            ],
          },
        },
        lineStyle: { color: '#5BA3FF', width: 2 },
        itemStyle: { color: '#5BA3FF' },
      },
    ],
  }

  return (
    <PageContainer title="记忆统计">
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={6}>
          <Card bordered={false}>
            <Statistic title="记忆总量" value={stats?.total ?? 0} prefix={<FileTextOutlined />} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bordered={false}>
            <Statistic
              title="文字记忆"
              value={stats?.byType.text ?? 0}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#5BA3FF' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bordered={false}>
            <Statistic
              title="语音记忆"
              value={stats?.byType.voice ?? 0}
              prefix={<AudioOutlined />}
              valueStyle={{ color: '#8B5CF6' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bordered={false}>
            <Statistic
              title="图片记忆"
              value={stats?.byType.image ?? 0}
              prefix={<PictureOutlined />}
              valueStyle={{ color: '#52C41A' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="按类型分布" bordered={false}>
            <ReactECharts option={typePieOption} style={{ height: 300 }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="按阶段分布" bordered={false}>
            <ReactECharts option={stagePieOption} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="按月趋势" bordered={false}>
            <ReactECharts option={trendLineOption} style={{ height: 350 }} />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  )
}
