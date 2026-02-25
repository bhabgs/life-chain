import { http, HttpResponse, delay } from 'msw'
import {
  mockUserBehaviorData,
  mockMemoryAnalysisData,
  mockEmotionAnalysisData,
  mockReportData,
} from '../data/analysis'

const API = '/api/v1'

let reports = [...mockReportData]

export const analysisHandlers = [
  // 用户行为分析
  http.get(`${API}/analysis/user-behavior`, async () => {
    await delay(400)
    return HttpResponse.json({ code: 0, message: 'success', data: mockUserBehaviorData })
  }),

  // 记忆数据分析
  http.get(`${API}/analysis/memory`, async () => {
    await delay(400)
    return HttpResponse.json({ code: 0, message: 'success', data: mockMemoryAnalysisData })
  }),

  // 情绪健康分析
  http.get(`${API}/analysis/emotion`, async () => {
    await delay(400)
    return HttpResponse.json({ code: 0, message: 'success', data: mockEmotionAnalysisData })
  }),

  // 报表列表
  http.get(`${API}/analysis/reports`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: reports })
  }),

  // 生成报表
  http.post(`${API}/analysis/reports/generate`, async ({ request }) => {
    await delay(500)
    const body = (await request.json()) as { type: string; format: string }
    const newReport = {
      id: `rpt-${Date.now()}`,
      title: `${new Date().toLocaleDateString('zh-CN')} ${body.type}`,
      type: body.type,
      format: body.format,
      status: '生成中',
      createdAt: new Date().toISOString(),
      size: '-',
    }
    reports = [newReport, ...reports]
    return HttpResponse.json({ code: 0, message: 'success', data: newReport })
  }),
]
