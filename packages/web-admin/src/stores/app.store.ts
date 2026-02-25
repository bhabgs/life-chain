import { create } from 'zustand'

interface IAppState {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
}

export const useAppStore = create<IAppState>()((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
}))
