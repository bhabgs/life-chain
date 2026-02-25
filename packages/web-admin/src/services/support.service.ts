import type { IApiResponse, IPaginatedResponse, IPaginationParams } from '@lifechain/shared'
import apiClient from './api-client'

export interface ITicket {
  id: string
  user: string
  title: string
  priority: string
  status: string
  createdAt: string
}

export interface IFeedback {
  id: string
  user: string
  type: string
  summary: string
  rating: number
  createdAt: string
}

export const supportService = {
  getTickets(params?: IPaginationParams): Promise<IApiResponse<IPaginatedResponse<ITicket>>> {
    return apiClient.get('/support/tickets', { params })
  },

  updateTicketStatus(id: string, status: string): Promise<IApiResponse<null>> {
    return apiClient.put(`/support/tickets/${id}/status`, { status })
  },

  getFeedbacks(params?: IPaginationParams): Promise<IApiResponse<IPaginatedResponse<IFeedback>>> {
    return apiClient.get('/support/feedbacks', { params })
  },

  // ============ 人工介入记录 ============
  getInterventions(): Promise<IApiResponse<unknown[]>> {
    return apiClient.get('/support/interventions')
  },

  // ============ FAQ 管理 ============
  getFAQs(): Promise<IApiResponse<unknown[]>> {
    return apiClient.get('/support/faqs')
  },

  createFAQ(data: Record<string, unknown>): Promise<IApiResponse<unknown>> {
    return apiClient.post('/support/faqs', data)
  },

  updateFAQ(id: string, data: Record<string, unknown>): Promise<IApiResponse<unknown>> {
    return apiClient.patch(`/support/faqs/${id}`, data)
  },

  deleteFAQ(id: string): Promise<IApiResponse<null>> {
    return apiClient.delete(`/support/faqs/${id}`)
  },
}
