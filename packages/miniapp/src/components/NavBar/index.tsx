import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

interface IProps {
  title: string
  showBack?: boolean
  rightText?: string
  onRightClick?: () => void
}

export default function NavBar({ title, showBack = true, rightText, onRightClick }: IProps) {
  const handleBack = () => {
    Taro.navigateBack()
  }

  return (
    <View className='nav-bar'>
      <View className='nav-bar__left'>
        {showBack && (
          <View className='nav-bar__back' onClick={handleBack}>
            <Text className='nav-bar__back-icon'>‹</Text>
          </View>
        )}
      </View>
      <Text className='nav-bar__title'>{title}</Text>
      <View className='nav-bar__right'>
        {rightText && (
          <Text className='nav-bar__right-text' onClick={onRightClick}>
            {rightText}
          </Text>
        )}
      </View>
    </View>
  )
}
