export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  appName: '生命链管理后台',
  tokenKey: 'lifechain_admin_token',
  refreshTokenKey: 'lifechain_admin_refresh_token',
  enableMock: import.meta.env.VITE_ENABLE_MOCK !== 'false',
} as const
