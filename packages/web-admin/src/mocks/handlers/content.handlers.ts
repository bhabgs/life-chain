import { http, HttpResponse, delay } from 'msw'
import { mockComfortData, mockCorpusData, mockReviewData, mockStageMaterials } from '../data/content'

const API = '/api/v1'

export const contentHandlers = [
  // 安抚内容列表
  http.get(`${API}/content/comfort`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockComfortData })
  }),

  // 对话语料列表
  http.get(`${API}/content/corpus`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockCorpusData })
  }),

  // 审核队列列表
  http.get(`${API}/content/review`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockReviewData })
  }),

  // 审核操作（通过/拒绝）
  http.post(`${API}/content/review/:id/:action`, async ({ params }) => {
    await delay(300)
    const { id, action } = params
    const item = mockReviewData.find((r) => r.id === id)
    if (!item) {
      return HttpResponse.json({ code: 1004, message: '审核项不存在', data: null }, { status: 404 })
    }
    item.status = action === 'approve' ? '已通过' : '已拒绝'
    return HttpResponse.json({ code: 0, message: 'success', data: null })
  }),

  // 创建安抚内容
  http.post(`${API}/content/comfort`, async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as Record<string, unknown>
    const newItem = {
      id: `comfort-${Date.now()}`,
      ...body,
      status: '草稿',
      createdAt: new Date().toISOString(),
    }
    return HttpResponse.json({ code: 0, message: 'success', data: newItem })
  }),

  // 删除安抚内容
  http.delete(`${API}/content/comfort/:id`, async ({ params }) => {
    await delay(200)
    const index = mockComfortData.findIndex((c) => c.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ code: 1004, message: '内容不存在', data: null }, { status: 404 })
    }
    return HttpResponse.json({ code: 0, message: 'success', data: null })
  }),

  // ============ 阶段素材库 ============
  http.get(`${API}/content/stage-materials`, async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const stage = url.searchParams.get('stage')
    const filtered = stage ? mockStageMaterials.filter((m) => m.stage === stage || m.stage === 'all') : mockStageMaterials
    return HttpResponse.json({ code: 0, message: 'success', data: filtered })
  }),
]
