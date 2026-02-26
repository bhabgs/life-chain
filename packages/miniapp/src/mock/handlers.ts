import { mockMemories } from './data/memories'
import { mockChatSessions, mockMessages, mockAIReplies } from './data/chat'
import { mockCurrentUser } from './data/user'
import { mockTimelineData, mockStageSummaries } from './data/review'

interface IMockRequest {
  url: string
  method: string
  data: Record<string, unknown>
  params: Record<string, string>
  query: Record<string, string>
}

type TMockHandler = ((req: IMockRequest) => unknown) & { _pattern?: string }

interface IRouteEntry {
  method: string
  pattern: string
  handler: TMockHandler
}

function ok<T>(data: T) {
  return { code: 0, message: 'success', data }
}

function paginated<T>(list: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize
  return {
    code: 0,
    message: 'success',
    data: {
      list: list.slice(start, start + pageSize),
      total: list.length,
      page,
      pageSize,
    },
  }
}

// ============ 路由表 ============

const routes: IRouteEntry[] = [
  // 登录
  {
    method: 'POST',
    pattern: '/auth/login',
    handler: () =>
      ok({
        accessToken: 'mock-access-token-123',
        refreshToken: 'mock-refresh-token-456',
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

  // 记忆列表
  {
    method: 'GET',
    pattern: '/memories',
    handler: (req) => {
      const page = Number(req.query.page) || 1
      const pageSize = Number(req.query.pageSize) || 10
      const type = req.query.type
      const stage = req.query.stage
      const keyword = req.query.keyword

      let filtered = [...mockMemories]

      if (type) {
        filtered = filtered.filter((m) => m.type === type)
      }
      if (stage) {
        filtered = filtered.filter((m) => m.stage === stage)
      }
      if (keyword) {
        const kw = keyword.toLowerCase()
        filtered = filtered.filter(
          (m) =>
            m.title?.toLowerCase().includes(kw) ||
            m.content?.toLowerCase().includes(kw)
        )
      }

      filtered.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )

      return paginated(filtered, page, pageSize)
    },
  },

  // 记忆详情
  {
    method: 'GET',
    pattern: '/memories/:id',
    handler: (req) => {
      const memory = mockMemories.find((m) => m.id === req.params.id)
      if (!memory) return { code: 1004, message: '记忆不存在', data: null }
      return ok(memory)
    },
  },

  // 创建记忆
  {
    method: 'POST',
    pattern: '/memories',
    handler: (req) => {
      const newMemory = {
        id: `mem-${Date.now()}`,
        userId: 'user-001',
        type: req.data.type || 'text',
        title: req.data.title || '新记忆',
        content: req.data.content || '',
        emotion: req.data.emotion || 'neutral',
        stage: 'youth',
        privacyLevel: 1,
        mediaUrls: [],
        metadata: { tags: (req.data.tags as string[]) || [] },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return ok(newMemory)
    },
  },

  // 删除记忆
  {
    method: 'DELETE',
    pattern: '/memories/:id',
    handler: () => ok(null),
  },

  // 会话列表
  {
    method: 'GET',
    pattern: '/chat/sessions',
    handler: () => ok(mockChatSessions),
  },

  // 会话消息列表
  {
    method: 'GET',
    pattern: '/chat/sessions/:id/messages',
    handler: (req) => {
      const messages = mockMessages[req.params.id] || []
      return ok(messages)
    },
  },

  // 发送消息（模拟 AI 回复）
  {
    method: 'POST',
    pattern: '/chat/sessions/:id/messages',
    handler: (req) => {
      const userMsg = {
        id: `msg-${Date.now()}`,
        sessionId: req.params.id,
        role: 'user' as const,
        content: (req.data.content as string) || '',
        createdAt: new Date().toISOString(),
      }
      // 模拟 AI 回复
      const aiReply = {
        id: `msg-${Date.now() + 1}`,
        sessionId: req.params.id,
        role: 'assistant' as const,
        content: mockAIReplies[Math.floor(Math.random() * mockAIReplies.length)],
        emotion: 'peaceful',
        createdAt: new Date(Date.now() + 1500).toISOString(),
      }
      return ok({ userMessage: userMsg, aiReply })
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

  // 时间轴数据
  {
    method: 'GET',
    pattern: '/review/timeline',
    handler: () => ok(mockTimelineData),
  },

  // 阶段总结
  {
    method: 'GET',
    pattern: '/review/summary',
    handler: (req) => {
      const period = req.query.period || '30d'
      const summary = mockStageSummaries.find((s) => s.period === period) || mockStageSummaries[0]
      return ok(summary)
    },
  },
]

// 为 handler 附加 pattern 以供 extractParams 使用
routes.forEach((r) => {
  r.handler._pattern = r.pattern
})

/** 匹配路由，返回 handler；未匹配则返回 null */
export function matchHandler(method: string, pathname: string): TMockHandler | null {
  for (const route of routes) {
    if (route.method !== method.toUpperCase()) continue
    if (matchPath(route.pattern, pathname)) {
      return route.handler
    }
  }
  return null
}

/** 简单路径匹配（支持 :param 动态段） */
function matchPath(pattern: string, pathname: string): boolean {
  const patternParts = pattern.split('/').filter(Boolean)
  const pathParts = pathname.split('/').filter(Boolean)

  if (patternParts.length !== pathParts.length) return false

  return patternParts.every(
    (part, i) => part.startsWith(':') || part === pathParts[i]
  )
}
