import type { IApiResponse } from '@lifechain/shared'
import type { ITimelineGroup, IStageSummary } from '@/mock/data/review'
export type { ITimelineGroup, IStageSummary }
import apiClient from './api-client'

export const reviewService = {
  getTimeline(): Promise<IApiResponse<ITimelineGroup[]>> {
    return apiClient.get('/review/timeline')
  },

  getSummary(period?: string): Promise<IApiResponse<IStageSummary>> {
    return apiClient.get('/review/summary', period ? { period } : undefined)
  },
}
