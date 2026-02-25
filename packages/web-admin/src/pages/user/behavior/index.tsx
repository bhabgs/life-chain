import { useState } from 'react'
import { Card, Col, Row, Statistic, Table, Tag, Radio, Spin } from 'antd'
import {
  ClockCircleOutlined,
  TeamOutlined,
  RiseOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import ReactECharts from 'echarts-for-react'
import type { ColumnsType } from 'antd/es/table'
import PageContainer from '@/components/common/PageContainer'
import { userService } from '@/services/user.service'
import { getRelativeTime } from '@/utils'

interface IBehaviorStats {
  avgDailyUsage: number
  monthlyActiveRate: number
  sevenDayRetention: number
  churnRiskCount: number
}

interface IUsageFrequency {
  date: string
  count: number
}

interface IFeatureHeatmapItem {
  hour: number
  day: number
  value: number
}

interface IChurnRiskUser {
  id: string
  username: string
  lastActiveAt: string
  activeDays: number
  riskLevel: 'high' | 'medium' | 'low'
}

interface IBehaviorData {
  stats: IBehaviorStats
  usageFrequency: IUsageFrequency[]
  featureHeatmap: IFeatureHeatmapItem[]
  heatmapDayLabels: string[]
  churnRiskUsers: IChurnRiskUser[]
}

type TPeriod = 'daily' | 'weekly' | 'monthly'

const RISK_TAG_CONFIG: Record<string, { color: string; label: string }> = {
  high: { color: 'error', label: '高风险' },
  medium: { color: 'warning', label: '中风险' },
  low: { color: 'default', label: '低风险' },
}

function getLineOption(data: IUsageFrequency[], period: TPeriod) {
  const titleMap: Record<TPeriod, string> = {
    daily: '每日使用频率',
    weekly: '每周使用频率',
    monthly: '每月使用频率',
  }

  return {
    title: {
      text: titleMap[period],
      left: 'center',
      textStyle: { fontSize: 14, fontWeight: 500 },
    },
    tooltip: {
      trigger: 'axis' as const,
    },
    xAxis: {
      type: 'category' as const,
      data: data.map((d) => d.date),
      axisLabel: {
        rotate: period === 'daily' ? 45 : 0,
        fontSize: 11,
      },
    },
    yAxis: {
      type: 'value' as const,
      name: '使用次数',
    },
    series: [
      {
        type: 'line',
        data: data.map((d) => d.count),
        smooth: true,
        itemStyle: { color: '#5BA3FF' },
        areaStyle: {
          color: {
            type: 'linear' as const,
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(91,163,255,0.3)' },
              { offset: 1, color: 'rgba(91,163,255,0.02)' },
            ],
          },
        },
      },
    ],
    grid: {
      left: 60,
      right: 20,
      bottom: period === 'daily' ? 70 : 40,
      top: 50,
    },
  }
}

function getHeatmapOption(data: IFeatureHeatmapItem[], dayLabels: string[]) {
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`)
  const maxVal = Math.max(...data.map((d) => d.value))

  return {
    title: {
      text: '功能使用热力图',
      left: 'center',
      textStyle: { fontSize: 14, fontWeight: 500 },
    },
    tooltip: {
      position: 'top' as const,
      formatter: (params: { value: number[] }) => {
        const [hour, day, val] = params.value
        return `${dayLabels[day]} ${hours[hour]}<br/>使用次数：${val}`
      },
    },
    xAxis: {
      type: 'category' as const,
      data: hours,
      splitArea: { show: true },
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: 'category' as const,
      data: dayLabels,
      splitArea: { show: true },
    },
    visualMap: {
      min: 0,
      max: maxVal,
      calculable: true,
      orient: 'horizontal' as const,
      left: 'center',
      bottom: 0,
      inRange: {
        color: ['#f0f9ff', '#bae7ff', '#69b1ff', '#1677ff', '#0050b3'],
      },
    },
    series: [
      {
        type: 'heatmap',
        data: data.map((d) => [d.hour, d.day, d.value]),
        label: { show: false },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
    grid: {
      left: 60,
      right: 20,
      bottom: 60,
      top: 50,
    },
  }
}

export default function UserBehaviorPage() {
  const [period, setPeriod] = useState<TPeriod>('daily')

  const { data, isLoading } = useQuery({
    queryKey: ['user-behavior', period],
    queryFn: () => userService.getBehaviorStats(period),
  })

  const behaviorData = data?.data as IBehaviorData | undefined
  const stats = behaviorData?.stats
  const usageFrequency = behaviorData?.usageFrequency || []
  const featureHeatmap = behaviorData?.featureHeatmap || []
  const heatmapDayLabels = behaviorData?.heatmapDayLabels || []
  const churnRiskUsers = behaviorData?.churnRiskUsers || []

  const churnColumns: ColumnsType<IChurnRiskUser> = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '最后活跃',
      dataIndex: 'lastActiveAt',
      key: 'lastActiveAt',
      render: (text) => getRelativeTime(text),
    },
    {
      title: '活跃天数',
      dataIndex: 'activeDays',
      key: 'activeDays',
      sorter: (a, b) => a.activeDays - b.activeDays,
    },
    {
      title: '风险等级',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      render: (level: string) => {
        const config = RISK_TAG_CONFIG[level]
        return config ? <Tag color={config.color}>{config.label}</Tag> : <Tag>{level}</Tag>
      },
      filters: [
        { text: '高风险', value: 'high' },
        { text: '中风险', value: 'medium' },
        { text: '低风险', value: 'low' },
      ],
      onFilter: (value, record) => record.riskLevel === value,
    },
  ]

  return (
    <PageContainer title="用户行为分析">
      <Spin spinning={isLoading}>
        {/* 统计卡片 */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="日均使用时长"
                value={stats?.avgDailyUsage || 0}
                suffix="分钟"
                prefix={<ClockCircleOutlined style={{ color: '#FF8A5B' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="月活跃率"
                value={stats?.monthlyActiveRate || 0}
                suffix="%"
                precision={1}
                prefix={<TeamOutlined style={{ color: '#5BA3FF' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="7日留存率"
                value={stats?.sevenDayRetention || 0}
                suffix="%"
                precision={1}
                prefix={<RiseOutlined style={{ color: '#52C41A' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="流失风险用户"
                value={stats?.churnRiskCount || 0}
                suffix="人"
                prefix={<WarningOutlined style={{ color: '#F5222D' }} />}
              />
            </Card>
          </Col>
        </Row>

        {/* 使用频率折线图 */}
        <Card style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <Radio.Group value={period} onChange={(e) => setPeriod(e.target.value)}>
              <Radio.Button value="daily">按日</Radio.Button>
              <Radio.Button value="weekly">按周</Radio.Button>
              <Radio.Button value="monthly">按月</Radio.Button>
            </Radio.Group>
          </div>
          <ReactECharts
            option={getLineOption(usageFrequency, period)}
            style={{ height: 360 }}
          />
        </Card>

        {/* 功能使用热力图 */}
        <Card style={{ marginBottom: 24 }}>
          {featureHeatmap.length > 0 && (
            <ReactECharts
              option={getHeatmapOption(featureHeatmap, heatmapDayLabels)}
              style={{ height: 320 }}
            />
          )}
        </Card>

        {/* 流失预警用户列表 */}
        <Card title="流失预警用户">
          <Table<IChurnRiskUser>
            rowKey="id"
            columns={churnColumns}
            dataSource={churnRiskUsers}
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              showTotal: (total) => `共 ${total} 条`,
            }}
            size="middle"
          />
        </Card>
      </Spin>
    </PageContainer>
  )
}
