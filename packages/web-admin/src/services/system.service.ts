import type { IApiResponse, IPaginatedResponse, IPaginationParams } from '@lifechain/shared'
import apiClient from './api-client'

export interface ISystemConfig {
  id: string
  key: string
  value: string
  group: string
  description: string
  updatedAt: string
}

export interface IServiceStatus {
  name: string
  status: 'healthy' | 'degraded' | 'down'
  uptime: string
  cpu: number
  memory: number
  responseTime: number
}

export interface ISystemMonitor {
  services: IServiceStatus[]
  alerts: ISystemAlert[]
}

export interface ISystemAlert {
  id: string
  level: 'info' | 'warning' | 'critical'
  message: string
  service: string
  createdAt: string
  resolved: boolean
}

export interface IOperationLog {
  id: string
  userId: string
  username: string
  action: string
  resource: string
  detail: string
  ip: string
  createdAt: string
}

export interface IRole {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  createdAt: string
}

export const systemService = {
  getConfig(): Promise<IApiResponse<ISystemConfig[]>> {
    return apiClient.get('/system/config')
  },

  updateConfig(id: string, value: string): Promise<IApiResponse<ISystemConfig>> {
    return apiClient.patch(`/system/config/${id}`, { value })
  },

  getMonitor(): Promise<IApiResponse<ISystemMonitor>> {
    return apiClient.get('/system/monitor')
  },

  getLogs(params: IPaginationParams): Promise<IApiResponse<IPaginatedResponse<IOperationLog>>> {
    return apiClient.get('/system/logs', { params })
  },

  getRoles(): Promise<IApiResponse<IRole[]>> {
    return apiClient.get('/roles')
  },

  createRole(data: Omit<IRole, 'id' | 'userCount' | 'createdAt'>): Promise<IApiResponse<IRole>> {
    return apiClient.post('/roles', data)
  },

  updateRole(
    id: string,
    data: Partial<Omit<IRole, 'id' | 'userCount' | 'createdAt'>>,
  ): Promise<IApiResponse<IRole>> {
    return apiClient.patch(`/roles/${id}`, data)
  },

  deleteRole(id: string): Promise<IApiResponse<null>> {
    return apiClient.delete(`/roles/${id}`)
  },
}
