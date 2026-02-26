import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const actions = [
  { icon: '✏️', label: '文字', page: '/subpackages/capture/text/index' },
  { icon: '🎤', label: '语音', page: '/subpackages/capture/voice/index' },
  { icon: '📷', label: '拍照', page: '/subpackages/capture/photo/index' },
]

export default function QuickActions() {
  const handleClick = (page: string) => {
    Taro.navigateTo({ url: page })
  }

  return (
    <View className='quick-actions'>
      {actions.map((action) => (
        <View
          key={action.label}
          className='quick-actions__item'
          onClick={() => handleClick(action.page)}
        >
          <View className='quick-actions__icon'>{action.icon}</View>
          <Text className='quick-actions__label'>{action.label}</Text>
        </View>
      ))}
    </View>
  )
}
