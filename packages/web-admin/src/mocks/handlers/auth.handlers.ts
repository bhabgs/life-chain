import { http, HttpResponse, delay } from 'msw'

const API = '/api/v1'

export const authHandlers = [
  // 登录
  http.post(`${API}/auth/login`, async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as { email: string; password: string }

    if (body.email === 'admin@lifechain.com' && body.password === 'admin123') {
      return HttpResponse.json({
        code: 0,
        message: 'success',
        data: {
          accessToken: 'mock-access-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now(),
          user: {
            id: 'admin-001',
            email: 'admin@lifechain.com',
            username: 'admin',
            nickname: '系统管理员',
            avatar: undefined,
            role: 'admin',
          },
        },
      })
    }

    return HttpResponse.json(
      { code: 1001, message: '邮箱或密码错误', data: null },
      { status: 401 },
    )
  }),

  // 登出
  http.post(`${API}/auth/logout`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, message: 'success', data: null })
  }),

  // 刷新 Token
  http.post(`${API}/auth/refresh`, async () => {
    await delay(100)
    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: { accessToken: 'mock-refreshed-token-' + Date.now() },
    })
  }),

  // 获取当前用户
  http.get(`${API}/auth/me`, async () => {
    await delay(200)
    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: {
        id: 'admin-001',
        email: 'admin@lifechain.com',
        username: 'admin',
        nickname: '系统管理员',
        avatar: undefined,
        role: 'admin',
      },
    })
  }),
]
