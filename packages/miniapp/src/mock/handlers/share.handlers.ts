import type { IRouteEntry } from '../helpers'
import { ok, fail } from '../helpers'

export const shareHandlers: IRouteEntry[] = [
  // 生成记忆分享卡片
  {
    method: 'POST',
    pattern: '/share/generate-card',
    handler: (req) => {
      const memoryId = req.data.memoryId as string
      if (!memoryId) return fail(1022, '缺少 memoryId 参数')
      return ok({
        cardUrl: `https://picsum.photos/375/667?random=${Date.now()}`,
        memoryId,
        style: (req.data.style as string) || 'default',
      })
    },
  },

  // 获取邀请码
  {
    method: 'GET',
    pattern: '/share/invite-code',
    handler: () =>
      ok({
        code: 'LIFE2026ABC',
        expiredAt: '2026-03-28T00:00:00Z',
        maxUses: 5,
        usedCount: 1,
      }),
  },

  // 验证邀请码
  {
    method: 'POST',
    pattern: '/share/verify-invite',
    handler: (req) => {
      const code = req.data.code as string
      if (code === 'LIFE2026ABC') {
        return ok({ valid: true, inviterNickname: '小花', message: '邀请码有效' })
      }
      return ok({ valid: false, inviterNickname: null, message: '邀请码无效或已过期' })
    },
  },
]
