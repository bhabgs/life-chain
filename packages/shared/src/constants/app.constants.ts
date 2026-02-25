import type { TLifeStage, TPrivacyLevel } from '../types/common.types'
import type { TEmotionLabel } from '../types/emotion.types'
import type { TMemoryType } from '../types/memory.types'
import type { TUserRole, TUserStatus } from '../types/user.types'
import type { TRelationshipType } from '../types/personality.types'

/** 人生阶段配置 */
export const LIFE_STAGES: Record<TLifeStage, { label: string; ageRange: string }> = {
  childhood: { label: '童年', ageRange: '0-12岁' },
  adolescence: { label: '青少年', ageRange: '13-18岁' },
  youth: { label: '青年', ageRange: '19-35岁' },
  middle_age: { label: '中年', ageRange: '36-55岁' },
  old_age: { label: '老年', ageRange: '56岁+' },
}

/** 隐私等级配置 */
export const PRIVACY_LEVELS: Record<TPrivacyLevel, { label: string; description: string }> = {
  1: { label: '仅自己', description: '仅本人可见' },
  2: { label: '继承人可见', description: '本人和继承人可见' },
  3: { label: '公开', description: '所有人可见' },
}

/** 记忆类型配置 */
export const MEMORY_TYPES: Record<TMemoryType, { label: string; icon: string }> = {
  text: { label: '文字', icon: 'FileTextOutlined' },
  voice: { label: '语音', icon: 'AudioOutlined' },
  image: { label: '图片', icon: 'PictureOutlined' },
  video: { label: '视频', icon: 'VideoCameraOutlined' },
  event: { label: '事件', icon: 'CalendarOutlined' },
}

/** 情绪标签配置 */
export const EMOTION_LABELS: Record<TEmotionLabel, { label: string; color: string }> = {
  happy: { label: '快乐', color: '#FFD700' },
  sad: { label: '悲伤', color: '#4169E1' },
  angry: { label: '愤怒', color: '#FF4500' },
  fearful: { label: '恐惧', color: '#8B008B' },
  surprised: { label: '惊讶', color: '#FF69B4' },
  disgusted: { label: '厌恶', color: '#556B2F' },
  neutral: { label: '平静', color: '#808080' },
  anxious: { label: '焦虑', color: '#FF8C00' },
  peaceful: { label: '安宁', color: '#20B2AA' },
  excited: { label: '兴奋', color: '#FF1493' },
}

/** 用户状态配置 */
export const USER_STATUS: Record<TUserStatus, { label: string; color: string }> = {
  active: { label: '正常', color: 'green' },
  suspended: { label: '已冻结', color: 'orange' },
  deleted: { label: '已删除', color: 'red' },
}

/** 用户角色配置 */
export const USER_ROLES: Record<TUserRole, { label: string }> = {
  user: { label: '普通用户' },
  admin: { label: '管理员' },
  auditor: { label: '审核员' },
}

/** 关系类型配置 */
export const RELATIONSHIP_TYPES: Record<TRelationshipType, { label: string }> = {
  friend: { label: '朋友' },
  recorder: { label: '记录者' },
  companion: { label: '伴侣' },
  mentor: { label: '导师' },
  family: { label: '家人' },
}
