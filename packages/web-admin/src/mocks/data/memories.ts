import type { IMemory, TMemoryType, TLifeStage, TPrivacyLevel } from '@lifechain/shared'

// ============ 记忆结构化规则数据 ============

export interface IStructuringRule {
  id: string
  category: string
  name: string
  expression: string
  priority: number
  enabled: boolean
  createdAt: string
  updatedAt: string
}

const ruleNow = new Date().toISOString()

export const mockStructuringRules: IStructuringRule[] = [
  // 关键词提取规则
  {
    id: 'rule-001',
    category: 'keyword',
    name: '情感关键词提取',
    expression: '匹配包含"开心|难过|感动|愤怒|惊喜"等情感词汇',
    priority: 1,
    enabled: true,
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
  {
    id: 'rule-002',
    category: 'keyword',
    name: '地点关键词提取',
    expression: '匹配"在XX"、"去了XX"、"来到XX"等地点表达模式',
    priority: 2,
    enabled: true,
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
  {
    id: 'rule-003',
    category: 'keyword',
    name: '时间关键词提取',
    expression: '匹配日期、时间、"那年|那天|当时"等时间表达',
    priority: 1,
    enabled: true,
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
  // 人物识别规则
  {
    id: 'rule-004',
    category: 'person',
    name: '亲属关系识别',
    expression: '匹配"爸爸|妈妈|爷爷|奶奶|哥哥|姐姐"等亲属称谓',
    priority: 1,
    enabled: true,
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
  {
    id: 'rule-005',
    category: 'person',
    name: '姓名实体识别',
    expression: 'NER模型识别人名实体，支持中英文姓名',
    priority: 2,
    enabled: true,
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
  {
    id: 'rule-006',
    category: 'person',
    name: '社会关系识别',
    expression: '匹配"同事|同学|老师|领导|朋友"等社会关系词',
    priority: 3,
    enabled: false,
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
  // 事件分类规则
  {
    id: 'rule-007',
    category: 'event',
    name: '里程碑事件识别',
    expression: '匹配"毕业|结婚|出生|升职|退休"等人生里程碑词',
    priority: 1,
    enabled: true,
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
  {
    id: 'rule-008',
    category: 'event',
    name: '日常事件分类',
    expression: '匹配"吃饭|购物|运动|上班|旅行"等日常活动词',
    priority: 3,
    enabled: true,
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
  {
    id: 'rule-009',
    category: 'event',
    name: '节日事件识别',
    expression: '匹配"春节|中秋|生日|国庆|圣诞"等节日词',
    priority: 2,
    enabled: true,
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
  // 阶段划分规则
  {
    id: 'rule-010',
    category: 'stage',
    name: '年龄段自动划分',
    expression: '根据用户出生日期和记忆时间自动计算人生阶段',
    priority: 1,
    enabled: true,
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
  {
    id: 'rule-011',
    category: 'stage',
    name: '内容语义推断',
    expression: '通过内容中的"上学|工作|退休"等语义推断人生阶段',
    priority: 2,
    enabled: false,
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
  {
    id: 'rule-012',
    category: 'stage',
    name: '关联人物推断',
    expression: '通过提及人物的关系类型（老师→学生阶段）推断阶段',
    priority: 3,
    enabled: true,
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
]

// ============ 记忆回顾模板数据 ============

export interface IReviewTemplate {
  id: string
  name: string
  description: string
  type: string
  stage?: string
  applicableStage?: string
  version: string
  content: string
  createdAt: string
  updatedAt: string
}

export const mockReviewTemplates: IReviewTemplate[] = [
  {
    id: 'rt-001',
    name: '童年时光回忆录',
    description: '回顾童年阶段的美好时光，整理关键成长记忆',
    type: 'stage_summary',
    applicableStage: '童年',
    version: 'v1.2',
    content: '# 我的童年时光\n\n## 最早的记忆\n{{earliest_memory}}\n\n## 家庭故事\n{{family_stories}}\n\n## 童年趣事\n{{fun_stories}}\n\n## 成长足迹\n{{growth_milestones}}',
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
  {
    id: 'rt-002',
    name: '青春纪念册',
    description: '记录青少年时期的成长、友谊和梦想',
    type: 'stage_summary',
    applicableStage: '青少年',
    version: 'v1.0',
    content: '# 我的青春纪念册\n\n## 校园生活\n{{school_life}}\n\n## 青春友谊\n{{friendships}}\n\n## 成长烦恼\n{{growing_pains}}\n\n## 梦想起航\n{{dreams}}',
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
  {
    id: 'rt-003',
    name: '年度生活报告',
    description: '回顾过去一年的生活点滴，生成个人年度报告',
    type: 'annual_report',
    applicableStage: '全阶段',
    version: 'v2.1',
    content: '# {{year}}年度生活报告\n\n## 年度关键词\n{{keywords}}\n\n## 重要时刻\n{{highlights}}\n\n## 数据统计\n- 记录记忆数：{{memory_count}}\n- 开心天数：{{happy_days}}\n\n## 年度总结\n{{summary}}',
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
  {
    id: 'rt-004',
    name: '年度情感地图',
    description: '以情感变化为主线的年度回顾',
    type: 'annual_report',
    applicableStage: '全阶段',
    version: 'v1.0',
    content: '# {{year}}情感地图\n\n## 情绪曲线\n{{emotion_chart}}\n\n## 最开心的时刻\n{{happiest_moments}}\n\n## 最感动的瞬间\n{{touching_moments}}\n\n## 成长与收获\n{{growth}}',
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
  {
    id: 'rt-005',
    name: '我的人生故事（简版）',
    description: '将所有记忆串联成一个完整的人生故事',
    type: 'life_story',
    applicableStage: '全阶段',
    version: 'v1.5',
    content: '# 我的人生故事\n\n## 序章\n{{prologue}}\n\n## 第一章：童年\n{{childhood}}\n\n## 第二章：少年\n{{adolescence}}\n\n## 第三章：青年\n{{youth}}\n\n## 后记\n{{epilogue}}',
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
  {
    id: 'rt-006',
    name: '家族传承故事',
    description: '以家族为主线的人生故事模板，适合跨代传承',
    type: 'life_story',
    applicableStage: '全阶段',
    version: 'v1.0',
    content: '# 我们的家族故事\n\n## 家族起源\n{{family_origin}}\n\n## 父辈的故事\n{{parents_story}}\n\n## 我的故事\n{{my_story}}\n\n## 写给后代的话\n{{message_to_future}}',
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
]

// ============ 记忆存储管理数据 ============

export interface IStorageInfo {
  totalCapacity: number       // GB
  usedCapacity: number        // GB
  usageRate: number           // 百分比
  growthTrend: number         // 月增长率百分比
  distribution: {
    text: number
    voice: number
    image: number
    video: number
  }
}

export interface IBackupRecord {
  id: string
  backupTime: string
  size: string
  status: 'success' | 'failed' | 'running'
  type: 'auto' | 'manual'
}

export interface IBackupStrategy {
  enabled: boolean
  frequency: 'daily' | 'weekly' | 'monthly'
  retentionDays: number
  storagePath: string
  maxBackups: number
}

export interface IArchiveRule {
  id: string
  name: string
  condition: string
  archiveDays: number
  enabled: boolean
  createdAt: string
  updatedAt: string
}

export const mockStorageInfo: IStorageInfo = {
  totalCapacity: 500,
  usedCapacity: 187.5,
  usageRate: 37.5,
  growthTrend: 3.2,
  distribution: {
    text: 25,
    voice: 120,
    image: 30,
    video: 12.5,
  },
}

export const mockBackupRecords: IBackupRecord[] = [
  {
    id: 'bk-001',
    backupTime: '2026-02-25 03:00:00',
    size: '12.3 GB',
    status: 'success',
    type: 'auto',
  },
  {
    id: 'bk-002',
    backupTime: '2026-02-24 03:00:00',
    size: '12.1 GB',
    status: 'success',
    type: 'auto',
  },
  {
    id: 'bk-003',
    backupTime: '2026-02-23 15:30:00',
    size: '12.0 GB',
    status: 'success',
    type: 'manual',
  },
  {
    id: 'bk-004',
    backupTime: '2026-02-23 03:00:00',
    size: '11.9 GB',
    status: 'failed',
    type: 'auto',
  },
  {
    id: 'bk-005',
    backupTime: '2026-02-22 03:00:00',
    size: '11.8 GB',
    status: 'success',
    type: 'auto',
  },
]

export const mockBackupStrategy: IBackupStrategy = {
  enabled: true,
  frequency: 'daily',
  retentionDays: 30,
  storagePath: '/data/backups/memory',
  maxBackups: 30,
}

export const mockArchiveRules: IArchiveRule[] = [
  {
    id: 'ar-001',
    name: '冷数据自动归档',
    condition: '超过180天未被访问的记忆',
    archiveDays: 180,
    enabled: true,
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
  {
    id: 'ar-002',
    name: '低优先级记忆归档',
    condition: '隐私等级为1且无标签的记忆',
    archiveDays: 90,
    enabled: false,
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
  {
    id: 'ar-003',
    name: '大文件归档',
    condition: '单文件超过100MB的视频/语音记忆',
    archiveDays: 60,
    enabled: true,
    createdAt: ruleNow,
    updatedAt: ruleNow,
  },
]

// ============ 原有记忆数据 ============

const types: TMemoryType[] = ['text', 'voice', 'image', 'video', 'event']
const stages: TLifeStage[] = ['childhood', 'adolescence', 'youth', 'middle_age', 'old_age']
const emotions = ['happy', 'sad', 'neutral', 'excited', 'peaceful', 'anxious']
const titles = [
  '第一次骑自行车', '高考前夕', '大学毕业', '第一份工作', '遇见你的那天',
  '生日派对', '旅行记忆', '深夜的思考', '家庭聚会', '毕业典礼',
  '春节回家', '考试通过', '学会游泳', '第一次演讲', '搬新家',
  '结婚纪念日', '孩子出生', '升职加薪', '退休计划', '晨跑日记',
  '读完一本好书', '老同学聚会', '周末徒步', '学做新菜', '看日出',
]
const contents = [
  '今天发生了一件特别有意思的事情...',
  '回忆起那段时光，心里满是感动。',
  '这是一段很重要的记忆，我想永远记住。',
  '生活总是充满惊喜，今天也不例外。',
  '有些事情，过了很久才明白其中的意义。',
]

export const mockMemories: IMemory[] = Array.from({ length: 80 }, (_, i) => {
  const daysAgo = Math.floor(Math.random() * 365)
  const createdAt = new Date(Date.now() - daysAgo * 86400000).toISOString()
  const type = types[i % types.length]

  return {
    id: `memory-${String(i + 1).padStart(3, '0')}`,
    userId: `user-${String((i % 35) + 1).padStart(3, '0')}`,
    type,
    title: titles[i % titles.length],
    content: contents[i % contents.length],
    metadata: {
      location: ['北京', '上海', '广州', '深圳', '成都'][i % 5],
      people: ['张三', '李四'].slice(0, (i % 3) + 1),
      tags: ['重要', '日常', '家庭', '工作', '旅行'].slice(0, (i % 3) + 1),
    },
    emotion: emotions[i % emotions.length],
    stage: stages[i % stages.length],
    privacyLevel: ((i % 3) + 1) as TPrivacyLevel,
    mediaUrls: type === 'image' ? [`https://picsum.photos/400/300?random=${i}`] : [],
    createdAt,
    updatedAt: createdAt,
    deletedAt: null,
  }
})
