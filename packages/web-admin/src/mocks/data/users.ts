import type { IUserDetail } from '@lifechain/shared'

// ========== 用户分组统计数据 ==========

export interface ISegmentItem {
  label: string
  count: number
  percent: number
}

export interface ISegmentsData {
  byAge: ISegmentItem[]
  byActivity: ISegmentItem[]
  byDuration: ISegmentItem[]
}

export const mockSegmentsData: ISegmentsData = {
  byAge: [
    { label: '童年（0-12岁）', count: 120, percent: 6.8 },
    { label: '青少年（13-17岁）', count: 350, percent: 19.9 },
    { label: '青年（18-35岁）', count: 680, percent: 38.6 },
    { label: '中年（36-55岁）', count: 420, percent: 23.9 },
    { label: '老年（56岁以上）', count: 190, percent: 10.8 },
  ],
  byActivity: [
    { label: '高活跃', count: 520, percent: 29.5 },
    { label: '中活跃', count: 610, percent: 34.7 },
    { label: '低活跃', count: 380, percent: 21.6 },
    { label: '沉默用户', count: 250, percent: 14.2 },
  ],
  byDuration: [
    { label: '<1个月', count: 280, percent: 15.9 },
    { label: '1-3个月', count: 420, percent: 23.9 },
    { label: '3-6个月', count: 360, percent: 20.5 },
    { label: '6-12个月', count: 310, percent: 17.6 },
    { label: '>1年', count: 390, percent: 22.2 },
  ],
}

// ========== 待审核用户数据 ==========

export type TReviewStatus = 'pending' | 'approved' | 'rejected'

export interface IReviewUser {
  id: string
  username: string
  email: string
  registeredAt: string
  reason: string
  reviewStatus: TReviewStatus
  reviewedAt?: string
  reviewReason?: string
  reviewer?: string
}

export const mockReviewUsers: IReviewUser[] = [
  {
    id: 'review-001',
    username: '刘备',
    email: 'liubei@example.com',
    registeredAt: '2026-02-20T10:30:00Z',
    reason: '想为父亲创建数字人格，记录他的人生故事',
    reviewStatus: 'pending',
  },
  {
    id: 'review-002',
    username: '关羽',
    email: 'guanyu@example.com',
    registeredAt: '2026-02-19T14:20:00Z',
    reason: '帮助家族记录跨代传承的历史资料',
    reviewStatus: 'pending',
  },
  {
    id: 'review-003',
    username: '张飞',
    email: 'zhangfei@example.com',
    registeredAt: '2026-02-18T09:15:00Z',
    reason: '研究数字人格技术，用于学术论文',
    reviewStatus: 'pending',
  },
  {
    id: 'review-004',
    username: '诸葛亮',
    email: 'zhugeliang@example.com',
    registeredAt: '2026-02-17T16:45:00Z',
    reason: '为社区老人建立数字记忆档案的公益项目',
    reviewStatus: 'pending',
  },
  {
    id: 'review-005',
    username: '赵云',
    email: 'zhaoyun@example.com',
    registeredAt: '2026-02-16T08:00:00Z',
    reason: '记录自己的成长历程，留给未来的孩子',
    reviewStatus: 'pending',
  },
  {
    id: 'review-006',
    username: '黄忠',
    email: 'huangzhong@example.com',
    registeredAt: '2026-02-15T11:30:00Z',
    reason: '年纪大了，想把记忆留给后人',
    reviewStatus: 'approved',
    reviewedAt: '2026-02-16T09:00:00Z',
    reviewReason: '用途合理，符合平台定位',
    reviewer: '管理员A',
  },
  {
    id: 'review-007',
    username: '马超',
    email: 'machao@example.com',
    registeredAt: '2026-02-14T13:20:00Z',
    reason: '商业用途，打算二次出售数据',
    reviewStatus: 'rejected',
    reviewedAt: '2026-02-15T10:00:00Z',
    reviewReason: '涉及商业倒卖数据，不符合使用条款',
    reviewer: '管理员B',
  },
  {
    id: 'review-008',
    username: '魏延',
    email: 'weiyan@example.com',
    registeredAt: '2026-02-13T17:50:00Z',
    reason: '为家族编写族谱，结合数字人格做互动展示',
    reviewStatus: 'approved',
    reviewedAt: '2026-02-14T08:30:00Z',
    reviewReason: '通过审核',
    reviewer: '管理员A',
  },
  {
    id: 'review-009',
    username: '姜维',
    email: 'jiangwei@example.com',
    registeredAt: '2026-02-12T15:10:00Z',
    reason: '教育工作者，想把教学经验和知识传承下去',
    reviewStatus: 'pending',
  },
  {
    id: 'review-010',
    username: '庞统',
    email: 'pangtong@example.com',
    registeredAt: '2026-02-11T20:00:00Z',
    reason: '心理咨询师，为来访者建立心灵陪伴档案',
    reviewStatus: 'rejected',
    reviewedAt: '2026-02-12T09:00:00Z',
    reviewReason: '涉及第三方隐私，需要提供额外授权证明',
    reviewer: '管理员B',
  },
]

// ========== 用户行为统计数据 ==========

