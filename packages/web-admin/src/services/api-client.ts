import axios from 'axios'
import { config } from '@/config'
import { useAuthStore } from '@/stores/auth.store'

const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器：自动附加 Token
apiClient.interceptors.request.use(
  (reqConfig) => {
    const token = useAuthStore.getState().accessToken
    if (token) {
      reqConfig.headers.Authorization = `Bearer ${token}`
    }
    return reqConfig
  },
  (error) => Promise.reject(error),
)

// 响应拦截器：统一错误处理 + Token 刷新
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config

    // 401 且未重试过：尝试刷新 Token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = useAuthStore.getState().refreshToken

      if (refreshToken) {
        try {
          const res = await axios.post(`${config.apiBaseUrl}/auth/refresh`, { refreshToken })
          const newToken = res.data.data.accessToken
          useAuthStore.getState().updateToken(newToken)
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return apiClient(originalRequest)
        } catch {
          useAuthStore.getState().logout()
          window.location.href = '/login'
        }
      } else {
        useAuthStore.getState().logout()
        window.location.href = '/login'
      }
    }

    return Promise.reject(error.response?.data || error)
  },
)

export default apiClient
