import type { IApiResponse, IUser } from '@lifechain/shared'
import apiClient from './api-client'

export const userService = {
  getProfile(): Promise<IApiResponse<IUser>> {
    return apiClient.get('/user/profile')
  },

  updateProfile(data: Partial<IUser>): Promise<IApiResponse<IUser>> {
    return apiClient.put('/user/profile', data as Record<string, unknown>)
  },
}
