import type { ISoftDeletable, TLifeStage, TPrivacyLevel } from './common.types'

/** 记忆类型 */
export type TMemoryType = 'text' | 'voice' | 'image' | 'video' | 'event'

/** 记忆实体 */
export interface IMemory extends ISoftDeletable {
  id: string
  userId: string
  type: TMemoryType
  title?: string
  content?: string
  metadata?: IMemoryMetadata
  emotion?: string
  stage?: TLifeStage
  privacyLevel: TPrivacyLevel
  mediaUrls: string[]
}

/** 记忆元数据 */
export interface IMemoryMetadata {
  location?: string
  people?: string[]
  tags?: string[]
  weather?: string
  mood?: string
}

/** 记忆列表查询参数 */
export interface IMemoryQueryParams {
  page?: number
  pageSize?: number
  userId?: string
  type?: TMemoryType
  stage?: TLifeStage
  keyword?: string
  startDate?: string
  endDate?: string
  privacyLevel?: TPrivacyLevel
}

/** 记忆统计 */
export interface IMemoryStats {
  total: number
  byType: Record<TMemoryType, number>
  byStage: Record<TLifeStage, number>
  byMonth: Array<{ month: string; count: number }>
}

/** 时间轴记忆项 */
export interface ITimelineItem {
  date: string
  memories: IMemory[]
}
