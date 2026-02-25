import type { IEmotionConfig, ICrisisRule } from '@/services/emotion.service'
import { EMOTION_LABELS } from '@lifechain/shared'
import type { TEmotionLabel } from '@lifechain/shared'

export const mockEmotionConfigs: IEmotionConfig[] = (Object.keys(EMOTION_LABELS) as TEmotionLabel[]).map((key) => ({
  key,
  label: EMOTION_LABELS[key].label,
  color: EMOTION_LABELS[key].color,
  lowThreshold: 0.3,
  mediumThreshold: 0.6,
  highThreshold: 0.85,
}))

export const mockCrisisRules: ICrisisRule[] = [
  { id: 'crisis-001', name: '持续悲伤预警', emotion: '悲伤', condition: '连续3天高强度', notify: '短信+站内信', enabled: true },
  { id: 'crisis-002', name: '愤怒激增预警', emotion: '愤怒', condition: '1小时内3次高强度', notify: '站内信', enabled: true },
  { id: 'crisis-003', name: '焦虑持续预警', emotion: '焦虑', condition: '连续7天中强度以上', notify: '短信+站内信', enabled: false },
  { id: 'crisis-004', name: '恐惧突发预警', emotion: '恐惧', condition: '单次高强度', notify: '电话+短信', enabled: true },
  { id: 'crisis-005', name: '情绪波动预警', emotion: '多种', condition: '24小时内情绪波动>5次', notify: '站内信', enabled: false },
  { id: 'crisis-006', name: '长期低落预警', emotion: '悲伤', condition: '连续14天平均偏负', notify: '短信+邮件', enabled: true },
]

// ============ 健康边界设置 ============

export interface IHealthBoundary {
  id: string
  name: string
  category: string
  value: string | number
  unit: string
  enabled: boolean
  description: string
}

export const mockHealthBoundaries: IHealthBoundary[] = [
  { id: 'hb-001', name: '每日使用时长上限', category: '使用时长', value: 120, unit: '分钟', enabled: true, description: '超过此时长后提醒用户休息' },
  { id: 'hb-002', name: '单次连续使用上限', category: '使用时长', value: 45, unit: '分钟', enabled: true, description: '连续使用超过此时长强制提醒' },
  { id: 'hb-003', name: '未成年人每日限制', category: '未成年人限制', value: 60, unit: '分钟', enabled: true, description: '未成年用户每日最大使用时长' },
  { id: 'hb-004', name: '未成年人夜间禁用', category: '未成年人限制', value: '22:00-07:00', unit: '', enabled: true, description: '未成年用户禁止使用的时间段' },
  { id: 'hb-005', name: '情绪危机自动阈值', category: '情绪危机', value: 0.85, unit: '', enabled: true, description: '情绪负面值超过此阈值触发危机流程' },
  { id: 'hb-006', name: '连续负面天数阈值', category: '情绪危机', value: 3, unit: '天', enabled: true, description: '连续多天情绪负面触发人工介入' },
  { id: 'hb-007', name: '人工介入响应时间', category: '人工介入', value: 15, unit: '分钟', enabled: true, description: '危机事件最大响应时间要求' },
  { id: 'hb-008', name: '自动安抚重试次数', category: '人工介入', value: 3, unit: '次', enabled: false, description: 'AI安抚失败后自动转人工前的重试次数' },
]

// ============ 健康报告 ============

export interface IHealthReport {
  id: string
  userId: string
  userName: string
  period: string
  overallScore: number
  emotionScore: number
  usageScore: number
  socialScore: number
  generatedAt: string
  status: string
}

export const mockHealthReports: IHealthReport[] = [
  { id: 'hr-001', userId: 'user-001', userName: '张三', period: '2026年2月', overallScore: 85, emotionScore: 82, usageScore: 90, socialScore: 83, generatedAt: '2026-02-25 00:00', status: '已生成' },
  { id: 'hr-002', userId: 'user-002', userName: '李四', period: '2026年2月', overallScore: 72, emotionScore: 65, usageScore: 80, socialScore: 71, generatedAt: '2026-02-25 00:00', status: '已生成' },
  { id: 'hr-003', userId: 'user-003', userName: '王五', period: '2026年2月', overallScore: 58, emotionScore: 45, usageScore: 70, socialScore: 59, generatedAt: '2026-02-25 00:00', status: '需关注' },
  { id: 'hr-004', userId: 'user-004', userName: '赵六', period: '2026年2月', overallScore: 91, emotionScore: 93, usageScore: 88, socialScore: 92, generatedAt: '2026-02-25 00:00', status: '已生成' },
  { id: 'hr-005', userId: 'user-005', userName: '孙七', period: '2026年2月', overallScore: 64, emotionScore: 55, usageScore: 75, socialScore: 62, generatedAt: '2026-02-25 00:00', status: '需关注' },
  { id: 'hr-006', userId: 'user-001', userName: '张三', period: '2026年1月', overallScore: 80, emotionScore: 78, usageScore: 85, socialScore: 77, generatedAt: '2026-02-01 00:00', status: '已生成' },
  { id: 'hr-007', userId: 'user-002', userName: '李四', period: '2026年1月', overallScore: 75, emotionScore: 70, usageScore: 82, socialScore: 73, generatedAt: '2026-02-01 00:00', status: '已生成' },
]
