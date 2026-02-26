import { View, Text } from '@tarojs/components'
import './index.scss'

interface IProps {
  icon?: string
  title?: string
  description?: string
  actionText?: string
  onAction?: () => void
}

export default function EmptyState({
  icon = '📭',
  title = '暂无内容',
  description,
  actionText,
  onAction,
}: IProps) {
  return (
    <View className='empty-state'>
      <Text className='empty-state__icon'>{icon}</Text>
      <Text className='empty-state__title'>{title}</Text>
      {description && <Text className='empty-state__desc'>{description}</Text>}
      {actionText && (
        <View className='empty-state__action' onClick={onAction}>
          <Text className='empty-state__action-text'>{actionText}</Text>
        </View>
      )}
    </View>
  )
}
