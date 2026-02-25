import { http, HttpResponse, delay } from 'msw'
import { mockMemories } from '../data/memories'
import { paginate, filterByKeyword } from '../utils/pagination'
import type { TMemoryType, TLifeStage, IMemoryStats } from '@lifechain/shared'

const API = '/api/v1'

export const memoryHandlers = [
  // 记忆列表
  http.get(`${API}/memories`, async ({ request }) => {
    await delay(400)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10
    const keyword = url.searchParams.get('keyword') || undefined
    const type = url.searchParams.get('type') as TMemoryType | undefined
    const stage = url.searchParams.get('stage') as TLifeStage | undefined
    const userId = url.searchParams.get('userId') || undefined

    let filtered = [...mockMemories]

    if (keyword) {
      filtered = filterByKeyword(filtered, keyword, ['title', 'content'])
    }
    if (type) {
      filtered = filtered.filter((m) => m.type === type)
    }
    if (stage) {
      filtered = filtered.filter((m) => m.stage === stage)
    }
    if (userId) {
      filtered = filtered.filter((m) => m.userId === userId)
    }

    // 按创建时间倒序
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: paginate(filtered, page, pageSize),
    })
  }),

  // 记忆详情
  http.get(`${API}/memories/:id`, async ({ params }) => {
    await delay(200)
    const memory = mockMemories.find((m) => m.id === params.id)
    if (!memory) {
      return HttpResponse.json({ code: 1004, message: '记忆不存在', data: null }, { status: 404 })
    }
    return HttpResponse.json({ code: 0, message: 'success', data: memory })
  }),

  // 删除记忆
  http.delete(`${API}/memories/:id`, async () => {
    await delay(200)
    return HttpResponse.json({ code: 0, message: 'success', data: null })
  }),

  // 记忆统计
  http.get(`${API}/memories/stats`, async () => {
    await delay(300)

    const stats: IMemoryStats = {
      total: mockMemories.length,
      byType: {
        text: mockMemories.filter((m) => m.type === 'text').length,
        voice: mockMemories.filter((m) => m.type === 'voice').length,
        image: mockMemories.filter((m) => m.type === 'image').length,
        video: mockMemories.filter((m) => m.type === 'video').length,
        event: mockMemories.filter((m) => m.type === 'event').length,
      },
      byStage: {
        childhood: mockMemories.filter((m) => m.stage === 'childhood').length,
        adolescence: mockMemories.filter((m) => m.stage === 'adolescence').length,
        youth: mockMemories.filter((m) => m.stage === 'youth').length,
        middle_age: mockMemories.filter((m) => m.stage === 'middle_age').length,
        old_age: mockMemories.filter((m) => m.stage === 'old_age').length,
      },
      byMonth: Array.from({ length: 12 }, (_, i) => {
        const d = new Date()
        d.setMonth(d.getMonth() - (11 - i))
        return {
          month: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
          count: Math.floor(Math.random() * 50) + 20,
        }
      }),
    }

    return HttpResponse.json({ code: 0, message: 'success', data: stats })
  }),
]
