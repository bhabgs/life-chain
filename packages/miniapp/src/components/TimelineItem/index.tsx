import { View, Text } from '@tarojs/components'
import './index.scss'

interface IHighlight {
  id: string
  title: string
  date: string
  type: string
  isImportant: boolean
}

interface IProps {
  month: string
  label: string
  count: number
  highlights: IHighlight[]
  onItemClick?: (id: string) => void
}

export default function TimelineItem({ label, count, highlights, onItemClick }: IProps) {
  return (
    <View className='timeline-item'>
      <View className='timeline-item__header'>
        <View className='timeline-item__dot' />
        <Text className='timeline-item__month'>{label}</Text>
        <Text className='timeline-item__count'>{count} 条记忆</Text>
      </View>
      <View className='timeline-item__line'>
        {highlights.map((item) => (
          <View
            key={item.id}
            className='timeline-item__event'
            onClick={() => onItemClick?.(item.id)}
          >
            {item.isImportant && <View className='timeline-item__star'>★</View>}
            <View className='timeline-item__event-body'>
              <Text className='timeline-item__event-title'>{item.title}</Text>
              <Text className='timeline-item__event-date'>{item.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
