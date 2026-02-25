import type { IApiResponse, ILoginRequest, ILoginResponse } from '@lifechain/shared'
import apiClient from './api-client'

export const authService = {
  login(data: ILoginRequest): Promise<IApiResponse<ILoginResponse>> {
    return apiClient.post('/auth/login', data)
  },

  logout(): Promise<IApiResponse<null>> {
    return apiClient.post('/auth/logout')
  },

  refreshToken(refreshToken: string): Promise<IApiResponse<{ accessToken: string }>> {
    return apiClient.post('/auth/refresh', { refreshToken })
  },

  getMe(): Promise<IApiResponse<ILoginResponse['user']>> {
    return apiClient.get('/auth/me')
  },
}
