import type { IApiResponse } from '@lifechain/shared'
import apiClient from './api-client'

export interface IDashboardStats {
  totalUsers: number
  activeUsers: number
  totalMemories: number
  systemHealth: number
  userGrowthRate: number
  memoryGrowthRate: number
}

export interface IChartData {
  labels: string[]
  values: number[]
}

export interface IStageDistribution {
  stage: string
  label: string
  count: number
  percentage: number
}

export interface ISystemAlert {
  id: string
  level: 'info' | 'warning' | 'critical'
  message: string
  service: string
  time: string
  resolved: boolean
}

export const dashboardService = {
  getStats(): Promise<IApiResponse<IDashboardStats>> {
    return apiClient.get('/dashboard/stats')
  },

  getUserGrowth(period?: string): Promise<IApiResponse<IChartData>> {
    return apiClient.get('/dashboard/user-growth', { params: { period } })
  },

  getMemoryTrend(period?: string): Promise<IApiResponse<IChartData>> {
    return apiClient.get('/dashboard/memory-trend', { params: { period } })
  },

  getInteraction(period?: string): Promise<IApiResponse<IChartData>> {
    return apiClient.get('/dashboard/interaction', { params: { period } })
  },

  getStageDistribution(): Promise<IApiResponse<IStageDistribution[]>> {
    return apiClient.get('/dashboard/stage-distribution')
  },

  getAlerts(): Promise<IApiResponse<ISystemAlert[]>> {
    return apiClient.get('/dashboard/alerts')
  },
}
