import Taro from '@tarojs/taro'
import { create } from 'zustand'
import type { IUser } from '@lifechain/shared'

const STORAGE_KEY = 'auth-storage'

interface IAuthState {
  user: IUser | null
  token: string | null
  isLoggedIn: boolean
  login: (user: IUser, token: string) => void
  logout: () => void
  setUser: (user: IUser) => void
  hydrate: () => void
}

export const useAuthStore = create<IAuthState>((set, get) => ({
  user: null,
  token: null,
  isLoggedIn: false,

  login: (user, token) => {
    set({ user, token, isLoggedIn: true })
    persist(get())
  },

  logout: () => {
    set({ user: null, token: null, isLoggedIn: false })
    Taro.removeStorageSync(STORAGE_KEY)
  },

  setUser: (user) => {
    set({ user })
    persist(get())
  },

  hydrate: () => {
    try {
      const data = Taro.getStorageSync(STORAGE_KEY)
      if (data) {
        const parsed = typeof data === 'string' ? JSON.parse(data) : data
        if (parsed?.state?.token) {
          set({
            user: parsed.state.user,
            token: parsed.state.token,
            isLoggedIn: true,
          })
        }
      }
    } catch {
      // ignore
    }
  },
}))

function persist(state: IAuthState) {
  try {
    Taro.setStorageSync(STORAGE_KEY, JSON.stringify({
      state: {
        user: state.user,
        token: state.token,
      },
    }))
  } catch {
    // ignore
  }
}
