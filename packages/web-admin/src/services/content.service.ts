import type { IApiResponse } from '@lifechain/shared'
import apiClient from './api-client'

export interface IComfortContent {
  id: string
  title: string
  type: string // '故事' | '音乐' | '视频'
  stage: string
  status: string // '已发布' | '草稿'
  createdAt: string
}

export interface ICorpus {
  id: string
  category: string
  question: string
  template: string
  frequency: number
}

export interface IReviewItem {
  id: string
  summary: string
  submitter: string
  type: string
  submitTime: string
  status: string // '待审核' | '已通过' | '已拒绝'
}

export const contentService = {
  getComfortList(): Promise<IApiResponse<IComfortContent[]>> {
    return apiClient.get('/content/comfort')
  },

  getCorpusList(): Promise<IApiResponse<ICorpus[]>> {
    return apiClient.get('/content/corpus')
  },

  getReviewList(): Promise<IApiResponse<IReviewItem[]>> {
    return apiClient.get('/content/review')
  },

  reviewItem(id: string, action: 'approve' | 'reject'): Promise<IApiResponse<null>> {
    return apiClient.post(`/content/review/${id}/${action}`)
  },

  createComfort(data: Partial<IComfortContent>): Promise<IApiResponse<IComfortContent>> {
    return apiClient.post('/content/comfort', data)
  },

  deleteComfort(id: string): Promise<IApiResponse<null>> {
    return apiClient.delete(`/content/comfort/${id}`)
  },

  // ============ 阶段素材库 ============
  getStageMaterials(stage?: string): Promise<IApiResponse<unknown[]>> {
    return apiClient.get('/content/stage-materials', { params: { stage } })
  },
}
