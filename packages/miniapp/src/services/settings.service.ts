import type { IApiResponse } from '@lifechain/shared'
import apiClient from './api-client'

export interface IUserSettings {
  notifications: {
    newMemory: boolean
    dailyReminder: boolean
    weeklyReport: boolean
    systemNotice: boolean
  }
  privacy: {
    defaultLevel: 1 | 2 | 3
    allowSearch: boolean
  }
  theme: 'light' | 'dark' | 'system'
  language: string
  fontSize: 'small' | 'medium' | 'large'
}

export const settingsService = {
  get(): Promise<IApiResponse<IUserSettings>> {
    return apiClient.get('/user/settings')
  },

  update(data: Partial<IUserSettings>): Promise<IApiResponse<IUserSettings>> {
    return apiClient.put('/user/settings', data as Record<string, unknown>)
  },
}
