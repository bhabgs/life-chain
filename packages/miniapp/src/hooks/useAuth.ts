import { useCallback, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { useAuthStore } from '@/store/auth.store'
import { authService } from '@/services/auth.service'

export function useAuth() {
  const { user, token, isLoggedIn, login, logout, hydrate } = useAuthStore()

  useEffect(() => {
    hydrate()
  }, [hydrate])

  const doLogin = useCallback(
    async (email: string, password: string) => {
      const res = await authService.login(email, password)
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
    },
    [login]
  )

  const doLogout = useCallback(() => {
    logout()
    Taro.reLaunch({ url: '/pages/login/index' })
  }, [logout])

  const checkAuth = useCallback(() => {
    if (!isLoggedIn) {
      Taro.redirectTo({ url: '/pages/login/index' })
      return false
    }
    return true
  }, [isLoggedIn])

  return { user, token, isLoggedIn, login: doLogin, logout: doLogout, checkAuth }
}
