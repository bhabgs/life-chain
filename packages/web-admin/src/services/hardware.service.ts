import type { IApiResponse } from '@lifechain/shared'
import apiClient from './api-client'

export const hardwareService = {
  getModels(): Promise<IApiResponse<unknown[]>> {
    return apiClient.get('/hardware/models')
  },

  getBindings(): Promise<IApiResponse<unknown[]>> {
    return apiClient.get('/hardware/bindings')
  },

  getMonitorData(): Promise<IApiResponse<unknown[]>> {
    return apiClient.get('/hardware/monitor')
  },

  getCacheConfig(): Promise<IApiResponse<unknown[]>> {
    return apiClient.get('/hardware/cache')
  },

  getFirmwareVersions(): Promise<IApiResponse<unknown[]>> {
    return apiClient.get('/hardware/firmware')
  },
}
