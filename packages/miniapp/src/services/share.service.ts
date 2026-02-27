import type { IApiResponse } from '@lifechain/shared'
import apiClient from './api-client'

export interface IShareCard {
  cardUrl: string
  memoryId: string
  style: string
}

export interface IInviteCode {
  code: string
  expiredAt: string
  maxUses: number
  usedCount: number
}

export interface IInviteVerifyResult {
  valid: boolean
  inviterNickname: string | null
  message: string
}

export const shareService = {
  generateCard(memoryId: string, style?: string): Promise<IApiResponse<IShareCard>> {
    return apiClient.post('/share/generate-card', { memoryId, style })
  },

  getInviteCode(): Promise<IApiResponse<IInviteCode>> {
    return apiClient.get('/share/invite-code')
  },

  verifyInvite(code: string): Promise<IApiResponse<IInviteVerifyResult>> {
    return apiClient.post('/share/verify-invite', { code })
  },
}
