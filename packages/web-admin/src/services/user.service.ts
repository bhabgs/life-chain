import type {
  IApiResponse,
  IPaginatedResponse,
  IUser,
  IUserDetail,
  IUserQueryParams,
  ICreateUserRequest,
  IUpdateUserRequest,
} from '@lifechain/shared'
import apiClient from './api-client'

export interface IReviewQueryParams {
  status?: string
  page?: number
  pageSize?: number
}

export const userService = {
  getList(params: IUserQueryParams): Promise<IApiResponse<IPaginatedResponse<IUser>>> {
    return apiClient.get('/users', { params })
  },

  getDetail(id: string): Promise<IApiResponse<IUserDetail>> {
    return apiClient.get(`/users/${id}`)
  },

  create(data: ICreateUserRequest): Promise<IApiResponse<IUser>> {
    return apiClient.post('/users', data)
  },

  update(id: string, data: IUpdateUserRequest): Promise<IApiResponse<IUser>> {
    return apiClient.patch(`/users/${id}`, data)
  },

  delete(id: string): Promise<IApiResponse<null>> {
    return apiClient.delete(`/users/${id}`)
  },

  batchDelete(ids: string[]): Promise<IApiResponse<null>> {
    return apiClient.post('/users/batch-delete', { ids })
  },

  getSegments(): Promise<IApiResponse<unknown>> {
    return apiClient.get('/users/segments')
  },

  getReviewList(params: IReviewQueryParams): Promise<IApiResponse<unknown>> {
    return apiClient.get('/users/review', { params })
  },

  reviewUser(id: string, action: string, reason?: string): Promise<IApiResponse<unknown>> {
    return apiClient.post(`/users/review/${id}`, { action, reason })
  },

  getBehaviorStats(period?: string): Promise<IApiResponse<unknown>> {
    return apiClient.get('/users/behavior-stats', { params: { period } })
  },
}
