import { http, HttpResponse, delay } from 'msw'
import { mockPersonalityTemplates } from '../data/personality-templates'
import { paginate } from '../utils/pagination'

const API = '/api/v1'

let templates = [...mockPersonalityTemplates]

export const personalityHandlers = [
  // 模板列表
  http.get(`${API}/personalities/templates`, async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: paginate(templates, page, pageSize),
    })
  }),

  // 模板详情
  http.get(`${API}/personalities/templates/:id`, async ({ params }) => {
    await delay(200)
    const template = templates.find((t) => t.id === params.id)
    if (!template) {
      return HttpResponse.json({ code: 1004, message: '模板不存在', data: null }, { status: 404 })
    }
    return HttpResponse.json({ code: 0, message: 'success', data: template })
  }),

  // 创建模板
  http.post(`${API}/personalities/templates`, async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as Record<string, unknown>
    const newTemplate = {
      id: `tpl-${Date.now()}`,
      ...body,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    templates.push(newTemplate as (typeof templates)[number])
    return HttpResponse.json({ code: 0, message: 'success', data: newTemplate })
  }),

  // 更新模板
  http.patch(`${API}/personalities/templates/:id`, async ({ params, request }) => {
    await delay(300)
    const index = templates.findIndex((t) => t.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ code: 1004, message: '模板不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    templates[index] = { ...templates[index], ...body, updatedAt: new Date().toISOString() }
    return HttpResponse.json({ code: 0, message: 'success', data: templates[index] })
  }),

  // 删除模板
  http.delete(`${API}/personalities/templates/:id`, async ({ params }) => {
    await delay(200)
    templates = templates.filter((t) => t.id !== params.id)
    return HttpResponse.json({ code: 0, message: 'success', data: null })
  }),
]
