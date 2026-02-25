import { http, HttpResponse, delay } from 'msw'
import {
  mockSystemConfig,
  mockSystemMonitor,
  mockOperationLogs,
  mockRoles,
} from '../data/system-config'
import { paginate } from '../utils/pagination'

const API = '/api/v1'

export const systemHandlers = [
  // 系统配置
  http.get(`${API}/system/config`, async () => {
    await delay(200)
    return HttpResponse.json({ code: 0, message: 'success', data: mockSystemConfig })
  }),

  http.patch(`${API}/system/config/:id`, async ({ params, request }) => {
    await delay(200)
    const body = (await request.json()) as { value: string }
    const config = mockSystemConfig.find((c) => c.id === params.id)
    if (config) {
      config.value = body.value
      config.updatedAt = new Date().toISOString()
    }
    return HttpResponse.json({ code: 0, message: 'success', data: config })
  }),

  // 系统监控
  http.get(`${API}/system/monitor`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockSystemMonitor })
  }),

  // 操作日志
  http.get(`${API}/system/logs`, async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: paginate(mockOperationLogs, page, pageSize),
    })
  }),

  // 角色管理
  http.get(`${API}/roles`, async () => {
    await delay(200)
    return HttpResponse.json({ code: 0, message: 'success', data: mockRoles })
  }),

  http.post(`${API}/roles`, async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as Record<string, unknown>
    const newRole = {
      id: `role-${Date.now()}`,
      ...body,
      userCount: 0,
      createdAt: new Date().toISOString(),
    }
    return HttpResponse.json({ code: 0, message: 'success', data: newRole })
  }),

  http.patch(`${API}/roles/:id`, async ({ params, request }) => {
    await delay(200)
    const role = mockRoles.find((r) => r.id === params.id)
    if (!role) {
      return HttpResponse.json({ code: 1004, message: '角色不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    const updated = { ...role, ...body }
    return HttpResponse.json({ code: 0, message: 'success', data: updated })
  }),

  http.delete(`${API}/roles/:id`, async () => {
    await delay(200)
    return HttpResponse.json({ code: 0, message: 'success', data: null })
  }),
]
