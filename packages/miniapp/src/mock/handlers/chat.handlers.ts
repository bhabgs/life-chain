import type { IRouteEntry } from '../helpers'
import { ok } from '../helpers'
import { mockChatSessions, mockMessages, mockAIReplies } from '../data/chat'

export const chatHandlers: IRouteEntry[] = [
  // 会话列表
  {
    method: 'GET',
    pattern: '/chat/sessions',
    handler: () => ok(mockChatSessions),
  },

  // 创建新会话
  {
    method: 'POST',
    pattern: '/chat/sessions',
    handler: (req) => {
      const newSession = {
        id: `session-${Date.now()}`,
        userId: 'user-001',
        title: (req.data.title as string) || '新对话',
        mode: (req.data.mode as string) || 'normal',
        status: 'active',
        messageCount: 0,
        lastMessageAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return ok(newSession)
    },
  },

  // 会话消息列表
  {
    method: 'GET',
    pattern: '/chat/sessions/:id/messages',
    handler: (req) => {
      const messages = mockMessages[req.params.id] || []
      return ok(messages)
    },
  },

  // 发送消息（模拟 AI 回复）
  {
    method: 'POST',
    pattern: '/chat/sessions/:id/messages',
    handler: (req) => {
      const userMsg = {
        id: `msg-${Date.now()}`,
        sessionId: req.params.id,
        role: 'user' as const,
        content: (req.data.content as string) || '',
        createdAt: new Date().toISOString(),
      }
      const aiReply = {
        id: `msg-${Date.now() + 1}`,
        sessionId: req.params.id,
        role: 'assistant' as const,
        content: mockAIReplies[Math.floor(Math.random() * mockAIReplies.length)],
        emotion: 'peaceful',
        createdAt: new Date(Date.now() + 1500).toISOString(),
      }
      return ok({ userMessage: userMsg, aiReply })
    },
  },
]
