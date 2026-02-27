import type { IUser } from '@lifechain/shared'

export const mockCurrentUser: IUser = {
  id: 'user-001',
  email: 'lihua@example.com',
  phone: '13800138001',
  username: 'lihua',
  nickname: '小花',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lihua',
  birthDate: '1995-06-15',
  gender: 'female',
  status: 'active',
  role: 'user',
  createdAt: '2025-12-01T08:00:00Z',
  updatedAt: '2026-02-20T10:30:00Z',
}

/** 用户设置 mock 数据 */
export const mockUserSettings = {
  notifications: {
    newMemory: true,
    dailyReminder: true,
    weeklyReport: false,
    systemNotice: true,
  },
  privacy: {
    defaultLevel: 1 as 1 | 2 | 3,
    allowSearch: false,
  },
  theme: 'light' as 'light' | 'dark' | 'system',
  language: 'zh-CN',
  fontSize: 'medium' as 'small' | 'medium' | 'large',
}
