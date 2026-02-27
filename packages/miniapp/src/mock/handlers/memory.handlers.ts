import type { IRouteEntry } from '../helpers'
import { ok, paginated, fail } from '../helpers'
import { mockMemories } from '../data/memories'

export const memoryHandlers: IRouteEntry[] = [
  // ⚠️ 特殊路由放在 /:id 之前
  // 记忆统计
  {
    method: 'GET',
    pattern: '/memories/stats',
    handler: () => {
      const byType: Record<string, number> = {}
      const byStage: Record<string, number> = {}
      const byEmotion: Record<string, number> = {}

      mockMemories.forEach((m) => {
        byType[m.type] = (byType[m.type] || 0) + 1
        if (m.stage) byStage[m.stage] = (byStage[m.stage] || 0) + 1
        if (m.emotion) byEmotion[m.emotion] = (byEmotion[m.emotion] || 0) + 1
      })

      return ok({
        total: mockMemories.length,
        byType,
        byStage,
        byEmotion,
      })
    },
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
      if (!memory) return fail(1004, '记忆不存在')
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
        mediaUrls: (req.data.mediaUrls as string[]) || [],
        metadata: { tags: (req.data.tags as string[]) || [] },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return ok(newMemory)
    },
  },

  // 编辑记忆
  {
    method: 'PUT',
    pattern: '/memories/:id',
    handler: (req) => {
      const memory = mockMemories.find((m) => m.id === req.params.id)
      if (!memory) return fail(1004, '记忆不存在')
      const updated = {
        ...memory,
        ...req.data,
        updatedAt: new Date().toISOString(),
      }
      return ok(updated)
    },
  },

  // 删除记忆
  {
    method: 'DELETE',
    pattern: '/memories/:id',
    handler: () => ok(null),
  },
]
