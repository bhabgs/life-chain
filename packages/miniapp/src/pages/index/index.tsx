import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import type { IMemory, IChatMessage } from '@lifechain/shared'
import { formatDate } from '@lifechain/shared'
import QuickActions from '@/components/QuickActions'
import MemoryCard from '@/components/MemoryCard'
import { memoryService } from '@/services/memory.service'
import { chatService } from '@/services/chat.service'
import './index.scss'

export default function IndexPage() {
  const [recentMemories, setRecentMemories] = useState<IMemory[]>([])
  const [lastMessage, setLastMessage] = useState<IChatMessage | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [memRes, sessionRes] = await Promise.all([
        memoryService.getList({ page: 1, pageSize: 5 }),
        chatService.getSessions(),
      ])
      setRecentMemories((memRes.data as { items: IMemory[] }).items || [])

      // 获取最新会话的最后一条消息
      const sessions = sessionRes.data
      if (sessions.length > 0) {
        const msgRes = await chatService.getMessages(sessions[0].id)
        const messages = msgRes.data
        if (messages.length > 0) {
          setLastMessage(messages[messages.length - 1])
        }
      }
    } catch {
      // ignore
    }
  }

  const handleMemoryClick = (id: string) => {
    Taro.navigateTo({ url: `/subpackages/detail/memory-detail/index?id=${id}` })
  }

  const goToChat = () => {
    Taro.switchTab({ url: '/pages/chat/index' })
  }

  const goToMemory = () => {
    Taro.switchTab({ url: '/pages/memory/index' })
  }

  return (
    <View className='page-index'>
      {/* 头部 */}
      <View className='page-index__header'>
        <Text className='page-index__logo'>生命链</Text>
        <Text className='page-index__date'>{formatDate(new Date().toISOString(), 'MM月DD日')}</Text>
      </View>

      {/* 快速记录 */}
      <View className='page-index__section'>
        <Text className='page-index__section-title'>快速记录</Text>
        <QuickActions />
      </View>

      {/* 今日对话 */}
      <View className='page-index__section'>
        <View className='page-index__section-header' onClick={goToChat}>
          <Text className='page-index__section-title'>今日对话</Text>
          <Text className='page-index__section-more'>进入对话 ›</Text>
        </View>
        <View className='page-index__chat-card' onClick={goToChat}>
          {lastMessage ? (
            <>
              <Text className='page-index__chat-role'>
                {lastMessage.role === 'assistant' ? '生命链' : '我'}
              </Text>
              <Text className='page-index__chat-content'>
                {lastMessage.content.length > 50
                  ? lastMessage.content.slice(0, 50) + '...'
                  : lastMessage.content}
              </Text>
            </>
          ) : (
            <Text className='page-index__chat-empty'>还没有对话，去和我聊聊吧～</Text>
          )}
        </View>
      </View>

      {/* 最近记忆 */}
      <View className='page-index__section'>
        <View className='page-index__section-header' onClick={goToMemory}>
          <Text className='page-index__section-title'>最近记忆</Text>
          <Text className='page-index__section-more'>查看全部 ›</Text>
        </View>
        {recentMemories.map((mem) => (
          <MemoryCard
            key={mem.id}
            memory={mem}
            onClick={() => handleMemoryClick(mem.id)}
          />
        ))}
      </View>
    </View>
  )
}
