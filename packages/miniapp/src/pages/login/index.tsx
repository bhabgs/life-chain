import { useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useAuthStore } from '@/store/auth.store'
import { authService } from '@/services/auth.service'
import './index.scss'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()

  const handleWechatLogin = async () => {
    if (!agreed) {
      Taro.showToast({ title: '请先同意用户协议', icon: 'none' })
      return
    }
    setLoading(true)
    try {
      const res = await authService.login('mock@lifechain.com', 'mock-password')
      login(
        {
          id: res.data.user.id,
          email: res.data.user.email,
          username: res.data.user.username,
          nickname: res.data.user.nickname,
          avatar: res.data.user.avatar,
          status: 'active',
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        res.data.accessToken
      )
      Taro.switchTab({ url: '/pages/index/index' })
    } catch {
      Taro.showToast({ title: '登录失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneLogin = async () => {
    if (!agreed) {
      Taro.showToast({ title: '请先同意用户协议', icon: 'none' })
      return
    }
    if (!phone || !code) {
      Taro.showToast({ title: '请输入手机号和验证码', icon: 'none' })
      return
    }
    setLoading(true)
    try {
      const res = await authService.loginByPhone(phone, code)
      login(
        {
          id: res.data.user.id,
          email: res.data.user.email,
          username: res.data.user.username,
          nickname: res.data.user.nickname,
          avatar: res.data.user.avatar,
          status: 'active',
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        res.data.accessToken
      )
      Taro.switchTab({ url: '/pages/index/index' })
    } catch {
      Taro.showToast({ title: '登录失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  const handleGetCode = () => {
    if (!phone) {
      Taro.showToast({ title: '请先输入手机号', icon: 'none' })
      return
    }
    Taro.showToast({ title: '验证码已发送', icon: 'success' })
  }

  return (
    <View className='page-login'>
      <View className='page-login__logo'>
        <Text className='page-login__logo-text'>生命链</Text>
        <Text className='page-login__slogan'>记录美好，留住时光</Text>
      </View>

      {/* 微信登录 */}
      <View
        className={`page-login__wechat-btn ${loading ? 'page-login__wechat-btn--disabled' : ''}`}
        onClick={handleWechatLogin}
      >
        <Text className='page-login__wechat-text'>微信一键登录</Text>
      </View>

      {/* 分割线 */}
      <View className='page-login__divider'>
        <View className='page-login__divider-line' />
        <Text className='page-login__divider-text'>或</Text>
        <View className='page-login__divider-line' />
      </View>

      {/* 手机号登录 */}
      <View className='page-login__form'>
        <View className='page-login__field'>
          <Input
            className='page-login__input'
            placeholder='手机号'
            type='number'
            maxlength={11}
            value={phone}
            onInput={(e) => setPhone(e.detail.value)}
          />
        </View>
        <View className='page-login__field page-login__field--code'>
          <Input
            className='page-login__input'
            placeholder='验证码'
            type='number'
            maxlength={6}
            value={code}
            onInput={(e) => setCode(e.detail.value)}
          />
          <View className='page-login__code-btn' onClick={handleGetCode}>
            <Text className='page-login__code-text'>获取验证码</Text>
          </View>
        </View>
        <View
          className={`page-login__submit ${loading ? 'page-login__submit--disabled' : ''}`}
          onClick={handlePhoneLogin}
        >
          <Text className='page-login__submit-text'>登录</Text>
        </View>
      </View>

      {/* 协议 */}
      <View className='page-login__agreement' onClick={() => setAgreed(!agreed)}>
        <View className={`page-login__checkbox ${agreed ? 'page-login__checkbox--checked' : ''}`}>
          {agreed && <Text className='page-login__check'>✓</Text>}
        </View>
        <Text className='page-login__agreement-text'>
          我已阅读并同意《用户协议》和《隐私政策》
        </Text>
      </View>
    </View>
  )
}
