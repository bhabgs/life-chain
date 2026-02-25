/** 人生阶段 */
export type TLifeStage = 'childhood' | 'adolescence' | 'youth' | 'middle_age' | 'old_age'

/** 隐私等级 */
export type TPrivacyLevel = 1 | 2 | 3 // 1:仅自己 2:继承人可见 3:公开

/** 通用时间戳字段 */
export interface ITimestamp {
  createdAt: string
  updatedAt: string
}

/** 带软删除的时间戳 */
export interface ISoftDeletable extends ITimestamp {
  deletedAt?: string | null
}

/** ID 字段 */
export interface IIdentifiable {
  id: string
}

/** 通用基础实体 */
export interface IBaseEntity extends IIdentifiable, ITimestamp {}
