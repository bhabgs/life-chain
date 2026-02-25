import { http, HttpResponse, delay } from 'msw'
import {
  mockPersonalityTemplates,
  mockAvatarResources,
  mockReplyTemplates,
  mockCompanionModes,
  mockEmotionStrategies,
  mockNamings,
} from '../data/personality-templates'
import type { IAvatarResource, IReplyTemplate, ICompanionMode, IEmotionStrategy, INaming } from '../data/personality-templates'
import { paginate } from '../utils/pagination'

const API = '/api/v1'

let templates = [...mockPersonalityTemplates]
let avatars = [...mockAvatarResources]
let replyTemplates = [...mockReplyTemplates]
let companionModes = [...mockCompanionModes]
let emotionStrategies = [...mockEmotionStrategies]
let namings = [...mockNamings]

export const personalityHandlers = [
  // ============ 模板管理 ============

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

  // ============ 形象资源 ============

  // 形象列表
  http.get(`${API}/personalities/avatars`, async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const stage = url.searchParams.get('stage')
    const filtered = stage ? avatars.filter((a) => a.stage === stage) : avatars
    return HttpResponse.json({ code: 0, message: 'success', data: filtered })
  }),

  // 上传形象
  http.post(`${API}/personalities/avatars`, async ({ request }) => {
    await delay(500)
    const body = (await request.json()) as Record<string, unknown>
    const newAvatar: IAvatarResource = {
      id: `avatar-${Date.now()}`,
      name: (body.name as string) || '新形象',
      description: (body.description as string) || '',
      imageUrl: (body.imageUrl as string) || `https://picsum.photos/200/200?random=${Date.now()}`,
      stage: (body.stage as IAvatarResource['stage']) || 'youth',
      status: 'pending',
      uploadedBy: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    avatars.push(newAvatar)
    return HttpResponse.json({ code: 0, message: 'success', data: newAvatar })
  }),

  // 审核形象
  http.patch(`${API}/personalities/avatars/:id/review`, async ({ params, request }) => {
    await delay(300)
    const index = avatars.findIndex((a) => a.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ code: 1004, message: '形象不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as { action: 'approve' | 'reject' }
    avatars[index] = {
      ...avatars[index],
      status: body.action === 'approve' ? 'approved' : 'rejected',
      updatedAt: new Date().toISOString(),
    }
    return HttpResponse.json({ code: 0, message: 'success', data: avatars[index] })
  }),

  // 删除形象
  http.delete(`${API}/personalities/avatars/:id`, async ({ params }) => {
    await delay(200)
    avatars = avatars.filter((a) => a.id !== params.id)
    return HttpResponse.json({ code: 0, message: 'success', data: null })
  }),

  // ============ 对话策略 - 回复模板 ============

  http.get(`${API}/personalities/dialogue/reply-templates`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: replyTemplates })
  }),

  http.post(`${API}/personalities/dialogue/reply-templates`, async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as Record<string, unknown>
    const newItem: IReplyTemplate = {
      id: `rpt-${Date.now()}`,
      scene: (body.scene as string) || '',
      content: (body.content as string) || '',
      usageCount: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    replyTemplates.push(newItem)
    return HttpResponse.json({ code: 0, message: 'success', data: newItem })
  }),

  http.patch(`${API}/personalities/dialogue/reply-templates/:id`, async ({ params, request }) => {
    await delay(300)
    const index = replyTemplates.findIndex((t) => t.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ code: 1004, message: '模板不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    replyTemplates[index] = { ...replyTemplates[index], ...body, updatedAt: new Date().toISOString() } as IReplyTemplate
    return HttpResponse.json({ code: 0, message: 'success', data: replyTemplates[index] })
  }),

  http.delete(`${API}/personalities/dialogue/reply-templates/:id`, async ({ params }) => {
    await delay(200)
    replyTemplates = replyTemplates.filter((t) => t.id !== params.id)
    return HttpResponse.json({ code: 0, message: 'success', data: null })
  }),

  // ============ 对话策略 - 陪伴模式 ============

  http.get(`${API}/personalities/dialogue/companion-modes`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: companionModes })
  }),

  http.patch(`${API}/personalities/dialogue/companion-modes/:id`, async ({ params, request }) => {
    await delay(300)
    const index = companionModes.findIndex((m) => m.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ code: 1004, message: '模式不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    companionModes[index] = { ...companionModes[index], ...body, updatedAt: new Date().toISOString() } as ICompanionMode
    return HttpResponse.json({ code: 0, message: 'success', data: companionModes[index] })
  }),

  // ============ 对话策略 - 情绪响应策略 ============

  http.get(`${API}/personalities/dialogue/emotion-strategies`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: emotionStrategies })
  }),

  http.patch(`${API}/personalities/dialogue/emotion-strategies/:id`, async ({ params, request }) => {
    await delay(300)
    const index = emotionStrategies.findIndex((s) => s.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ code: 1004, message: '策略不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    emotionStrategies[index] = { ...emotionStrategies[index], ...body, updatedAt: new Date().toISOString() } as IEmotionStrategy
    return HttpResponse.json({ code: 0, message: 'success', data: emotionStrategies[index] })
  }),

  // ============ 称呼系统 ============

  http.get(`${API}/personalities/namings`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: namings })
  }),

  http.post(`${API}/personalities/namings`, async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as Record<string, unknown>
    const newNaming: INaming = {
      id: `nm-${Date.now()}`,
      name: (body.name as string) || '',
      relationship: (body.relationship as string) || '',
      usageCount: 0,
      isDefault: (body.isDefault as boolean) || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    namings.push(newNaming)
    return HttpResponse.json({ code: 0, message: 'success', data: newNaming })
  }),

  http.patch(`${API}/personalities/namings/:id`, async ({ params, request }) => {
    await delay(300)
    const index = namings.findIndex((n) => n.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ code: 1004, message: '称呼不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    namings[index] = { ...namings[index], ...body, updatedAt: new Date().toISOString() } as INaming
    return HttpResponse.json({ code: 0, message: 'success', data: namings[index] })
  }),

  http.delete(`${API}/personalities/namings/:id`, async ({ params }) => {
    await delay(200)
    namings = namings.filter((n) => n.id !== params.id)
    return HttpResponse.json({ code: 0, message: 'success', data: null })
  }),
]
