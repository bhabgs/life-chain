import type { ISoftDeletable } from './common.types'

/** 用户状态 */
export type TUserStatus = 'active' | 'suspended' | 'deleted'

/** 用户角色 */
export type TUserRole = 'user' | 'admin' | 'auditor'

/** 用户性别 */
export type TGender = 'male' | 'female' | 'other'

/** 用户实体 */
export interface IUser extends ISoftDeletable {
  id: string
  email: string
  phone?: string
  username: string
  nickname?: string
  avatar?: string
  birthDate?: string
  gender?: TGender
  status: TUserStatus
  role: TUserRole
}

/** 用户列表查询参数 */
export interface IUserQueryParams {
  page?: number
  pageSize?: number
  keyword?: string
  status?: TUserStatus
  role?: TUserRole
  startDate?: string
  endDate?: string
}

/** 创建用户请求 */
export interface ICreateUserRequest {
  email: string
  username: string
  password: string
  nickname?: string
  role?: TUserRole
}

/** 更新用户请求 */
export interface IUpdateUserRequest {
  nickname?: string
  avatar?: string
  birthDate?: string
  gender?: TGender
  status?: TUserStatus
  role?: TUserRole
}

/** 用户详情（含统计） */
export interface IUserDetail extends IUser {
  memoryCount: number
  chatSessionCount: number
  lastActiveAt?: string
  personality?: {
    id: string
    name: string
    relationship: string
  }
}
