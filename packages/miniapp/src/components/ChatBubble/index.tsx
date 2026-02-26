import { View, Text } from '@tarojs/components'
import type { IChatMessage } from '@lifechain/shared'
import { EMOTION_LABELS } from '@lifechain/shared'
import type { TEmotionLabel } from '@lifechain/shared'
import './index.scss'

interface IProps {
  message: IChatMessage
}

export default function ChatBubble({ message }: IProps) {
  const isUser = message.role === 'user'
  const emotionInfo = message.emotion ? EMOTION_LABELS[message.emotion as TEmotionLabel] : null

  return (
    <View className={`chat-bubble ${isUser ? 'chat-bubble--user' : 'chat-bubble--ai'}`}>
      {!isUser && <View className='chat-bubble__avatar'>AI</View>}
      <View className='chat-bubble__content-wrap'>
        <View className={`chat-bubble__content ${isUser ? 'chat-bubble__content--user' : 'chat-bubble__content--ai'}`}>
          <Text className='chat-bubble__text'>{message.content}</Text>
        </View>
        {emotionInfo && !isUser && (
          <Text className='chat-bubble__emotion' style={{ color: emotionInfo.color }}>
            {emotionInfo.label}
          </Text>
        )}
      </View>
      {isUser && <View className='chat-bubble__avatar chat-bubble__avatar--user'>我</View>}
    </View>
  )
}
