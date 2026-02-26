import Taro from '@tarojs/taro'
import type { IApiResponse } from '@lifechain/shared'

const BASE_URL = 'https://api.lifechain.com/api/v1'

/** 获取 token（从 Taro Storage） */
function getToken(): string | null {
  try {
    const authData = Taro.getStorageSync('auth-storage')
    if (authData) {
      const parsed = typeof authData === 'string' ? JSON.parse(authData) : authData
      return parsed?.state?.token || null
    }
  } catch {
    // ignore
  }
  return null
}

/** 统一请求封装 */
async function request<T>(
  method: keyof Taro.request.Method | string,
  url: string,
  data?: Record<string, unknown>
): Promise<IApiResponse<T>> {
  const token = getToken()

  const header: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) {
    header['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await Taro.request({
      url: `${BASE_URL}${url}`,
      method: method as keyof Taro.request.Method,
      data,
      header,
    })

    const result = response.data as IApiResponse<T>

    if (result.code !== 0) {
      // 业务错误
      if (result.code === 1001) {
        // token 过期，跳转登录
        Taro.redirectTo({ url: '/pages/login/index' })
      }
      throw new Error(result.message || '请求失败')
    }

    return result
  } catch (err) {
    const error = err as Error
    if (!error.message?.includes('请求失败')) {
      Taro.showToast({ title: '网络异常', icon: 'none' })
    }
    throw err
  }
}

const apiClient = {
  get<T>(url: string, query?: Record<string, unknown>): Promise<IApiResponse<T>> {
    const queryStr = query
      ? '?' + Object.entries(query)
          .filter(([, v]) => v !== undefined && v !== null && v !== '')
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
          .join('&')
      : ''
    return request<T>('GET', `${url}${queryStr}`)
  },

  post<T>(url: string, data?: Record<string, unknown>): Promise<IApiResponse<T>> {
    return request<T>('POST', url, data)
  },

  put<T>(url: string, data?: Record<string, unknown>): Promise<IApiResponse<T>> {
    return request<T>('PUT', url, data)
  },

  delete<T>(url: string): Promise<IApiResponse<T>> {
    return request<T>('DELETE', url)
  },
}

export default apiClient
