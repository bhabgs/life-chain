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

// ============ 安全审计事件 ============

export const mockSecurityAuditEvents = [
  { id: 'sec-001', type: '异常登录', level: 'warning', detail: '账号 admin 从异常 IP 203.0.113.42 登录', operator: 'admin', ip: '203.0.113.42', time: '2026-02-25 08:30:00', status: '已处理' },
  { id: 'sec-002', type: '权限变更', level: 'info', detail: '用户 张三 被授予"内容审核员"角色', operator: 'admin', ip: '192.168.1.100', time: '2026-02-25 07:15:00', status: '正常' },
  { id: 'sec-003', type: '数据导出', level: 'info', detail: '用户 李四 导出了 2000 条记忆数据', operator: '李四', ip: '192.168.1.105', time: '2026-02-24 16:40:00', status: '正常' },
  { id: 'sec-004', type: '暴力破解', level: 'critical', detail: '账号 test_user 在 5 分钟内登录失败 15 次', operator: 'test_user', ip: '198.51.100.23', time: '2026-02-24 14:20:00', status: '已封禁' },
  { id: 'sec-005', type: 'API 滥用', level: 'warning', detail: 'API Key xxx-abc 在 1 小时内请求 5000 次', operator: 'system', ip: '203.0.113.88', time: '2026-02-24 11:00:00', status: '已限流' },
  { id: 'sec-006', type: '敏感操作', level: 'info', detail: '管理员修改了 JWT 过期时间配置', operator: 'admin', ip: '192.168.1.100', time: '2026-02-23 17:30:00', status: '正常' },
  { id: 'sec-007', type: '数据泄露风险', level: 'critical', detail: '检测到未授权访问用户隐私数据', operator: 'unknown', ip: '198.51.100.99', time: '2026-02-23 09:15:00', status: '已处理' },
  { id: 'sec-008', type: '证书过期', level: 'warning', detail: 'SSL 证书将在 7 天后过期', operator: 'system', ip: '-', time: '2026-02-22 00:00:00', status: '处理中' },
]

// ============ 隐私与合规 ============

export const mockPrivacyPolicies = [
  { id: 'pp-001', name: '用户数据收集协议', version: 'v2.3', effectiveDate: '2026-01-01', status: '生效中', lastUpdated: '2025-12-20' },
  { id: 'pp-002', name: '记忆数据处理规范', version: 'v1.8', effectiveDate: '2026-01-15', status: '生效中', lastUpdated: '2026-01-10' },
  { id: 'pp-003', name: '第三方数据共享协议', version: 'v1.2', effectiveDate: '2025-10-01', status: '生效中', lastUpdated: '2025-09-25' },
  { id: 'pp-004', name: '未成年人保护条款', version: 'v3.0', effectiveDate: '2026-03-01', status: '待生效', lastUpdated: '2026-02-20' },
  { id: 'pp-005', name: '数字遗产传承协议', version: 'v1.0', effectiveDate: '2026-02-01', status: '生效中', lastUpdated: '2026-01-28' },
]

export const mockSensitiveDataStats = [
  { category: '身份信息', fieldCount: 5, recordCount: 3245, encrypted: true, lastScan: '2026-02-25 03:00' },
  { category: '联系方式', fieldCount: 3, recordCount: 3245, encrypted: true, lastScan: '2026-02-25 03:00' },
  { category: '位置信息', fieldCount: 2, recordCount: 12680, encrypted: false, lastScan: '2026-02-25 03:00' },
  { category: '健康数据', fieldCount: 4, recordCount: 8920, encrypted: true, lastScan: '2026-02-25 03:00' },
  { category: '情绪记录', fieldCount: 6, recordCount: 45230, encrypted: true, lastScan: '2026-02-25 03:00' },
  { category: '家族关系', fieldCount: 3, recordCount: 1890, encrypted: true, lastScan: '2026-02-25 03:00' },
]

export const mockDesensitizationRules = [
  { id: 'ds-001', field: '手机号', method: '中间4位替换*', pattern: '138****1234', enabled: true, updatedAt: now },
  { id: 'ds-002', field: '身份证号', method: '显示前3后4位', pattern: '110***********1234', enabled: true, updatedAt: now },
  { id: 'ds-003', field: '邮箱', method: '用户名部分替换', pattern: 'zh***@example.com', enabled: true, updatedAt: now },
  { id: 'ds-004', field: '姓名', method: '姓氏保留', pattern: '张**', enabled: false, updatedAt: now },
  { id: 'ds-005', field: '地址', method: '精确地址模糊', pattern: '北京市朝阳区***', enabled: true, updatedAt: now },
]

export const mockComplianceReports = [
  { id: 'cr-001', title: '2026年Q1数据合规审计', type: '季度审计', status: '审计中', auditor: '安全团队', date: '2026-02-25', findings: 3 },
  { id: 'cr-002', title: '2025年度隐私影响评估', type: '年度评估', status: '已完成', auditor: '第三方机构', date: '2026-01-15', findings: 7 },
  { id: 'cr-003', title: 'GDPR合规检查', type: '专项检查', status: '已完成', auditor: '法务部', date: '2025-12-10', findings: 2 },
  { id: 'cr-004', title: '未成年人保护合规', type: '专项检查', status: '已完成', auditor: '安全团队', date: '2025-11-20', findings: 5 },
]

// ============ AI模型管理 ============