export interface IBehaviorStats {
  avgDailyUsage: number
  monthlyActiveRate: number
  sevenDayRetention: number
  churnRiskCount: number
}

export interface IUsageFrequency {
  date: string
  count: number
}

export interface IFeatureHeatmapItem {
  hour: number
  day: number
  value: number
}

export interface IChurnRiskUser {
  id: string
  username: string
  lastActiveAt: string
  activeDays: number
  riskLevel: 'high' | 'medium' | 'low'
}

export const mockBehaviorStats: IBehaviorStats = {
  avgDailyUsage: 42,
  monthlyActiveRate: 68.5,
  sevenDayRetention: 73.2,
  churnRiskCount: 156,
}

export const mockUsageFrequencyDaily: IUsageFrequency[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
  count: Math.floor(Math.random() * 800) + 400,
}))

export const mockUsageFrequencyWeekly: IUsageFrequency[] = Array.from({ length: 12 }, (_, i) => ({
  date: `第${i + 1}周`,
  count: Math.floor(Math.random() * 5000) + 2000,
}))

export const mockUsageFrequencyMonthly: IUsageFrequency[] = [
  { date: '2025-09', count: 12500 },
  { date: '2025-10', count: 14200 },
  { date: '2025-11', count: 13800 },
  { date: '2025-12', count: 15600 },
  { date: '2026-01', count: 16800 },
  { date: '2026-02', count: 15200 },
]

const dayLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
export const mockFeatureHeatmap: IFeatureHeatmapItem[] = []
for (let day = 0; day < 7; day++) {
  for (let hour = 0; hour < 24; hour++) {
    const isWeekend = day >= 5
    const isPeak = hour >= 9 && hour <= 22
    const base = isWeekend ? 60 : 40
    const peak = isPeak ? 50 : 0
    mockFeatureHeatmap.push({
      hour,
      day,
      value: Math.floor(Math.random() * 80) + base + peak,
    })
  }
}
export { dayLabels as heatmapDayLabels }

export const mockChurnRiskUsers: IChurnRiskUser[] = [
  { id: 'churn-001', username: '陈旧用户A', lastActiveAt: '2026-01-10T08:00:00Z', activeDays: 3, riskLevel: 'high' },
  { id: 'churn-002', username: '低频用户B', lastActiveAt: '2026-01-25T14:30:00Z', activeDays: 8, riskLevel: 'high' },
  { id: 'churn-003', username: '沉默用户C', lastActiveAt: '2026-02-01T10:00:00Z', activeDays: 12, riskLevel: 'medium' },
  { id: 'churn-004', username: '边缘用户D', lastActiveAt: '2026-02-05T16:20:00Z', activeDays: 15, riskLevel: 'medium' },
  { id: 'churn-005', username: '不活跃E', lastActiveAt: '2026-02-08T09:45:00Z', activeDays: 18, riskLevel: 'medium' },
  { id: 'churn-006', username: '减少用户F', lastActiveAt: '2026-02-10T11:00:00Z', activeDays: 22, riskLevel: 'low' },
  { id: 'churn-007', username: '回归用户G', lastActiveAt: '2026-02-12T13:30:00Z', activeDays: 25, riskLevel: 'low' },
  { id: 'churn-008', username: '观望用户H', lastActiveAt: '2026-02-14T08:15:00Z', activeDays: 28, riskLevel: 'low' },
]

// ========== 原始用户数据 ==========

const now = new Date().toISOString()

export const mockUsers: IUserDetail[] = Array.from({ length: 35 }, (_, i) => {
  const id = `user-${String(i + 1).padStart(3, '0')}`
  const statuses = ['active', 'active', 'active', 'suspended', 'deleted'] as const
  const roles = ['user', 'user', 'user', 'admin', 'auditor'] as const
  const genders = ['male', 'female', 'other'] as const
  const names = [
    '张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十',
    '郑雅', '冯涛', '陈慧', '褚玲', '卫东', '蒋明', '沈丽', '韩飞',
    '杨洋', '朱峰', '秦刚', '尤敏', '许宁', '何华', '吕燕', '施磊',
    '张晓', '林默', '宋文', '马超', '黄晓', '梁思', '曹雪', '罗平',
    '高远', '徐静', '谢芳',
  ]

  const daysAgo = Math.floor(Math.random() * 180)
  const createdAt = new Date(Date.now() - daysAgo * 86400000).toISOString()

  return {
    id,
    email: `user${i + 1}@lifechain.com`,
    phone: `138${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
    username: `user_${i + 1}`,
    nickname: names[i % names.length],
    avatar: undefined,
    birthDate: `${1970 + Math.floor(Math.random() * 40)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    gender: genders[i % genders.length],
    status: statuses[i % statuses.length],
    role: roles[i % roles.length],
    memoryCount: Math.floor(Math.random() * 200),
    chatSessionCount: Math.floor(Math.random() * 50),
    lastActiveAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 86400000).toISOString(),
    personality: i % 3 === 0 ? undefined : {
      id: `pers-${id}`,
      name: '小链',
      relationship: 'friend',
    },
    createdAt,
    updatedAt: now,
    deletedAt: null,
  }
})
