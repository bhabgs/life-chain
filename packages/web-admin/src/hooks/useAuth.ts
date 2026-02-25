import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { useAuthStore } from '@/stores/auth.store'
import { authService } from '@/services/auth.service'
import type { ILoginRequest } from '@lifechain/shared'

export function useAuth() {
  const navigate = useNavigate()
  const { user, isAuthenticated, setAuth, logout: clearAuth } = useAuthStore()

  const login = useCallback(
    async (data: ILoginRequest) => {
      const res = await authService.login(data)
      if (res.code === 0) {
        setAuth(res.data)
        message.success('登录成功')
        navigate('/')
      } else {
        message.error(res.message || '登录失败')
      }
    },
    [setAuth, navigate],
  )

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      clearAuth()
      navigate('/login')
    }
  }, [clearAuth, navigate])

  return { user, isAuthenticated, login, logout }
}
