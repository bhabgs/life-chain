import { http, HttpResponse, delay } from 'msw'
import { mockEmotionConfigs, mockCrisisRules, mockHealthBoundaries, mockHealthReports } from '../data/emotion'
import type { IHealthBoundary } from '../data/emotion'

const API = '/api/v1'

let healthBoundaries = [...mockHealthBoundaries]

export const emotionHandlers = [
  // 情绪配置列表
  http.get(`${API}/emotion/configs`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockEmotionConfigs })
  }),

  // 更新情绪配置
  http.put(`${API}/emotion/configs/:key`, async ({ params, request }) => {
    await delay(300)
    const config = mockEmotionConfigs.find((c) => c.key === params.key)
    if (!config) {
      return HttpResponse.json({ code: 1004, message: '配置不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    const updated = { ...config, ...body }
    // 更新 mock 数据
    const index = mockEmotionConfigs.findIndex((c) => c.key === params.key)
    mockEmotionConfigs[index] = updated
    return HttpResponse.json({ code: 0, message: 'success', data: updated })
  }),

  // 危机预警规则列表
  http.get(`${API}/emotion/crisis-rules`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockCrisisRules })
  }),

  // 切换危机预警规则状态
  http.put(`${API}/emotion/crisis-rules/:id`, async ({ params, request }) => {
    await delay(200)
    const rule = mockCrisisRules.find((r) => r.id === params.id)
    if (!rule) {
      return HttpResponse.json({ code: 1004, message: '规则不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    rule.enabled = body.enabled as boolean
    return HttpResponse.json({ code: 0, message: 'success', data: null })
  }),

  // ============ 健康边界设置 ============
  http.get(`${API}/emotion/health-boundaries`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: healthBoundaries })
  }),

  http.patch(`${API}/emotion/health-boundaries/:id`, async ({ params, request }) => {
    await delay(300)
    const index = healthBoundaries.findIndex((b) => b.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ code: 1004, message: '边界设置不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    healthBoundaries[index] = { ...healthBoundaries[index], ...body } as IHealthBoundary
    return HttpResponse.json({ code: 0, message: 'success', data: healthBoundaries[index] })
  }),

  // ============ 健康报告 ============
  http.get(`${API}/emotion/health-reports`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockHealthReports })
  }),
]
