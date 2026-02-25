import type { IMemory, TMemoryType, TLifeStage, TPrivacyLevel } from '@lifechain/shared'

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
