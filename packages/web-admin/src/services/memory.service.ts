import type {
  IApiResponse,
  IPaginatedResponse,
  IMemory,
  IMemoryQueryParams,
  IMemoryStats,
} from '@lifechain/shared'
import apiClient from './api-client'

export const memoryService = {
  getList(params: IMemoryQueryParams): Promise<IApiResponse<IPaginatedResponse<IMemory>>> {
    return apiClient.get('/memories', { params })
  },

  getDetail(id: string): Promise<IApiResponse<IMemory>> {
    return apiClient.get(`/memories/${id}`)
  },

  delete(id: string): Promise<IApiResponse<null>> {
    return apiClient.delete(`/memories/${id}`)
  },

  getStats(): Promise<IApiResponse<IMemoryStats>> {
    return apiClient.get('/memories/stats')
  },
}
