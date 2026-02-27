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

  update(id: string, data: Partial<{
    title: string
    content: string
    emotion: string
    tags: string[]
  }>): Promise<IApiResponse<IMemory>> {
    return apiClient.put(`/memories/${id}`, data as Record<string, unknown>)
  },

  delete(id: string): Promise<IApiResponse<null>> {
    return apiClient.delete(`/memories/${id}`)
  },

  getStats(): Promise<IApiResponse<{
    total: number
    byType: Record<string, number>
    byStage: Record<string, number>
    byEmotion: Record<string, number>
  }>> {
    return apiClient.get('/memories/stats')
  },
}
