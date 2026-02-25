import { http, HttpResponse, delay } from 'msw'
import {
  mockUsers,
  mockSegmentsData,
  mockReviewUsers,
  mockBehaviorStats,
  mockUsageFrequencyDaily,
  mockUsageFrequencyWeekly,
  mockUsageFrequencyMonthly,
  mockFeatureHeatmap,
  mockChurnRiskUsers,
  heatmapDayLabels,
} from '../data/users'
import type { TReviewStatus } from '../data/users'
import { paginate, filterByKeyword } from '../utils/pagination'
import type { TUserStatus, TUserRole } from '@lifechain/shared'

const API = '/api/v1'

export const userHandlers = [
  // 用户列表
  http.get(`${API}/users`, async ({ request }) => {
    await delay(400)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10
    const keyword = url.searchParams.get('keyword') || undefined
    const status = url.searchParams.get('status') as TUserStatus | undefined
    const role = url.searchParams.get('role') as TUserRole | undefined

    let filtered = [...mockUsers]

    if (keyword) {
      filtered = filterByKeyword(filtered, keyword, ['username', 'nickname', 'email'])
    }
    if (status) {
      filtered = filtered.filter((u) => u.status === status)
    }
    if (role) {
      filtered = filtered.filter((u) => u.role === role)
    }

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: paginate(filtered, page, pageSize),
    })
  }),

  // 用户分组统计（需在 :id 之前）
  http.get(`${API}/users/segments`, async () => {
    await delay(400)
    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: mockSegmentsData,
    })
  }),

  // 待审核 / 已审核列表（需在 :id 之前）
  http.get(`${API}/users/review`, async ({ request }) => {
    await delay(400)
    const url = new URL(request.url)
    const status = url.searchParams.get('status') as TReviewStatus | undefined
    const page = Number(url.searchParams.get('page')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10

    let filtered = [...mockReviewUsers]
    if (status) {
      filtered = filtered.filter((u) => u.reviewStatus === status)
    }

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: paginate(filtered, page, pageSize),
    })
  }),

  // 用户行为统计（需在 :id 之前）
  http.get(`${API}/users/behavior-stats`, async ({ request }) => {
    await delay(400)
    const url = new URL(request.url)
    const period = url.searchParams.get('period') || 'daily'

    let usageFrequency
    switch (period) {
      case 'weekly':
        usageFrequency = mockUsageFrequencyWeekly
        break
      case 'monthly':
        usageFrequency = mockUsageFrequencyMonthly
        break
      default:
        usageFrequency = mockUsageFrequencyDaily
    }

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: {
        stats: mockBehaviorStats,
        usageFrequency,
        featureHeatmap: mockFeatureHeatmap,
        heatmapDayLabels,
        churnRiskUsers: mockChurnRiskUsers,
      },
    })
  }),

  // 用户详情
  http.get(`${API}/users/:id`, async ({ params }) => {
    await delay(300)
    const user = mockUsers.find((u) => u.id === params.id)
    if (!user) {
      return HttpResponse.json({ code: 1004, message: '用户不存在', data: null }, { status: 404 })
    }
    return HttpResponse.json({ code: 0, message: 'success', data: user })
  }),

  // 创建用户
  http.post(`${API}/users`, async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as Record<string, unknown>
    const newUser = {
      id: `user-${Date.now()}`,
      ...body,
      status: 'active',
      role: body.role || 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    }
    return HttpResponse.json({ code: 0, message: 'success', data: newUser })
  }),

  // 更新用户
  http.patch(`${API}/users/:id`, async ({ params, request }) => {
    await delay(300)
    const user = mockUsers.find((u) => u.id === params.id)
    if (!user) {
      return HttpResponse.json({ code: 1004, message: '用户不存在', data: null }, { status: 404 })
    }
    const body = (await request.json()) as Record<string, unknown>
    const updated = { ...user, ...body, updatedAt: new Date().toISOString() }
    return HttpResponse.json({ code: 0, message: 'success', data: updated })
  }),

  // 删除用户
  http.delete(`${API}/users/:id`, async ({ params }) => {
    await delay(200)
    const index = mockUsers.findIndex((u) => u.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ code: 1004, message: '用户不存在', data: null }, { status: 404 })
    }
    return HttpResponse.json({ code: 0, message: 'success', data: null })
  }),

  // 审核操作
  http.post(`${API}/users/review/:id`, async ({ params, request }) => {
    await delay(300)
    const reviewUser = mockReviewUsers.find((u) => u.id === params.id)
    if (!reviewUser) {
      return HttpResponse.json(
        { code: 1004, message: '审核记录不存在', data: null },
        { status: 404 },
      )
    }
    const body = (await request.json()) as { action: string; reason?: string }
    const updated = {
      ...reviewUser,
      reviewStatus: body.action as TReviewStatus,
      reviewedAt: new Date().toISOString(),
      reviewReason: body.reason || '',
      reviewer: '当前管理员',
    }
    // 更新本地 mock 数据
    const index = mockReviewUsers.findIndex((u) => u.id === params.id)
    if (index !== -1) {
      mockReviewUsers[index] = updated
    }
    return HttpResponse.json({ code: 0, message: 'success', data: updated })
  }),

  // 批量删除
  http.post(`${API}/users/batch-delete`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: null })
  }),
]