export const mockAIModels = [
  { id: 'ai-001', name: 'GPT-4 Turbo', provider: 'OpenAI', type: '对话生成', version: '2024-01-25', status: '运行中', accuracy: 94.2, avgLatency: 850, dailyCalls: 12500, cost: 0.03 },
  { id: 'ai-002', name: '通义千问 2.5', provider: '阿里云', type: '对话生成', version: 'v2.5.0', status: '运行中', accuracy: 91.8, avgLatency: 620, dailyCalls: 8200, cost: 0.02 },
  { id: 'ai-003', name: '情绪识别模型', provider: '自研', type: '情绪分析', version: 'v3.1.2', status: '运行中', accuracy: 88.5, avgLatency: 95, dailyCalls: 45000, cost: 0.001 },
  { id: 'ai-004', name: 'Azure ASR', provider: 'Microsoft', type: '语音识别', version: 'v4.0', status: '运行中', accuracy: 96.3, avgLatency: 320, dailyCalls: 3400, cost: 0.015 },
  { id: 'ai-005', name: '记忆向量模型', provider: '自研', type: '向量检索', version: 'v1.5.0', status: '运行中', accuracy: 92.1, avgLatency: 45, dailyCalls: 28000, cost: 0.0005 },
  { id: 'ai-006', name: 'GPT-4o Mini', provider: 'OpenAI', type: '内容审核', version: '2024-07-18', status: '备用', accuracy: 89.7, avgLatency: 280, dailyCalls: 0, cost: 0.005 },
]

// ============ 第三方服务 ============

export const mockThirdPartyServices = [
  { id: 'tp-001', name: '阿里云 OSS', type: '对象存储', status: 'active', endpoint: 'oss-cn-beijing.aliyuncs.com', lastCheck: '2026-02-25 09:00', healthScore: 99 },
  { id: 'tp-002', name: 'Azure Speech', type: '语音识别', status: 'active', endpoint: 'eastasia.api.cognitive.microsoft.com', lastCheck: '2026-02-25 09:00', healthScore: 98 },
  { id: 'tp-003', name: '腾讯云 TTS', type: '语音合成', status: 'active', endpoint: 'tts.tencentcloudapi.com', lastCheck: '2026-02-25 09:00', healthScore: 97 },
  { id: 'tp-004', name: 'OpenAI API', type: 'LLM服务', status: 'active', endpoint: 'api.openai.com', lastCheck: '2026-02-25 09:00', healthScore: 95 },
  { id: 'tp-005', name: '极光推送', type: '消息推送', status: 'inactive', endpoint: 'api.jpush.cn', lastCheck: '2026-02-24 18:00', healthScore: 0 },
  { id: 'tp-006', name: '阿里云短信', type: '短信服务', status: 'active', endpoint: 'dysmsapi.aliyuncs.com', lastCheck: '2026-02-25 09:00', healthScore: 100 },
]

// ============ 系统维护 ============

export const mockSystemBackups = [
  { id: 'bk-sys-001', type: '全量备份', size: '45.2 GB', status: 'success', startTime: '2026-02-25 02:00', endTime: '2026-02-25 03:45', storagePath: '/backup/full/20260225' },
  { id: 'bk-sys-002', type: '增量备份', size: '2.3 GB', status: 'success', startTime: '2026-02-24 02:00', endTime: '2026-02-24 02:15', storagePath: '/backup/incr/20260224' },
  { id: 'bk-sys-003', type: '全量备份', size: '44.8 GB', status: 'success', startTime: '2026-02-23 02:00', endTime: '2026-02-23 03:40', storagePath: '/backup/full/20260223' },
  { id: 'bk-sys-004', type: '增量备份', size: '1.8 GB', status: 'failed', startTime: '2026-02-22 02:00', endTime: '2026-02-22 02:05', storagePath: '-' },
  { id: 'bk-sys-005', type: '全量备份', size: '44.1 GB', status: 'success', startTime: '2026-02-21 02:00', endTime: '2026-02-21 03:35', storagePath: '/backup/full/20260221' },
]

export const mockLogStats = {
  totalLogs: 1256780,
  todayLogs: 34560,
  errorRate: 0.23,
  storageUsed: '12.5 GB',
  topErrors: [
    { message: 'LLM API timeout', count: 156, lastOccurred: '2026-02-25 09:20' },
    { message: 'Database connection pool exhausted', count: 23, lastOccurred: '2026-02-25 08:45' },
    { message: 'Redis cache miss rate high', count: 89, lastOccurred: '2026-02-25 09:15' },
    { message: 'Memory service OOM warning', count: 12, lastOccurred: '2026-02-24 22:30' },
    { message: 'File upload size exceeded', count: 45, lastOccurred: '2026-02-25 09:10' },
  ],
}

export const mockPerformanceStats = [
  { service: 'API 网关', cpu: 23, memory: 45, disk: 30, qps: 1250, p95Latency: 12, p99Latency: 25 },
  { service: '用户服务', cpu: 18, memory: 38, disk: 15, qps: 890, p95Latency: 8, p99Latency: 18 },
  { service: '记忆服务', cpu: 35, memory: 52, disk: 65, qps: 650, p95Latency: 15, p99Latency: 35 },
  { service: '对话服务', cpu: 67, memory: 71, disk: 20, qps: 420, p95Latency: 250, p99Latency: 800 },
  { service: 'PostgreSQL', cpu: 42, memory: 60, disk: 78, qps: 2800, p95Latency: 3, p99Latency: 8 },
  { service: 'Redis', cpu: 5, memory: 25, disk: 10, qps: 15000, p95Latency: 1, p99Latency: 2 },
  { service: 'Milvus', cpu: 28, memory: 55, disk: 45, qps: 380, p95Latency: 12, p99Latency: 30 },
]
