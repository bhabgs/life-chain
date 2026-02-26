import { useEffect, useState, useRef } from 'react'
import { View, Input, ScrollView, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import type { IChatMessage } from '@lifechain/shared'
import ChatBubble from '@/components/ChatBubble'
import { chatService } from '@/services/chat.service'
import { useChatStore } from '@/store/chat.store'
import './index.scss'

export default function ChatPage() {
  const [messages, setMessages] = useState<IChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [sending, setSending] = useState(false)
  const [scrollToId, setScrollToId] = useState('')
  const sessionId = useChatStore((s) => s.currentSessionId) || 'session-001'
  const isInitRef = useRef(false)

  useEffect(() => {
    if (!isInitRef.current) {
      isInitRef.current = true
      loadMessages()
    }
  }, [])

  const loadMessages = async () => {
    try {
      const res = await chatService.getMessages(sessionId)
      setMessages(res.data)
      scrollToBottom(res.data)
    } catch {
      // ignore
    }
  }

  const scrollToBottom = (msgs: IChatMessage[]) => {
    if (msgs.length > 0) {
      setScrollToId(`msg-${msgs[msgs.length - 1].id}`)
    }
  }

  const handleSend = async () => {
    const text = inputValue.trim()
    if (!text || sending) return

    setInputValue('')
    setSending(true)

    // 先添加用户消息到列表
    const userMsg: IChatMessage = {
      id: `local-${Date.now()}`,
      sessionId,
      role: 'user',
      content: text,
      createdAt: new Date().toISOString(),
    }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    scrollToBottom(newMessages)

    try {
      const res = await chatService.sendMessage(sessionId, text)
      // 用服务端返回的 AI 回复替换
      const withAI = [...newMessages, res.data.aiReply]
      setMessages(withAI)
      scrollToBottom(withAI)
    } catch {
      Taro.showToast({ title: '发送失败', icon: 'none' })
    } finally {
      setSending(false)
    }
  }

  return (
    <View className='page-chat'>
      <ScrollView
        className='page-chat__messages'
        scrollY
        scrollIntoView={scrollToId}
        scrollWithAnimation
      >
        <View className='page-chat__messages-inner'>
          {messages.map((msg) => (
            <View key={msg.id} id={`msg-${msg.id}`}>
              <ChatBubble message={msg} />
            </View>
          ))}
          {sending && (
            <View className='page-chat__typing'>
              <Text className='page-chat__typing-text'>生命链正在思考...</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* 底部输入栏 */}
      <View className='page-chat__input-bar'>
        <Input
          className='page-chat__input'
          placeholder='说点什么吧...'
          value={inputValue}
          onInput={(e) => setInputValue(e.detail.value)}
          onConfirm={handleSend}
          confirmType='send'
          adjustPosition
        />
        <View
          className={`page-chat__send ${inputValue.trim() ? 'page-chat__send--active' : ''}`}
          onClick={handleSend}
        >
          <Text className='page-chat__send-text'>发送</Text>
        </View>
      </View>
    </View>
  )
}
