import type { IApiResponse } from '@lifechain/shared'
import apiClient from './api-client'

export const stageService = {
  getConfig(stage: string): Promise<IApiResponse<Record<string, unknown>>> {
    return apiClient.get(`/stages/${stage}/config`)
  },

  updateConfig(stage: string, data: Record<string, unknown>): Promise<IApiResponse<null>> {
    return apiClient.patch(`/stages/${stage}/config`, data)
  },
}
