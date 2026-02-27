import type { IApiResponse, IChatSession, IChatMessage } from '@lifechain/shared'
import apiClient from './api-client'

export const chatService = {
  getSessions(): Promise<IApiResponse<IChatSession[]>> {
    return apiClient.get('/chat/sessions')
  },

  getMessages(sessionId: string): Promise<IApiResponse<IChatMessage[]>> {
    return apiClient.get(`/chat/sessions/${sessionId}/messages`)
  },

  createSession(title?: string, mode?: string): Promise<IApiResponse<IChatSession>> {
    return apiClient.post('/chat/sessions', { title, mode })
  },

  sendMessage(
    sessionId: string,
    content: string
  ): Promise<IApiResponse<{ userMessage: IChatMessage; aiReply: IChatMessage }>> {
    return apiClient.post(`/chat/sessions/${sessionId}/messages`, { content })
  },
}
