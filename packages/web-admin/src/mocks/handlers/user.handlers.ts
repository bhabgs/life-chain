import { http, HttpResponse, delay } from 'msw'
import { mockUsers } from '../data/users'
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

  // 批量删除
  http.post(`${API}/users/batch-delete`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: null })
  }),
]
