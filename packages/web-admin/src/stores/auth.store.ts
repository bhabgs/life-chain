import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ILoginResponse } from '@lifechain/shared'
import { config } from '@/config'

interface IAuthState {
  accessToken: string | null
  refreshToken: string | null
  user: ILoginResponse['user'] | null
  isAuthenticated: boolean
  setAuth: (data: ILoginResponse) => void
  logout: () => void
  updateToken: (accessToken: string) => void
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      setAuth: (data) =>
        set({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: data.user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }),

      updateToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: config.tokenKey,
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
