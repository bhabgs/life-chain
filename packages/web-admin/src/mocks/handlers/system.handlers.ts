import { http, HttpResponse, delay } from 'msw'
import {
  mockSystemConfig,
  mockSystemMonitor,
  mockOperationLogs,
  mockRoles,
  mockSecurityAuditEvents,
  mockPrivacyPolicies,
  mockSensitiveDataStats,
  mockDesensitizationRules,
  mockComplianceReports,
  mockAIModels,
  mockThirdPartyServices,
  mockSystemBackups,
  mockLogStats,
  mockPerformanceStats,
} from '../data/system-config'
import { paginate } from '../utils/pagination'

const API = '/api/v1'

let desensitizationRules = [...mockDesensitizationRules]
let thirdPartyServices = [...mockThirdPartyServices]
let systemBackups = [...mockSystemBackups]

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

  // ============ 安全审计 ============
  http.get(`${API}/system/security-audit`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockSecurityAuditEvents })
  }),

  // ============ 隐私与合规 ============
  http.get(`${API}/system/privacy-policies`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockPrivacyPolicies })
  }),

  http.get(`${API}/system/sensitive-data`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockSensitiveDataStats })
  }),

  http.get(`${API}/system/desensitization-rules`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: desensitizationRules })
  }),

  http.patch(`${API}/system/desensitization-rules/:id`, async ({ params, request }) => {
    await delay(300)
    const index = desensitizationRules.findIndex((r) => r.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ code: 1004, message: '规则不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    desensitizationRules[index] = { ...desensitizationRules[index], ...body } as (typeof desensitizationRules)[number]
    return HttpResponse.json({ code: 0, message: 'success', data: desensitizationRules[index] })
  }),

  http.get(`${API}/system/compliance-reports`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockComplianceReports })
  }),

  // ============ AI模型管理 ============
  http.get(`${API}/system/ai-models`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockAIModels })
  }),

  // ============ 第三方服务 ============
  http.get(`${API}/system/third-party`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: thirdPartyServices })
  }),

  http.patch(`${API}/system/third-party/:id`, async ({ params, request }) => {
    await delay(300)
    const index = thirdPartyServices.findIndex((s) => s.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ code: 1004, message: '服务不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    thirdPartyServices[index] = { ...thirdPartyServices[index], ...body } as (typeof thirdPartyServices)[number]
    return HttpResponse.json({ code: 0, message: 'success', data: thirdPartyServices[index] })
  }),

  // ============ 系统维护 ============
  http.get(`${API}/system/backups`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: systemBackups })
  }),

  http.post(`${API}/system/backups`, async () => {
    await delay(500)
    const newBackup = {
      id: `bk-sys-${Date.now()}`,
      type: '手动备份',
      size: '-',
      status: 'running',
      startTime: new Date().toISOString(),
      endTime: '-',
      storagePath: '-',
    }
    systemBackups = [newBackup, ...systemBackups]
    return HttpResponse.json({ code: 0, message: 'success', data: newBackup })
  }),

  http.get(`${API}/system/log-stats`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockLogStats })
  }),

  http.get(`${API}/system/performance`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockPerformanceStats })
  }),
]
