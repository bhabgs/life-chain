import { http, HttpResponse, delay } from 'msw'
import {
  mockMemories,
  mockStructuringRules,
  mockReviewTemplates,
  mockStorageInfo,
  mockBackupRecords,
  mockBackupStrategy,
  mockArchiveRules,
} from '../data/memories'
import type { IStructuringRule, IReviewTemplate, IArchiveRule } from '../data/memories'
import { paginate, filterByKeyword } from '../utils/pagination'
import type { TMemoryType, TLifeStage, IMemoryStats } from '@lifechain/shared'

const API = '/api/v1'

let structuringRules = [...mockStructuringRules]
let reviewTemplates = [...mockReviewTemplates]
let backupStrategy = { ...mockBackupStrategy }
let archiveRules = [...mockArchiveRules]

export const memoryHandlers = [
  // ============ 记忆列表 ============

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

  // ============ 结构化规则 ============

  http.get(`${API}/memories/structuring-rules`, async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    const filtered = category
      ? structuringRules.filter((r) => r.category === category)
      : structuringRules
    return HttpResponse.json({ code: 0, message: 'success', data: filtered })
  }),

  http.post(`${API}/memories/structuring-rules`, async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as Record<string, unknown>
    const newRule: IStructuringRule = {
      id: `rule-${Date.now()}`,
      category: (body.category as IStructuringRule['category']) || 'keyword',
      name: (body.name as string) || '',
      expression: (body.expression as string) || '',
      priority: (body.priority as number) || 5,
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    structuringRules.push(newRule)
    return HttpResponse.json({ code: 0, message: 'success', data: newRule })
  }),

  http.patch(`${API}/memories/structuring-rules/:id`, async ({ params, request }) => {
    await delay(300)
    const index = structuringRules.findIndex((r) => r.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ code: 1004, message: '规则不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    structuringRules[index] = { ...structuringRules[index], ...body, updatedAt: new Date().toISOString() } as IStructuringRule
    return HttpResponse.json({ code: 0, message: 'success', data: structuringRules[index] })
  }),

  http.delete(`${API}/memories/structuring-rules/:id`, async ({ params }) => {
    await delay(200)
    structuringRules = structuringRules.filter((r) => r.id !== params.id)
    return HttpResponse.json({ code: 0, message: 'success', data: null })
  }),

  // ============ 回顾模板 ============

  http.get(`${API}/memories/review-templates`, async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const type = url.searchParams.get('type')
    const filtered = type
      ? reviewTemplates.filter((t) => t.type === type)
      : reviewTemplates
    return HttpResponse.json({ code: 0, message: 'success', data: filtered })
  }),

  http.post(`${API}/memories/review-templates`, async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as Record<string, unknown>
    const newTemplate: IReviewTemplate = {
      id: `rt-${Date.now()}`,
      name: (body.name as string) || '',
      description: (body.description as string) || '',
      type: (body.type as IReviewTemplate['type']) || 'stage_summary',
      applicableStage: (body.applicableStage as string) || '全阶段',
      version: (body.version as string) || 'v1.0',
      content: (body.content as string) || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    reviewTemplates.push(newTemplate)
    return HttpResponse.json({ code: 0, message: 'success', data: newTemplate })
  }),

  http.patch(`${API}/memories/review-templates/:id`, async ({ params, request }) => {
    await delay(300)
    const index = reviewTemplates.findIndex((t) => t.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ code: 1004, message: '模板不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    reviewTemplates[index] = { ...reviewTemplates[index], ...body, updatedAt: new Date().toISOString() } as IReviewTemplate
    return HttpResponse.json({ code: 0, message: 'success', data: reviewTemplates[index] })
  }),

  http.delete(`${API}/memories/review-templates/:id`, async ({ params }) => {
    await delay(200)
    reviewTemplates = reviewTemplates.filter((t) => t.id !== params.id)
    return HttpResponse.json({ code: 0, message: 'success', data: null })
  }),

  // ============ 存储管理 ============

  http.get(`${API}/memories/storage`, async () => {
    await delay(400)
    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: {
        storageInfo: mockStorageInfo,
        backupRecords: mockBackupRecords,
        backupStrategy,
        archiveRules,
      },
    })
  }),

  http.patch(`${API}/memories/storage/backup-strategy`, async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as Record<string, unknown>
    backupStrategy = { ...backupStrategy, ...body }
    return HttpResponse.json({ code: 0, message: 'success', data: backupStrategy })
  }),

  http.patch(`${API}/memories/storage/archive-rules/:id`, async ({ params, request }) => {
    await delay(300)
    const index = archiveRules.findIndex((r) => r.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ code: 1004, message: '规则不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    archiveRules[index] = { ...archiveRules[index], ...body, updatedAt: new Date().toISOString() } as IArchiveRule
    return HttpResponse.json({ code: 0, message: 'success', data: archiveRules[index] })
  }),
]
