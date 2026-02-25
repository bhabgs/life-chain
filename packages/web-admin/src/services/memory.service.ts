import type {
  IApiResponse,
  IPaginatedResponse,
  IMemory,
  IMemoryQueryParams,
  IMemoryStats,
} from '@lifechain/shared'
import apiClient from './api-client'
import type {
  IStructuringRule,
  IReviewTemplate,
  IStorageInfo,
  IBackupRecord,
  IBackupStrategy,
  IArchiveRule,
} from '@/mocks/data/memories'

export const memoryService = {
  // ============ 记忆列表 ============
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

  // ============ 结构化规则 ============
  getStructuringRules(category?: string): Promise<IApiResponse<IStructuringRule[]>> {
    return apiClient.get('/memories/structuring-rules', { params: { category } })
  },

  createStructuringRule(data: Partial<IStructuringRule>): Promise<IApiResponse<IStructuringRule>> {
    return apiClient.post('/memories/structuring-rules', data)
  },

  updateStructuringRule(id: string, data: Partial<IStructuringRule>): Promise<IApiResponse<IStructuringRule>> {
    return apiClient.patch(`/memories/structuring-rules/${id}`, data)
  },

  deleteStructuringRule(id: string): Promise<IApiResponse<null>> {
    return apiClient.delete(`/memories/structuring-rules/${id}`)
  },

  // ============ 回顾模板 ============
  getReviewTemplates(type?: string): Promise<IApiResponse<IReviewTemplate[]>> {
    return apiClient.get('/memories/review-templates', { params: { type } })
  },

  createReviewTemplate(data: Partial<IReviewTemplate>): Promise<IApiResponse<IReviewTemplate>> {
    return apiClient.post('/memories/review-templates', data)
  },

  updateReviewTemplate(id: string, data: Partial<IReviewTemplate>): Promise<IApiResponse<IReviewTemplate>> {
    return apiClient.patch(`/memories/review-templates/${id}`, data)
  },

  deleteReviewTemplate(id: string): Promise<IApiResponse<null>> {
    return apiClient.delete(`/memories/review-templates/${id}`)
  },

  // ============ 存储管理 ============
  getStorageInfo(): Promise<IApiResponse<{
    storageInfo: IStorageInfo
    backupRecords: IBackupRecord[]
    backupStrategy: IBackupStrategy
    archiveRules: IArchiveRule[]
  }>> {
    return apiClient.get('/memories/storage')
  },

  updateBackupStrategy(data: Partial<IBackupStrategy>): Promise<IApiResponse<IBackupStrategy>> {
    return apiClient.patch('/memories/storage/backup-strategy', data)
  },

  updateArchiveRule(id: string, data: Partial<IArchiveRule>): Promise<IApiResponse<IArchiveRule>> {
    return apiClient.patch(`/memories/storage/archive-rules/${id}`, data)
  },
}
