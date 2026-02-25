import { http, HttpResponse, delay } from 'msw'
import {
  mockHeirs,
  mockLegacyExports,
  mockFreezeVersions,
  mockFamilyNetworks,
  mockMemorialRequests,
  mockMemorialConfigs,
} from '../data/asset'

const API = '/api/v1'

export const assetHandlers = [
  // 继承人管理
  http.get(`${API}/assets/heirs`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockHeirs })
  }),

  // 遗产导出记录
  http.get(`${API}/assets/legacy-exports`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockLegacyExports })
  }),

  // 人格冻结版本
  http.get(`${API}/assets/personality-freeze`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockFreezeVersions })
  }),

  // 家族网络
  http.get(`${API}/assets/family-networks`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockFamilyNetworks })
  }),

  // 纪念馆申请
  http.get(`${API}/assets/memorial-requests`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockMemorialRequests })
  }),

  // 纪念模式配置
  http.get(`${API}/assets/memorial-configs`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockMemorialConfigs })
  }),

  // 更新纪念模式配置
  http.patch(`${API}/assets/memorial-configs/:id`, async ({ params, request }) => {
    await delay(300)
    const index = mockMemorialConfigs.findIndex((c) => c.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ code: 1004, message: '配置不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    const updated = { ...mockMemorialConfigs[index], ...body }
    mockMemorialConfigs[index] = updated
    return HttpResponse.json({ code: 0, message: 'success', data: updated })
  }),
]
