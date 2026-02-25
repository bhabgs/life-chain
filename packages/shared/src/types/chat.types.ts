import type { IBaseEntity } from './common.types'

/** 消息角色 */
export type TChatRole = 'user' | 'assistant' | 'system'

/** 对话模式 */
export type TChatMode = 'normal' | 'night' | 'silent' | 'listen'

/** 会话状态 */
export type TChatSessionStatus = 'active' | 'archived' | 'deleted'

/** 对话会话 */
export interface IChatSession extends IBaseEntity {
  userId: string
  title?: string
  mode: TChatMode
  status: TChatSessionStatus
  messageCount: number
  lastMessageAt?: string
}

/** 对话消息 */
export interface IChatMessage {
  id: string
  sessionId: string
  role: TChatRole
  content: string
  emotion?: string
  metadata?: Record<string, unknown>
  createdAt: string
}
