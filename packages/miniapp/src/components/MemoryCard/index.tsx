import { View, Text, Image } from '@tarojs/components'
import { MEMORY_TYPES, EMOTION_LABELS } from '@lifechain/shared'
import type { IMemory, TMemoryType, TEmotionLabel } from '@lifechain/shared'
import { getRelativeTime, truncateText } from '@lifechain/shared'
import './index.scss'

interface IProps {
  memory: IMemory
  onClick?: () => void
}

export default function MemoryCard({ memory, onClick }: IProps) {
  const typeInfo = MEMORY_TYPES[memory.type as TMemoryType]
  const emotionInfo = memory.emotion ? EMOTION_LABELS[memory.emotion as TEmotionLabel] : null

  return (
    <View className='memory-card' onClick={onClick}>
      {memory.mediaUrls?.[0] && (
        <Image className='memory-card__cover' src={memory.mediaUrls[0]} mode='aspectFill' />
      )}
      <View className='memory-card__body'>
        <View className='memory-card__header'>
          <Text className='memory-card__type'>{typeInfo?.label || memory.type}</Text>
          <Text className='memory-card__time'>{getRelativeTime(memory.createdAt)}</Text>
        </View>
        {memory.title && <Text className='memory-card__title'>{memory.title}</Text>}
        {memory.content && (
          <Text className='memory-card__content'>{truncateText(memory.content, 60)}</Text>
        )}
        {emotionInfo && (
          <View className='memory-card__emotion'>
            <View
              className='memory-card__emotion-dot'
              style={{ backgroundColor: emotionInfo.color }}
            />
            <Text className='memory-card__emotion-label'>{emotionInfo.label}</Text>
          </View>
        )}
      </View>
    </View>
  )
}
