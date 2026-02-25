import type {
  ISystemConfig,
  ISystemMonitor,
  IOperationLog,
  IRole,
} from '@/services/system.service'

const now = new Date().toISOString()

export const mockSystemConfig: ISystemConfig[] = [
  { id: 'cfg-01', key: 'app_name', value: '生命链', group: '基本设置', description: '应用名称', updatedAt: now },
  { id: 'cfg-02', key: 'max_upload_size', value: '10485760', group: '基本设置', description: '最大上传文件大小（字节）', updatedAt: now },
  { id: 'cfg-03', key: 'llm_model', value: 'gpt-4', group: 'AI配置', description: '默认LLM模型', updatedAt: now },
  { id: 'cfg-04', key: 'llm_temperature', value: '0.7', group: 'AI配置', description: 'LLM温度参数', updatedAt: now },
  { id: 'cfg-05', key: 'llm_max_tokens', value: '2000', group: 'AI配置', description: '最大生成Token数', updatedAt: now },
  { id: 'cfg-06', key: 'jwt_expiry', value: '7200', group: '安全设置', description: 'JWT过期时间（秒）', updatedAt: now },
  { id: 'cfg-07', key: 'login_max_attempts', value: '5', group: '安全设置', description: '最大登录尝试次数', updatedAt: now },
  { id: 'cfg-08', key: 'memory_max_per_day', value: '50', group: '限制设置', description: '每日最大记忆采集数', updatedAt: now },
  { id: 'cfg-09', key: 'chat_context_length', value: '10', group: 'AI配置', description: '对话上下文轮数', updatedAt: now },
  { id: 'cfg-10', key: 'content_review_enabled', value: 'true', group: '安全设置', description: '是否开启内容审核', updatedAt: now },
]

export const mockSystemMonitor: ISystemMonitor = {
  services: [
    { name: 'API 网关', status: 'healthy', uptime: '15d 8h', cpu: 23, memory: 45, responseTime: 12 },
    { name: '用户服务', status: 'healthy', uptime: '15d 8h', cpu: 18, memory: 38, responseTime: 8 },
    { name: '记忆服务', status: 'healthy', uptime: '15d 8h', cpu: 35, memory: 52, responseTime: 15 },
    { name: '对话服务', status: 'degraded', uptime: '2d 4h', cpu: 67, memory: 71, responseTime: 250 },
    { name: 'PostgreSQL', status: 'healthy', uptime: '30d 2h', cpu: 12, memory: 60, responseTime: 3 },
    { name: 'Redis', status: 'healthy', uptime: '30d 2h', cpu: 5, memory: 25, responseTime: 1 },
  ],
  alerts: [
    { id: 'alert-1', level: 'warning', message: '对话服务响应时间偏高', service: '对话服务', createdAt: now, resolved: false },
    { id: 'alert-2', level: 'info', message: '数据库备份完成', service: 'PostgreSQL', createdAt: now, resolved: true },
    { id: 'alert-3', level: 'critical', message: 'LLM API 调用限流', service: '对话服务', createdAt: new Date(Date.now() - 3600000).toISOString(), resolved: true },
  ],
}

export const mockOperationLogs: IOperationLog[] = Array.from({ length: 50 }, (_, i) => ({
  id: `log-${String(i + 1).padStart(3, '0')}`,
  userId: `user-${String((i % 5) + 1).padStart(3, '0')}`,
  username: ['admin', '张三', '李四', '王五', '赵六'][i % 5],
  action: ['登录', '创建用户', '删除记忆', '修改配置', '审核内容', '导出数据'][i % 6],
  resource: ['auth', 'users', 'memories', 'system', 'content', 'export'][i % 6],
  detail: [
    '管理员登录系统',
    '创建了新用户 user_123',
    '删除了记忆 memory-056',
    '修改了系统配置 llm_model',
    '审核通过内容 content-089',
    '导出了用户数据报表',
  ][i % 6],
  ip: `192.168.1.${(i % 255) + 1}`,
  createdAt: new Date(Date.now() - i * 1800000).toISOString(),
}))

export const mockRoles: IRole[] = [
  { id: 'role-01', name: '超级管理员', description: '拥有系统所有权限', permissions: ['*'], userCount: 2, createdAt: now },
  { id: 'role-02', name: '运营管理员', description: '用户管理、内容管理权限', permissions: ['user:read', 'user:write', 'content:read', 'content:write', 'memory:read'], userCount: 5, createdAt: now },
  { id: 'role-03', name: '内容审核员', description: '内容审核权限', permissions: ['content:read', 'content:review', 'memory:read'], userCount: 8, createdAt: now },
  { id: 'role-04', name: '数据分析师', description: '数据查看和导出权限', permissions: ['dashboard:read', 'user:read', 'memory:read', 'export:write'], userCount: 3, createdAt: now },
]
