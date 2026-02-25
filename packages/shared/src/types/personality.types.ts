import type { IBaseEntity } from './common.types'

/** 五大人格维度 */
export interface IBigFive {
  openness: number
  conscientiousness: number
  extraversion: number
  agreeableness: number
  neuroticism: number
}

/** 自定义人格维度 */
export interface ICustomTraits {
  warmth: number
  rationality: number
  humorousness: number
}

/** 行为风格 */
export interface IBehaviorStyle {
  replyLength: 'short' | 'medium' | 'long'
  emojiUsage: 'none' | 'moderate' | 'frequent'
  formalLevel: 'casual' | 'moderate' | 'formal'
  questionFrequency: 'low' | 'moderate' | 'high'
}

/** 关系类型 */
export type TRelationshipType = 'friend' | 'recorder' | 'companion' | 'mentor' | 'family'

/** 人格实体 */
export interface IPersonality extends IBaseEntity, IBigFive, ICustomTraits {
  userId: string
  name: string
  behaviorStyle?: IBehaviorStyle
  relationship: TRelationshipType
  nickname?: string
  version: string
}

/** 人格模板 */
export interface IPersonalityTemplate extends IBaseEntity {
  name: string
  description: string
  bigFive: IBigFive
  customTraits: ICustomTraits
  behaviorStyle: IBehaviorStyle
  relationship: TRelationshipType
  isDefault: boolean
  usageCount: number
}

/** 创建/更新人格模板请求 */
export interface IPersonalityTemplateRequest {
  name: string
  description: string
  bigFive: IBigFive
  customTraits: ICustomTraits
  behaviorStyle: IBehaviorStyle
  relationship: TRelationshipType
  isDefault?: boolean
}
