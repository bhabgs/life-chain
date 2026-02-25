import type {
  IApiResponse,
  IPaginatedResponse,
  IPersonalityTemplate,
  IPersonalityTemplateRequest,
  IPaginationParams,
} from '@lifechain/shared'
import apiClient from './api-client'

export const personalityService = {
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
}
