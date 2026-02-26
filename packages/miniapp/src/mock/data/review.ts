/** 时间轴数据 */
export interface ITimelineGroup {
  month: string
  label: string
  count: number
  highlights: Array<{
    id: string
    title: string
    date: string
    type: string
    isImportant: boolean
  }>
}

export const mockTimelineData: ITimelineGroup[] = [
  {
    month: '2026-02',
    label: '2026年2月',
    count: 15,
    highlights: [
      { id: 'mem-001', title: '今天和妈妈通了电话', date: '2026-02-25', type: 'text', isImportant: false },
      { id: 'mem-002', title: '公司团建合照', date: '2026-02-24', type: 'image', isImportant: true },
      { id: 'mem-006', title: '工作上的小突破', date: '2026-02-20', type: 'text', isImportant: true },
      { id: 'mem-014', title: '养了一只猫', date: '2026-02-12', type: 'text', isImportant: true },
      { id: 'mem-015', title: '新年愿望', date: '2026-02-10', type: 'text', isImportant: false },
    ],
  },
  {
    month: '2026-01',
    label: '2026年1月',
    count: 12,
    highlights: [
      { id: 'tl-101', title: '新年第一天', date: '2026-01-01', type: 'text', isImportant: true },
      { id: 'tl-102', title: '和朋友跨年', date: '2026-01-01', type: 'image', isImportant: true },
      { id: 'tl-103', title: '年终总结', date: '2026-01-05', type: 'text', isImportant: false },
      { id: 'tl-104', title: '学会了做红烧肉', date: '2026-01-15', type: 'text', isImportant: false },
    ],
  },
  {
    month: '2025-12',
    label: '2025年12月',
    count: 18,
    highlights: [
      { id: 'tl-201', title: '注册了生命链', date: '2025-12-01', type: 'text', isImportant: true },
      { id: 'tl-202', title: '圣诞节和朋友聚餐', date: '2025-12-25', type: 'image', isImportant: true },
      { id: 'tl-203', title: '年度阅读总结', date: '2025-12-30', type: 'text', isImportant: false },
    ],
  },
]

/** 阶段总结数据 */
export interface IStageSummary {
  id: string
  period: string
  periodLabel: string
  memoryCount: number
  chatCount: number
  emotionDistribution: Record<string, number>
  keywords: string[]
  highlights: string[]
}

export const mockStageSummaries: IStageSummary[] = [
  {
    id: 'summary-30d',
    period: '30d',
    periodLabel: '近30天总结',
    memoryCount: 15,
    chatCount: 35,
    emotionDistribution: {
      happy: 35,
      peaceful: 25,
      anxious: 15,
      sad: 10,
      excited: 15,
    },
    keywords: ['家人', '工作', '成长', '阅读', '美食'],
    highlights: [
      '工作方案被领导采纳，获得团队认可',
      '领养了小猫阿橘，生活多了一个小伙伴',
      '坚持每周和妈妈通电话',
    ],
  },
  {
    id: 'summary-90d',
    period: '90d',
    periodLabel: '近90天总结',
    memoryCount: 45,
    chatCount: 120,
    emotionDistribution: {
      happy: 30,
      peaceful: 28,
      anxious: 12,
      sad: 8,
      excited: 12,
      neutral: 10,
    },
    keywords: ['家庭', '事业', '阅读', '运动', '朋友', '成长'],
    highlights: [
      '完成了年度阅读目标，共读了12本书',
      '工作中独立负责了两个重要项目',
      '开始学习烘焙，解锁了新技能',
      '和家人一起过了一个温馨的春节',
    ],
  },
]
