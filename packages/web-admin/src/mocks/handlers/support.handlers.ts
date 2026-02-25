import { http, HttpResponse, delay } from 'msw'
import { mockTicketData, mockFeedbackData, mockInterventions, mockFAQs } from '../data/support'
import { paginate } from '../utils/pagination'

const API = '/api/v1'

let faqs = [...mockFAQs]

export const supportHandlers = [
  // 工单列表
  http.get(`${API}/support/tickets`, async ({ request }) => {
    await delay(400)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: paginate(mockTicketData, page, pageSize),
    })
  }),

  // 更新工单状态
  http.put(`${API}/support/tickets/:id/status`, async ({ params, request }) => {
    await delay(300)
    const ticket = mockTicketData.find((t) => t.id === params.id)
    if (!ticket) {
      return HttpResponse.json({ code: 1004, message: '工单不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    ticket.status = body.status as string
    return HttpResponse.json({ code: 0, message: 'success', data: null })
  }),

  // 用户反馈列表
  http.get(`${API}/support/feedbacks`, async ({ request }) => {
    await delay(400)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: paginate(mockFeedbackData, page, pageSize),
    })
  }),

  // ============ 人工介入记录 ============
  http.get(`${API}/support/interventions`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockInterventions })
  }),

  // ============ FAQ 管理 ============
  http.get(`${API}/support/faqs`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: faqs })
  }),

  http.post(`${API}/support/faqs`, async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as Record<string, unknown>
    const newFAQ = {
      id: `faq-${Date.now()}`,
      question: (body.question as string) || '',
      answer: (body.answer as string) || '',
      category: (body.category as string) || '通用',
      views: 0,
      helpful: 0,
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    }
    faqs = [newFAQ, ...faqs]
    return HttpResponse.json({ code: 0, message: 'success', data: newFAQ })
  }),

  http.patch(`${API}/support/faqs/:id`, async ({ params, request }) => {
    await delay(300)
    const index = faqs.findIndex((f) => f.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ code: 1004, message: 'FAQ不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    faqs[index] = { ...faqs[index], ...body, updatedAt: new Date().toISOString().slice(0, 10) } as (typeof faqs)[number]
    return HttpResponse.json({ code: 0, message: 'success', data: faqs[index] })
  }),

  http.delete(`${API}/support/faqs/:id`, async ({ params }) => {
    await delay(200)
    faqs = faqs.filter((f) => f.id !== params.id)
    return HttpResponse.json({ code: 0, message: 'success', data: null })
  }),
]
