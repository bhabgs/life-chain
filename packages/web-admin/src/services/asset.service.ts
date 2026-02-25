import type { IApiResponse } from '@lifechain/shared'
import apiClient from './api-client'

export const assetService = {
  getHeirs(): Promise<IApiResponse<unknown[]>> {
    return apiClient.get('/assets/heirs')
  },

  getLegacyExports(): Promise<IApiResponse<unknown[]>> {
    return apiClient.get('/assets/legacy-exports')
  },

  getFreezeVersions(): Promise<IApiResponse<unknown[]>> {
    return apiClient.get('/assets/personality-freeze')
  },

  getFamilyNetworks(): Promise<IApiResponse<unknown[]>> {
    return apiClient.get('/assets/family-networks')
  },

  getMemorialRequests(): Promise<IApiResponse<unknown[]>> {
    return apiClient.get('/assets/memorial-requests')
  },

  getMemorialConfigs(): Promise<IApiResponse<unknown[]>> {
    return apiClient.get('/assets/memorial-configs')
  },

  updateMemorialConfig(id: string, data: Record<string, unknown>): Promise<IApiResponse<null>> {
    return apiClient.patch(`/assets/memorial-configs/${id}`, data)
  },
}
