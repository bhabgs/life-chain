import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import './index.scss'

export default function InvitePage() {
  const handleShareToFriend = () => {
    Taro.showToast({ title: '请使用右上角分享', icon: 'none' })
  }

  const handleCopyLink = () => {
    Taro.setClipboardData({ data: 'https://lifechain.com/invite/mock-code' })
    Taro.showToast({ title: '链接已复制', icon: 'success' })
  }

  const handleSavePoster = () => {
    Taro.showToast({ title: '海报已保存到相册', icon: 'success' })
  }

  return (
    <View className='page-invite'>
      <NavBar title='邀请家人' />

      <View className='page-invite__body'>
        {/* 邀请卡片 */}
        <View className='page-invite__card'>
          <Text className='page-invite__card-emoji'>🏠</Text>
          <Text className='page-invite__card-title'>邀请家人一起记录</Text>
          <Text className='page-invite__card-desc'>
            生命链帮助你和家人一起记录人生中的美好时刻。邀请家人加入，共同编织家族记忆。
          </Text>
          <View className='page-invite__qr-placeholder'>
            <Text className='page-invite__qr-text'>小程序码</Text>
            <Text className='page-invite__qr-sub'>(实际使用时会显示真实的小程序码)</Text>
          </View>
        </View>

        {/* 操作按钮 */}
        <View className='page-invite__actions'>
          <View className='page-invite__action' onClick={handleShareToFriend}>
            <Text className='page-invite__action-icon'>💬</Text>
            <Text className='page-invite__action-label'>分享给好友</Text>
          </View>
          <View className='page-invite__action' onClick={handleCopyLink}>
            <Text className='page-invite__action-icon'>🔗</Text>
            <Text className='page-invite__action-label'>复制链接</Text>
          </View>
          <View className='page-invite__action' onClick={handleSavePoster}>
            <Text className='page-invite__action-icon'>📥</Text>
            <Text className='page-invite__action-label'>保存海报</Text>
          </View>
        </View>

        {/* 说明 */}
        <View className='page-invite__tips'>
          <Text className='page-invite__tips-title'>邀请说明</Text>
          <Text className='page-invite__tips-item'>• 家人扫码即可加入你的家族网络</Text>
          <Text className='page-invite__tips-item'>• 家人可以查看你设为"家人可见"的记忆</Text>
          <Text className='page-invite__tips-item'>• 你们可以共同维护家族时间轴</Text>
          <Text className='page-invite__tips-item'>• 更多高级功能请下载完整版APP</Text>
        </View>
      </View>
    </View>
  )
}
