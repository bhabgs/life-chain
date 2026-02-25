import type { IPersonalityTemplate } from '@lifechain/shared'

const now = new Date().toISOString()

// ============ 形象资源数据 ============

export interface IAvatarResource {
  id: string
  name: string
  description: string
  imageUrl: string
  stage: 'childhood' | 'adolescence' | 'youth' | 'middle_age' | 'old_age'
  status: 'approved' | 'pending' | 'rejected'
  uploadedBy: string
  createdAt: string
  updatedAt: string
}

export const stageLabels = {
  childhood: '童年',
  adolescence: '青少年',
  youth: '青年',
  middle_age: '中年',
  old_age: '老年',
}

export const mockAvatarResources: IAvatarResource[] = [
  {
    id: 'avatar-001',
    name: '阳光小朋友',
    description: '活泼可爱的童年形象，穿着明亮的黄色T恤',
    imageUrl: 'https://picsum.photos/200/200?random=101',
    stage: 'childhood',
    status: 'approved',
    uploadedBy: 'admin',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'avatar-002',
    name: '好奇宝贝',
    description: '充满好奇心的童年形象，手拿放大镜',
    imageUrl: 'https://picsum.photos/200/200?random=102',
    stage: 'childhood',
    status: 'approved',
    uploadedBy: 'admin',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'avatar-003',
    name: '校园少年',
    description: '穿着校服的青少年形象，背着书包',
    imageUrl: 'https://picsum.photos/200/200?random=103',
    stage: 'adolescence',
    status: 'approved',
    uploadedBy: 'admin',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'avatar-004',
    name: '梦想少年',
    description: '充满朝气的青少年形象，眼中带着光芒',
    imageUrl: 'https://picsum.photos/200/200?random=104',
    stage: 'adolescence',
    status: 'pending',
    uploadedBy: 'designer-01',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'avatar-005',
    name: '职场新人',
    description: '穿着商务休闲装的青年形象',
    imageUrl: 'https://picsum.photos/200/200?random=105',
    stage: 'youth',
    status: 'approved',
    uploadedBy: 'admin',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'avatar-006',
    name: '文艺青年',
    description: '戴着眼镜，手捧书本的青年形象',
    imageUrl: 'https://picsum.photos/200/200?random=106',
    stage: 'youth',
    status: 'approved',
    uploadedBy: 'admin',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'avatar-007',
    name: '运动达人',
    description: '穿着运动装备的青年形象',
    imageUrl: 'https://picsum.photos/200/200?random=107',
    stage: 'youth',
    status: 'rejected',
    uploadedBy: 'designer-02',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'avatar-008',
    name: '成熟稳重',
    description: '西装革履的中年形象，气质沉稳',
    imageUrl: 'https://picsum.photos/200/200?random=108',
    stage: 'middle_age',
    status: 'approved',
    uploadedBy: 'admin',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'avatar-009',
    name: '温暖家长',
    description: '慈祥温暖的中年形象',
    imageUrl: 'https://picsum.photos/200/200?random=109',
    stage: 'middle_age',
    status: 'pending',
    uploadedBy: 'designer-01',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'avatar-010',
    name: '智慧长者',
    description: '白发苍苍但精神矍铄的老年形象',
    imageUrl: 'https://picsum.photos/200/200?random=110',
    stage: 'old_age',
    status: 'approved',
    uploadedBy: 'admin',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'avatar-011',
    name: '慈祥奶奶',
    description: '笑容和蔼的老年女性形象',
    imageUrl: 'https://picsum.photos/200/200?random=111',
    stage: 'old_age',
    status: 'approved',
    uploadedBy: 'admin',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'avatar-012',
    name: '太极老人',
    description: '练太极的健康老年形象',
    imageUrl: 'https://picsum.photos/200/200?random=112',
    stage: 'old_age',
    status: 'pending',
    uploadedBy: 'designer-03',
    createdAt: now,
    updatedAt: now,
  },
]

// ============ 对话策略数据 ============

