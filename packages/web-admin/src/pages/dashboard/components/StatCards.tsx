import { Row, Col, Card, Statistic } from 'antd'
import {
  UserOutlined,
  BookOutlined,
  ThunderboltOutlined,
  HeartOutlined,
} from '@ant-design/icons'
import type { IDashboardStats } from '@/services/dashboard.service'
import { formatNumber } from '@/utils'

interface StatCardsProps {
  stats?: IDashboardStats
  loading: boolean
}

export default function StatCards({ stats, loading }: StatCardsProps) {
  const cards = [
    {
      title: '总用户数',
      value: stats?.totalUsers ?? 0,
      suffix: `活跃 ${formatNumber(stats?.activeUsers ?? 0)}`,
      icon: <UserOutlined style={{ fontSize: 24, color: '#FF8A5B' }} />,
      color: '#FFF5F0',
    },
    {
      title: '总记忆数',
      value: stats?.totalMemories ?? 0,
      suffix: `增长 ${stats?.memoryGrowthRate ?? 0}%`,
      icon: <BookOutlined style={{ fontSize: 24, color: '#5BA3FF' }} />,
      color: '#F0F5FF',
    },
    {
      title: '用户增长率',
      value: stats?.userGrowthRate ?? 0,
      suffix: '%',
      icon: <ThunderboltOutlined style={{ fontSize: 24, color: '#52C41A' }} />,
      color: '#F6FFED',
    },
    {
      title: '系统健康度',
      value: stats?.systemHealth ?? 0,
      suffix: '%',
      icon: <HeartOutlined style={{ fontSize: 24, color: '#F5222D' }} />,
      color: '#FFF1F0',
    },
  ]

  return (
    <Row gutter={[16, 16]}>
      {cards.map((card) => (
        <Col xs={24} sm={12} lg={6} key={card.title}>
          <Card loading={loading} bordered={false} style={{ background: card.color }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Statistic
                title={card.title}
                value={card.value}
                formatter={(value) => formatNumber(Number(value))}
              />
              {card.icon}
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: '#8C8C8C' }}>{card.suffix}</div>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
