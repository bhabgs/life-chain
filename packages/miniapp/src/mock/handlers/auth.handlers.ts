import type { IRouteEntry } from '../helpers'
import { ok } from '../helpers'
import { mockCurrentUser } from '../data/user'

export const authHandlers: IRouteEntry[] = [
  // 登录（邮箱 / 手机号）
  {
    method: 'POST',
    pattern: '/auth/login',
    handler: () =>
      ok({
        accessToken: 'mock-access-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        user: {
          id: mockCurrentUser.id,
          email: mockCurrentUser.email,
          username: mockCurrentUser.username,
          nickname: mockCurrentUser.nickname,
          avatar: mockCurrentUser.avatar,
          role: mockCurrentUser.role,
        },
      }),
  },

  // 发送验证码
  {
    method: 'POST',
    pattern: '/auth/send-code',
    handler: () => ok({ message: '验证码已发送' }),
  },

  // 退出登录
  {
    method: 'POST',
    pattern: '/auth/logout',
    handler: () => ok(null),
  },

  // 刷新 Token
  {
    method: 'POST',
    pattern: '/auth/refresh',
    handler: () =>
      ok({
        accessToken: 'mock-access-token-refreshed-' + Date.now(),
        refreshToken: 'mock-refresh-token-refreshed-' + Date.now(),
      }),
  },
]
