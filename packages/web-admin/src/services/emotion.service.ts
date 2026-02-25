import type { IApiResponse } from '@lifechain/shared'
import apiClient from './api-client'

export interface IEmotionConfig {
  key: string
  label: string
  color: string
  lowThreshold: number
  mediumThreshold: number
  highThreshold: number
}

export interface ICrisisRule {
  id: string
  name: string
  emotion: string
  condition: string
  notify: string
  enabled: boolean
}

export const emotionService = {
  getConfigs(): Promise<IApiResponse<IEmotionConfig[]>> {
    return apiClient.get('/emotion/configs')
  },

  updateConfig(key: string, data: Partial<IEmotionConfig>): Promise<IApiResponse<IEmotionConfig>> {
    return apiClient.put(`/emotion/configs/${key}`, data)
  },

  getCrisisRules(): Promise<IApiResponse<ICrisisRule[]>> {
    return apiClient.get('/emotion/crisis-rules')
  },

  toggleCrisisRule(id: string, enabled: boolean): Promise<IApiResponse<null>> {
    return apiClient.put(`/emotion/crisis-rules/${id}`, { enabled })
  },

  // ============ 健康边界设置 ============
  getHealthBoundaries(): Promise<IApiResponse<unknown[]>> {
    return apiClient.get('/emotion/health-boundaries')
  },

  updateHealthBoundary(id: string, data: Record<string, unknown>): Promise<IApiResponse<null>> {
    return apiClient.patch(`/emotion/health-boundaries/${id}`, data)
  },

  // ============ 健康报告 ============
  getHealthReports(): Promise<IApiResponse<unknown[]>> {
    return apiClient.get('/emotion/health-reports')
  },
}
