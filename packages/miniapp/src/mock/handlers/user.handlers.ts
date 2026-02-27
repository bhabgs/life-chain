import type { IRouteEntry } from '../helpers'
import { ok } from '../helpers'
import { mockCurrentUser, mockUserSettings } from '../data/user'

let currentSettings = { ...mockUserSettings }

export const userHandlers: IRouteEntry[] = [
  // 获取用户设置（放在 /user/profile 之前避免冲突）
  {
    method: 'GET',
    pattern: '/user/settings',
    handler: () => ok(currentSettings),
  },

  // 保存用户设置
  {
    method: 'PUT',
    pattern: '/user/settings',
    handler: (req) => {
      currentSettings = { ...currentSettings, ...req.data }
      return ok(currentSettings)
    },
  },

  // 用户信息
  {
    method: 'GET',
    pattern: '/user/profile',
    handler: () => ok(mockCurrentUser),
  },

  // 更新用户信息
  {
    method: 'PUT',
    pattern: '/user/profile',
    handler: (req) => ok({ ...mockCurrentUser, ...req.data }),
  },
]
