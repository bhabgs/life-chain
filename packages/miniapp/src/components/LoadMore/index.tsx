import { View, Text } from '@tarojs/components'
import './index.scss'

interface IProps {
  status: 'loading' | 'noMore' | 'idle'
}

export default function LoadMore({ status }: IProps) {
  if (status === 'idle') return null

  return (
    <View className='load-more'>
      {status === 'loading' && <Text className='load-more__text'>加载中...</Text>}
      {status === 'noMore' && <Text className='load-more__text load-more__text--end'>— 没有更多了 —</Text>}
    </View>
  )
}
