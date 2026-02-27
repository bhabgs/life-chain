import type { IApiResponse } from '@lifechain/shared'
import apiClient from './api-client'

export const uploadService = {
  uploadImage(filePath: string): Promise<IApiResponse<{ url: string; filename: string }>> {
    return apiClient.post('/upload/image', { filePath })
  },

  transcribeVoice(filePath: string): Promise<IApiResponse<{ text: string; duration: number; confidence: number }>> {
    return apiClient.post('/upload/voice-transcribe', { filePath })
  },
}
