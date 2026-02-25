/** API 基础路径 */
export const API_BASE_URL = '/api/v1'

/** API 端点路径 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  USERS: {
    BASE: '/users',
    DETAIL: (id: string) => `/users/${id}`,
    PROFILE: '/users/me/profile',
  },
  MEMORIES: {
    BASE: '/memories',
    DETAIL: (id: string) => `/memories/${id}`,
    TIMELINE: '/memories/timeline',
    STATS: '/memories/stats',
  },
  PERSONALITIES: {
    BASE: '/personalities',
    DETAIL: (id: string) => `/personalities/${id}`,
    TEMPLATES: '/personalities/templates',
    TEMPLATE_DETAIL: (id: string) => `/personalities/templates/${id}`,
  },
  CHAT: {
    SESSIONS: '/chat/sessions',
    SESSION_DETAIL: (id: string) => `/chat/sessions/${id}`,
    MESSAGES: (sessionId: string) => `/chat/sessions/${sessionId}/messages`,
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    USER_GROWTH: '/dashboard/user-growth',
    MEMORY_TREND: '/dashboard/memory-trend',
    INTERACTION: '/dashboard/interaction',
    STAGE_DISTRIBUTION: '/dashboard/stage-distribution',
  },
  SYSTEM: {
    CONFIG: '/system/config',
    MONITOR: '/system/monitor',
    LOGS: '/system/logs',
  },
  ROLES: {
    BASE: '/roles',
    DETAIL: (id: string) => `/roles/${id}`,
  },
} as const

/** 响应状态码 */
export const RESPONSE_CODE = {
  SUCCESS: 0,
  UNAUTHORIZED: 1001,
  FORBIDDEN: 1003,
  NOT_FOUND: 1004,
  VALIDATION_ERROR: 1022,
  SERVER_ERROR: 2000,
} as const
