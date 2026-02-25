import { http, HttpResponse, delay } from 'msw'
import { mockStageConfigs } from '../data/stage-config'

const API = '/api/v1'

const stageData = new Map(Object.entries(mockStageConfigs))

export const stageHandlers = [
  // 获取阶段配置
  http.get(`${API}/stages/:stage/config`, async ({ params }) => {
    await delay(300)
    const config = stageData.get(params.stage as string)
    if (!config) {
      return HttpResponse.json({ code: 1004, message: '阶段配置不存在', data: null }, { status: 404 })
    }
    return HttpResponse.json({ code: 0, message: 'success', data: config })
  }),

  // 更新阶段配置
  http.patch(`${API}/stages/:stage/config`, async ({ params, request }) => {
    await delay(300)
    const stage = params.stage as string
    const existing = stageData.get(stage)
    if (!existing) {
      return HttpResponse.json({ code: 1004, message: '阶段配置不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    const updated = { ...existing, ...body }
    stageData.set(stage, updated)
    return HttpResponse.json({ code: 0, message: 'success', data: updated })
  }),
]
