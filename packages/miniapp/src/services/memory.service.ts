import type { IApiResponse, IMemory, IMemoryQueryParams, IPaginatedResponse } from '@lifechain/shared'
import apiClient from './api-client'

export const memoryService = {
  getList(params?: IMemoryQueryParams): Promise<IApiResponse<IPaginatedResponse<IMemory>>> {
    return apiClient.get('/memories', params as Record<string, unknown>)
  },

  getById(id: string): Promise<IApiResponse<IMemory>> {
    return apiClient.get(`/memories/${id}`)
  },

  create(data: {
    type: string
    title: string
    content: string
    emotion?: string
    tags?: string[]
    mediaUrls?: string[]
  }): Promise<IApiResponse<IMemory>> {
    return apiClient.post('/memories', data as Record<string, unknown>)
  },

  delete(id: string): Promise<IApiResponse<null>> {
    return apiClient.delete(`/memories/${id}`)
  },
}