export interface IReplyTemplate {
  id: string
  scene: string
  content: string
  usageCount: number
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface ICompanionMode {
  id: string
  name: string
  description: string
  enabled: boolean
  config: {
    triggerCondition: string
    duration: string
    responseStyle: string
  }
  createdAt: string
  updatedAt: string
}

export interface IEmotionStrategy {
  id: string
  emotionType: string
  strategy: string
  priority: number
  createdAt: string
  updatedAt: string
}

export const mockReplyTemplates: IReplyTemplate[] = [
  {
    id: 'rpt-001',
    scene: '初次见面',
    content: '你好呀！很高兴认识你，我是你的专属数字伙伴。今后的日子里我会一直陪伴你~',
    usageCount: 2345,
    status: 'active',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'rpt-002',
    scene: '生日祝福',
    content: '生日快乐！又长大了一岁呢！希望你新的一岁万事胜意，每天都开开心心的~',
    usageCount: 1890,
    status: 'active',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'rpt-003',
    scene: '安慰鼓励',
    content: '没关系的，每个人都会遇到困难。你已经做得很棒了，我会一直在你身边支持你。',
    usageCount: 3210,
    status: 'active',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'rpt-004',
    scene: '晚安问候',
    content: '晚安~今天辛苦啦，好好休息，明天又是元气满满的一天！',
    usageCount: 5670,
    status: 'active',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'rpt-005',
    scene: '早安问候',
    content: '早安！新的一天开始啦~今天有什么计划吗？',
    usageCount: 4320,
    status: 'active',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'rpt-006',
    scene: '纪念日提醒',
    content: '今天是个特别的日子呢！还记得这个日子对你的意义吗？',
    usageCount: 890,
    status: 'inactive',
    createdAt: now,
    updatedAt: now,
  },
]

export const mockCompanionModes: ICompanionMode[] = [
  {
    id: 'cm-001',
    name: '深夜陪伴',
    description: '在深夜时段提供温暖的陪伴对话，语气更加温柔体贴',
    enabled: true,
    config: {
      triggerCondition: '22:00-06:00 时段用户发起对话',
      duration: '不限',
      responseStyle: '温柔、低沉、简短，避免过于兴奋的语气',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'cm-002',
    name: '沉默陪伴',
    description: '不主动发起话题，仅在用户需要时回应，营造安静的陪伴感',
    enabled: true,
    config: {
      triggerCondition: '用户长时间未说话但仍在线',
      duration: '30分钟',
      responseStyle: '简短回应，不追问，偶尔发送关心的emoji',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'cm-003',
    name: '只倾听模式',
    description: '完全不给建议，只做倾听和情感回应',
    enabled: false,
    config: {
      triggerCondition: '用户主动开启或情绪低落时自动触发',
      duration: '直到用户结束对话',
      responseStyle: '嗯嗯、我理解、我在听、抱抱等简短共情回应',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'cm-004',
    name: '元气激励',
    description: '高能量正向激励模式，适合用户需要打气时使用',
    enabled: true,
    config: {
      triggerCondition: '用户表达沮丧、想放弃等消极情绪时',
      duration: '15分钟',
      responseStyle: '积极、热情、充满力量的语气，引用名言鼓励',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'cm-005',
    name: '回忆引导',
    description: '主动引导用户回忆美好时刻，帮助记录珍贵记忆',
    enabled: false,
    config: {
      triggerCondition: '特殊日期或用户情绪平稳时',
      duration: '20分钟',
      responseStyle: '温暖、引导性提问，帮助用户结构化表达记忆',
    },
    createdAt: now,
    updatedAt: now,
  },
]

export const mockEmotionStrategies: IEmotionStrategy[] = [
  {
    id: 'es-001',
    emotionType: '开心',
    strategy: '分享喜悦，适当互动，引导记录开心的瞬间',
    priority: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'es-002',
    emotionType: '悲伤',
    strategy: '温柔共情，不急于给建议，先倾听再安慰，必要时建议寻求专业帮助',
    priority: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'es-003',
    emotionType: '愤怒',
    strategy: '先认可情绪合理性，引导冷静，避免火上浇油',
    priority: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'es-004',
    emotionType: '焦虑',
    strategy: '提供安全感，引导深呼吸，帮助理清思路，适当转移注意力',
    priority: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'es-005',
    emotionType: '平静',
    strategy: '正常互动，可适当引导深度对话或记忆回顾',
    priority: 5,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'es-006',
    emotionType: '兴奋',
    strategy: '热情互动，一起庆祝，引导记录这个时刻',
    priority: 4,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'es-007',
    emotionType: '孤独',
    strategy: '主动陪伴，分享温暖话语，提醒用户身边有关心他的人',
    priority: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'es-008',
    emotionType: '怀念',
    strategy: '陪伴回忆，引导用户讲述过去的故事，帮助结构化记忆',
    priority: 3,
    createdAt: now,
    updatedAt: now,
  },
]

// ============ 称呼系统数据 ============

export interface INaming {
  id: string
  name: string
  relationship: string
  usageCount: number
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export const mockNamings: INaming[] = [
  {
    id: 'nm-001',
    name: '小伙伴',
    relationship: '朋友',
    usageCount: 8900,
    isDefault: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'nm-002',
    name: '亲爱的',
    relationship: '亲密关系',
    usageCount: 5670,
    isDefault: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'nm-003',
    name: '老师',
    relationship: '师生',
    usageCount: 3210,
    isDefault: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'nm-004',
    name: '宝贝',
    relationship: '家人-孩子',
    usageCount: 7890,
    isDefault: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'nm-005',
    name: '同学',
    relationship: '同学',
    usageCount: 2340,
    isDefault: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'nm-006',
    name: '朋友',
    relationship: '朋友',
    usageCount: 6780,
    isDefault: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'nm-007',
    name: '前辈',
    relationship: '职场',
    usageCount: 1230,
    isDefault: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'nm-008',
    name: '爸爸/妈妈',
    relationship: '家人-父母',
    usageCount: 4560,
    isDefault: false,
    createdAt: now,
    updatedAt: now,
  },
]

export const mockPersonalityTemplates: IPersonalityTemplate[] = [
  {
    id: 'tpl-001',
    name: '温暖朋友',
    description: '性格温暖、善于倾听、适度幽默的朋友型数字人格',
    bigFive: {
      openness: 0.7,
      conscientiousness: 0.6,
      extraversion: 0.65,
      agreeableness: 0.8,
      neuroticism: 0.3,
    },
    customTraits: { warmth: 0.85, rationality: 0.5, humorousness: 0.6 },
    behaviorStyle: {
      replyLength: 'medium',
      emojiUsage: 'moderate',
      formalLevel: 'casual',
      questionFrequency: 'moderate',
    },
    relationship: 'friend',
    isDefault: true,
    usageCount: 1234,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'tpl-002',
    name: '智慧导师',
    description: '理性分析、循循善诱、注重思考深度的导师型人格',
    bigFive: {
      openness: 0.85,
      conscientiousness: 0.8,
      extraversion: 0.4,
      agreeableness: 0.6,
      neuroticism: 0.2,
    },
    customTraits: { warmth: 0.5, rationality: 0.9, humorousness: 0.3 },
    behaviorStyle: {
      replyLength: 'long',
      emojiUsage: 'none',
      formalLevel: 'formal',
      questionFrequency: 'high',
    },
    relationship: 'mentor',
    isDefault: false,
    usageCount: 567,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'tpl-003',
    name: '忠实记录者',
    description: '安静陪伴、客观记录、偶尔引导回忆的记录者人格',
    bigFive: {
      openness: 0.5,
      conscientiousness: 0.9,
      extraversion: 0.3,
      agreeableness: 0.7,
      neuroticism: 0.15,
    },
    customTraits: { warmth: 0.6, rationality: 0.7, humorousness: 0.2 },
    behaviorStyle: {
      replyLength: 'short',
      emojiUsage: 'none',
      formalLevel: 'moderate',
      questionFrequency: 'low',
    },
    relationship: 'recorder',
    isDefault: false,
    usageCount: 321,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'tpl-004',
    name: '欢乐伙伴',
    description: '活泼开朗、爱开玩笑、充满活力的伙伴型人格',
    bigFive: {
      openness: 0.8,
      conscientiousness: 0.4,
      extraversion: 0.9,
      agreeableness: 0.75,
      neuroticism: 0.35,
    },
    customTraits: { warmth: 0.7, rationality: 0.3, humorousness: 0.95 },
    behaviorStyle: {
      replyLength: 'medium',
      emojiUsage: 'frequent',
      formalLevel: 'casual',
      questionFrequency: 'moderate',
    },
    relationship: 'companion',
    isDefault: false,
    usageCount: 890,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'tpl-005',
    name: '家人关怀',
    description: '如家人般关心体贴、嘘寒问暖的家人型人格',
    bigFive: {
      openness: 0.55,
      conscientiousness: 0.7,
      extraversion: 0.6,
      agreeableness: 0.9,
      neuroticism: 0.4,
    },
    customTraits: { warmth: 0.95, rationality: 0.4, humorousness: 0.4 },
    behaviorStyle: {
      replyLength: 'medium',
      emojiUsage: 'moderate',
      formalLevel: 'casual',
      questionFrequency: 'high',
    },
    relationship: 'family',
    isDefault: false,
    usageCount: 456,
    createdAt: now,
    updatedAt: now,
  },
]
