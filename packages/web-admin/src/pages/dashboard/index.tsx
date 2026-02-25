import { Row, Col } from 'antd'
import { useQuery } from '@tanstack/react-query'
import PageContainer from '@/components/common/PageContainer'
import { dashboardService } from '@/services/dashboard.service'
import StatCards from './components/StatCards'
import UserGrowthChart from './components/UserGrowthChart'
import MemoryTrendChart from './components/MemoryTrendChart'
import InteractionChart from './components/InteractionChart'
import StageDistribution from './components/StageDistribution'
import RecentAlerts from './components/RecentAlerts'

export default function DashboardPage() {
  const { data: statsRes, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => dashboardService.getStats(),
  })

  const { data: userGrowthRes, isLoading: growthLoading } = useQuery({
    queryKey: ['dashboard', 'user-growth'],
    queryFn: () => dashboardService.getUserGrowth(),
  })

  const { data: memoryTrendRes, isLoading: trendLoading } = useQuery({
    queryKey: ['dashboard', 'memory-trend'],
    queryFn: () => dashboardService.getMemoryTrend(),
  })

  const { data: interactionRes, isLoading: interactionLoading } = useQuery({
    queryKey: ['dashboard', 'interaction'],
    queryFn: () => dashboardService.getInteraction(),
  })

  const { data: stageRes, isLoading: stageLoading } = useQuery({
    queryKey: ['dashboard', 'stage-distribution'],
    queryFn: () => dashboardService.getStageDistribution(),
  })

  const { data: alertsRes, isLoading: alertsLoading } = useQuery({
    queryKey: ['dashboard', 'alerts'],
    queryFn: () => dashboardService.getAlerts(),
  })

  return (
    <PageContainer title="仪表盘">
      <StatCards stats={statsRes?.data} loading={statsLoading} />

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <UserGrowthChart data={userGrowthRes?.data} loading={growthLoading} />
        </Col>
        <Col xs={24} lg={12}>
          <MemoryTrendChart data={memoryTrendRes?.data} loading={trendLoading} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <InteractionChart data={interactionRes?.data} loading={interactionLoading} />
        </Col>
        <Col xs={24} lg={12}>
          <StageDistribution data={stageRes?.data} loading={stageLoading} />
        </Col>
      </Row>

      <RecentAlerts alerts={alertsRes?.data} loading={alertsLoading} />
    </PageContainer>
  )
}
