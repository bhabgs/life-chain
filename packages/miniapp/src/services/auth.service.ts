import type { IApiResponse, ILoginResponse } from '@lifechain/shared'
import apiClient from './api-client'

export const authService = {
  login(email: string, password: string): Promise<IApiResponse<ILoginResponse>> {
    return apiClient.post('/auth/login', { email, password })
  },

  loginByPhone(phone: string, code: string): Promise<IApiResponse<ILoginResponse>> {
    return apiClient.post('/auth/login', { phone, code })
  },

  logout(): Promise<IApiResponse<null>> {
    return apiClient.post('/auth/logout')
  },

  refreshToken(refreshToken: string): Promise<IApiResponse<ILoginResponse>> {
    return apiClient.post('/auth/refresh', { refreshToken })
  },
}
