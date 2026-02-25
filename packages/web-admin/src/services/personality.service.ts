import type {
  IApiResponse,
  IPaginatedResponse,
  IPersonalityTemplate,
  IPersonalityTemplateRequest,
  IPaginationParams,
} from '@lifechain/shared'
import apiClient from './api-client'
import type {
  IAvatarResource,
  IReplyTemplate,
  ICompanionMode,
  IEmotionStrategy,
  INaming,
} from '@/mocks/data/personality-templates'

export const personalityService = {
  // ============ 模板管理 ============
  getTemplates(
    params?: IPaginationParams,
  ): Promise<IApiResponse<IPaginatedResponse<IPersonalityTemplate>>> {
    return apiClient.get('/personalities/templates', { params })
  },

  getTemplate(id: string): Promise<IApiResponse<IPersonalityTemplate>> {
    return apiClient.get(`/personalities/templates/${id}`)
  },

  createTemplate(
    data: IPersonalityTemplateRequest,
  ): Promise<IApiResponse<IPersonalityTemplate>> {
    return apiClient.post('/personalities/templates', data)
  },

  updateTemplate(
    id: string,
    data: Partial<IPersonalityTemplateRequest>,
  ): Promise<IApiResponse<IPersonalityTemplate>> {
    return apiClient.patch(`/personalities/templates/${id}`, data)
  },

  deleteTemplate(id: string): Promise<IApiResponse<null>> {
    return apiClient.delete(`/personalities/templates/${id}`)
  },

  // ============ 形象资源 ============
  getAvatars(stage?: string): Promise<IApiResponse<IAvatarResource[]>> {
    return apiClient.get('/personalities/avatars', { params: { stage } })
  },

  uploadAvatar(data: Partial<IAvatarResource>): Promise<IApiResponse<IAvatarResource>> {
    return apiClient.post('/personalities/avatars', data)
  },

  reviewAvatar(id: string, action: 'approve' | 'reject'): Promise<IApiResponse<IAvatarResource>> {
    return apiClient.patch(`/personalities/avatars/${id}/review`, { action })
  },

  deleteAvatar(id: string): Promise<IApiResponse<null>> {
    return apiClient.delete(`/personalities/avatars/${id}`)
  },

  // ============ 对话策略 ============
  getReplyTemplates(): Promise<IApiResponse<IReplyTemplate[]>> {
    return apiClient.get('/personalities/dialogue/reply-templates')
  },

  createReplyTemplate(data: Partial<IReplyTemplate>): Promise<IApiResponse<IReplyTemplate>> {
    return apiClient.post('/personalities/dialogue/reply-templates', data)
  },

  updateReplyTemplate(id: string, data: Partial<IReplyTemplate>): Promise<IApiResponse<IReplyTemplate>> {
    return apiClient.patch(`/personalities/dialogue/reply-templates/${id}`, data)
  },

  deleteReplyTemplate(id: string): Promise<IApiResponse<null>> {
    return apiClient.delete(`/personalities/dialogue/reply-templates/${id}`)
  },

  getCompanionModes(): Promise<IApiResponse<ICompanionMode[]>> {
    return apiClient.get('/personalities/dialogue/companion-modes')
  },

  updateCompanionMode(id: string, data: Partial<ICompanionMode>): Promise<IApiResponse<ICompanionMode>> {
    return apiClient.patch(`/personalities/dialogue/companion-modes/${id}`, data)
  },

  getEmotionStrategies(): Promise<IApiResponse<IEmotionStrategy[]>> {
    return apiClient.get('/personalities/dialogue/emotion-strategies')
  },

  updateEmotionStrategy(id: string, data: Partial<IEmotionStrategy>): Promise<IApiResponse<IEmotionStrategy>> {
    return apiClient.patch(`/personalities/dialogue/emotion-strategies/${id}`, data)
  },

  // ============ 称呼系统 ============
  getNamings(): Promise<IApiResponse<INaming[]>> {
    return apiClient.get('/personalities/namings')
  },

  createNaming(data: Partial<INaming>): Promise<IApiResponse<INaming>> {
    return apiClient.post('/personalities/namings', data)
  },

  updateNaming(id: string, data: Partial<INaming>): Promise<IApiResponse<INaming>> {
    return apiClient.patch(`/personalities/namings/${id}`, data)
  },

  deleteNaming(id: string): Promise<IApiResponse<null>> {
    return apiClient.delete(`/personalities/namings/${id}`)
  },
}
