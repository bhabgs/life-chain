import type { IDashboardStats, IChartData, IStageDistribution, ISystemAlert } from '@/services/dashboard.service'

export const mockDashboardStats: IDashboardStats = {
  totalUsers: 3256,
  activeUsers: 1847,
  totalMemories: 28934,
  systemHealth: 98.5,
  userGrowthRate: 12.3,
  memoryGrowthRate: 23.7,
}

function generateMonthlyData(months: number, baseValue: number, variance: number): IChartData {
  const labels: string[] = []
  const values: number[] = []
  const now = new Date()

  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    labels.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
    values.push(Math.floor(baseValue + Math.random() * variance + i * (variance / months)))
  }

  return { labels, values }
}

export const mockUserGrowth: IChartData = generateMonthlyData(12, 150, 100)
export const mockMemoryTrend: IChartData = generateMonthlyData(12, 1200, 800)
export const mockInteraction: IChartData = generateMonthlyData(12, 5000, 3000)

export const mockStageDistribution: IStageDistribution[] = [
  { stage: 'childhood', label: '童年', count: 245, percentage: 7.5 },
  { stage: 'adolescence', label: '青少年', count: 489, percentage: 15.0 },
  { stage: 'youth', label: '青年', count: 1302, percentage: 40.0 },
  { stage: 'middle_age', label: '中年', count: 815, percentage: 25.0 },
  { stage: 'old_age', label: '老年', count: 405, percentage: 12.5 },
]

export const mockAlerts: ISystemAlert[] = [
  { id: 'alert-001', level: 'critical', message: '对话服务响应超时，P95 延迟达到 3.2s', service: '对话服务', time: '2026-02-25 09:15', resolved: false },
  { id: 'alert-002', level: 'warning', message: 'Redis 缓存命中率下降至 72%', service: '缓存服务', time: '2026-02-25 08:42', resolved: false },
  { id: 'alert-003', level: 'info', message: '记忆服务完成自动扩容（2→4 实例）', service: '记忆服务', time: '2026-02-25 08:30', resolved: true },
  { id: 'alert-004', level: 'warning', message: 'MinIO 存储空间使用率达到 85%', service: '对象存储', time: '2026-02-25 07:50', resolved: false },
  { id: 'alert-005', level: 'critical', message: '语音识别服务连接池耗尽', service: '语音服务', time: '2026-02-24 23:18', resolved: true },
]
