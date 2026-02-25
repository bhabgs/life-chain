import type { IApiResponse } from '@lifechain/shared'
import apiClient from './api-client'

export const analysisService = {
  getUserBehavior(): Promise<IApiResponse<Record<string, unknown>>> {
    return apiClient.get('/analysis/user-behavior')
  },

  getMemoryAnalysis(): Promise<IApiResponse<Record<string, unknown>>> {
    return apiClient.get('/analysis/memory')
  },

  getEmotionAnalysis(): Promise<IApiResponse<Record<string, unknown>>> {
    return apiClient.get('/analysis/emotion')
  },

  getReports(): Promise<IApiResponse<unknown[]>> {
    return apiClient.get('/analysis/reports')
  },

  generateReport(params: { type: string; format: string }): Promise<IApiResponse<null>> {
    return apiClient.post('/analysis/reports/generate', params)
  },
}
