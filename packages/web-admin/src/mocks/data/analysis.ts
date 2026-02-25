// ============ 用户行为分析 ============

export const mockUserBehaviorData = {
  avgDailyUsage: 42, // 分钟
  weeklyActive: 2856,
  monthlyActive: 8923,
  retentionRate: [
    { day: '次日', rate: 68 },
    { day: '3日', rate: 52 },
    { day: '7日', rate: 41 },
    { day: '14日', rate: 35 },
    { day: '30日', rate: 28 },
  ],
  usageTrend: Array.from({ length: 30 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    return {
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      minutes: Math.floor(Math.random() * 30) + 25,
    }
  }),
  featureUsage: [
    { feature: '对话', count: 12340, percent: 35 },
    { feature: '记忆浏览', count: 8920, percent: 25 },
    { feature: '记忆录入', count: 5670, percent: 16 },
    { feature: '人格设置', count: 3560, percent: 10 },
    { feature: '健康报告', count: 2480, percent: 7 },
    { feature: '其他', count: 2530, percent: 7 },
  ],
  churnRisk: [
    { user: '赵六', lastActive: '2026-02-18', riskScore: 89, stage: '青年' },
    { user: '周八', lastActive: '2026-02-15', riskScore: 92, stage: '中年' },
    { user: '冯涛', lastActive: '2026-02-10', riskScore: 95, stage: '青少年' },
    { user: '蒋明', lastActive: '2026-02-12', riskScore: 87, stage: '老年' },
  ],
}

// ============ 记忆数据分析 ============

export const mockMemoryAnalysisData = {
  totalMemories: 15680,
  monthlyGrowth: 12.5,
  avgPerUser: 4.8,
  collectionTrend: Array.from({ length: 12 }, (_, i) => {
    const d = new Date()
    d.setMonth(d.getMonth() - (11 - i))
    return {
      month: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      count: Math.floor(Math.random() * 800) + 800,
    }
  }),
  typeDistribution: [
    { type: '文字', count: 6840, percent: 43.6 },
    { type: '语音', count: 4120, percent: 26.3 },
    { type: '图片', count: 3050, percent: 19.4 },
    { type: '视频', count: 980, percent: 6.3 },
    { type: '事件', count: 690, percent: 4.4 },
  ],
  stageDistribution: [
    { stage: '童年', count: 2140, percent: 13.6 },
    { stage: '青少年', count: 3520, percent: 22.5 },
    { stage: '青年', count: 4680, percent: 29.8 },
    { stage: '中年', count: 3540, percent: 22.6 },
    { stage: '老年', count: 1800, percent: 11.5 },
  ],
}

// ============ 情绪健康分析 ============

export const mockEmotionAnalysisData = {
  overallScore: 72,
  positiveRate: 68,
  crisisCount: 23,
  interventionSuccess: 87,
  emotionTrend: Array.from({ length: 30 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    return {
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      positive: Math.floor(Math.random() * 20) + 55,
      negative: Math.floor(Math.random() * 15) + 10,
      neutral: Math.floor(Math.random() * 10) + 20,
    }
  }),
  abnormalEvents: [
    { id: 'ae-001', user: '王五', emotion: '持续悲伤', duration: '3天', status: '已干预', time: '2026-02-24 10:00' },
    { id: 'ae-002', user: '孙七', emotion: '焦虑加重', duration: '5天', status: '观察中', time: '2026-02-23 15:30' },
    { id: 'ae-003', user: '郑雅', emotion: '情绪波动', duration: '1天', status: '已恢复', time: '2026-02-22 09:00' },
    { id: 'ae-004', user: '冯涛', emotion: '愤怒频发', duration: '2天', status: '已干预', time: '2026-02-21 14:20' },
    { id: 'ae-005', user: '陈慧', emotion: '低落情绪', duration: '7天', status: '观察中', time: '2026-02-20 08:45' },
  ],
  interventionEffect: [
    { method: '对话安抚', successRate: 82, count: 156 },
    { method: '内容推送', successRate: 75, count: 89 },
    { method: '人工介入', successRate: 93, count: 34 },
    { method: '活动引导', successRate: 71, count: 67 },
  ],
}

// ============ 报表数据 ============

export const mockReportData = [
  { id: 'rpt-001', title: '2026年2月运营周报', type: '周报', format: 'PDF', status: '已生成', createdAt: '2026-02-24 08:00', size: '2.3MB' },
  { id: 'rpt-002', title: '2026年1月用户分析月报', type: '月报', format: 'Excel', status: '已生成', createdAt: '2026-02-01 10:00', size: '5.1MB' },
  { id: 'rpt-003', title: '2026年1月情绪健康报告', type: '月报', format: 'PDF', status: '已生成', createdAt: '2026-02-01 10:00', size: '3.7MB' },
  { id: 'rpt-004', title: '2026年2月记忆采集趋势', type: '周报', format: 'PDF', status: '生成中', createdAt: '2026-02-25 09:00', size: '-' },
  { id: 'rpt-005', title: '2025年度运营总结', type: '年报', format: 'PDF', status: '已生成', createdAt: '2026-01-05 09:00', size: '18.2MB' },
  { id: 'rpt-006', title: 'Q4季度用户行为报告', type: '季报', format: 'Excel', status: '已生成', createdAt: '2026-01-10 14:00', size: '8.5MB' },
]
