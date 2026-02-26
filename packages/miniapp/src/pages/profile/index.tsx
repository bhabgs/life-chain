import { useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import type { IUser } from '@lifechain/shared'
import { useAuthStore } from '@/store/auth.store'
import { userService } from '@/services/user.service'
import './index.scss'

const menuItems = [
  { icon: '🤖', label: '数字人设置', page: '/subpackages/detail/settings/index' },
  { icon: '🔄', label: '数据同步', action: 'sync' },
  { icon: '🔒', label: '隐私设置', page: '/subpackages/detail/settings/index' },
  { icon: '🔔', label: '通知设置', page: '/subpackages/detail/settings/index' },
  { icon: '📖', label: '人生回顾', page: '/subpackages/review/timeline/index' },
  { icon: '🎁', label: '分享给好友', page: '/subpackages/share/invite/index' },
  { icon: '📱', label: '下载完整版APP', action: 'download' },
  { icon: 'ℹ️', label: '关于我们', page: '/subpackages/detail/settings/index' },
]

export default function ProfilePage() {
  const { isLoggedIn, logout } = useAuthStore()
  const [profile, setProfile] = useState<IUser | null>(null)

  useEffect(() => {
    if (isLoggedIn) {
      loadProfile()
    }
  }, [isLoggedIn])

  const loadProfile = async () => {
    try {
      const res = await userService.getProfile()
      setProfile(res.data)
    } catch {
      // ignore
    }
  }

  const handleMenuClick = (item: (typeof menuItems)[0]) => {
    if (item.action === 'sync') {
      Taro.showToast({ title: '数据已同步', icon: 'success' })
      return
    }
    if (item.action === 'download') {
      Taro.showModal({
        title: '下载APP',
        content: '下载完整版APP可以体验更多功能，包括视频记录、VR空间、硬件联动等。',
        confirmText: '好的',
        showCancel: false,
      })
      return
    }
    if (item.page) {
      Taro.navigateTo({ url: item.page })
    }
  }

  const handleLogout = () => {
    Taro.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          logout()
          Taro.reLaunch({ url: '/pages/login/index' })
        }
      },
    })
  }

  if (!isLoggedIn) {
    return (
      <View className='page-profile'>
        <View className='page-profile__login-prompt' onClick={() => Taro.redirectTo({ url: '/pages/login/index' })}>
          <Text className='page-profile__login-text'>点击登录</Text>
        </View>
      </View>
    )
  }

  return (
    <View className='page-profile'>
      {/* 头部 */}
      <View className='page-profile__header'>
        <Image
          className='page-profile__avatar'
          src={profile?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
          mode='aspectFill'
        />
        <View className='page-profile__info'>
          <Text className='page-profile__name'>{profile?.nickname || profile?.username || '用户'}</Text>
          <Text className='page-profile__bio'>记录美好，留住时光</Text>
        </View>
      </View>

      {/* 菜单列表 */}
      <View className='page-profile__menu'>
        {menuItems.map((item) => (
          <View
            key={item.label}
            className='page-profile__menu-item'
            onClick={() => handleMenuClick(item)}
          >
            <Text className='page-profile__menu-icon'>{item.icon}</Text>
            <Text className='page-profile__menu-label'>{item.label}</Text>
            <Text className='page-profile__menu-arrow'>›</Text>
          </View>
        ))}
      </View>

      {/* 退出登录 */}
      <View className='page-profile__logout' onClick={handleLogout}>
        <Text className='page-profile__logout-text'>退出登录</Text>
      </View>
    </View>
  )
}
