export const mockHeirs = [
  { id: 'heir-001', name: '张小明', relation: '子女', userId: 'u-002', ownerName: '张三', verificationStatus: '已验证', accessLevel: '完整访问', createdAt: '2026-01-15' },
  { id: 'heir-002', name: '李婷婷', relation: '配偶', userId: 'u-003', ownerName: '李四', verificationStatus: '已验证', accessLevel: '完整访问', createdAt: '2026-01-20' },
  { id: 'heir-003', name: '王磊', relation: '子女', userId: 'u-004', ownerName: '王五', verificationStatus: '待验证', accessLevel: '部分访问', createdAt: '2026-02-01' },
  { id: 'heir-004', name: '赵琳', relation: '兄弟姐妹', userId: 'u-005', ownerName: '赵六', verificationStatus: '已验证', accessLevel: '仅查看', createdAt: '2026-02-10' },
  { id: 'heir-005', name: '孙浩', relation: '子女', userId: 'u-006', ownerName: '孙七', verificationStatus: '验证失败', accessLevel: '仅查看', createdAt: '2026-02-15' },
]

export const mockLegacyExports = [
  { id: 'exp-001', userName: '张三', heirName: '张小明', format: 'JSON', status: '已完成', requestedAt: '2026-02-20 14:30', completedAt: '2026-02-20 14:35', fileSize: '256MB' },
  { id: 'exp-002', userName: '李四', heirName: '李婷婷', format: 'PDF', status: '处理中', requestedAt: '2026-02-24 10:00', completedAt: null, fileSize: null },
  { id: 'exp-003', userName: '王五', heirName: '王磊', format: 'JSON', status: '待处理', requestedAt: '2026-02-25 08:00', completedAt: null, fileSize: null },
  { id: 'exp-004', userName: '赵六', heirName: '赵琳', format: 'ZIP', status: '已完成', requestedAt: '2026-02-18 16:00', completedAt: '2026-02-18 16:12', fileSize: '512MB' },
  { id: 'exp-005', userName: '周八', heirName: '周小周', format: 'PDF', status: '失败', requestedAt: '2026-02-22 09:30', completedAt: null, fileSize: null },
]

export const mockFreezeVersions = [
  { id: 'frz-001', userName: '张三', version: '3.2.1', frozenAt: '2026-02-20', size: '1.2GB', status: '有效', description: '包含完整人格模型和对话历史' },
  { id: 'frz-002', userName: '李四', version: '2.1.0', frozenAt: '2026-01-15', size: '890MB', status: '有效', description: '年度人格快照' },
  { id: 'frz-003', userName: '王五', version: '1.5.0', frozenAt: '2025-12-01', size: '650MB', status: '已过期', description: '初始版本备份' },
  { id: 'frz-004', userName: '赵六', version: '4.0.0', frozenAt: '2026-02-24', size: '1.5GB', status: '有效', description: '包含记忆索引和情绪模型' },
]

export const mockFamilyNetworks = [
  { id: 'fam-001', familyName: '张家', memberCount: 12, createdAt: '2025-10-01', status: '活跃' },
  { id: 'fam-002', familyName: '李家', memberCount: 8, createdAt: '2025-11-15', status: '活跃' },
  { id: 'fam-003', familyName: '王家', memberCount: 5, createdAt: '2026-01-20', status: '活跃' },
]

export const mockMemorialRequests = [
  { id: 'mem-001', userName: '张三(已故)', familyName: '张家', type: '数字纪念馆', status: '已通过', requestedAt: '2026-02-20' },
  { id: 'mem-002', userName: '周老先生', familyName: '周家', type: '人格访问', status: '待审核', requestedAt: '2026-02-24' },
  { id: 'mem-003', userName: '孙奶奶', familyName: '孙家', type: '数字纪念馆', status: '已拒绝', requestedAt: '2026-02-22' },
]

export const mockMemorialConfigs = [
  { id: 'mc-001', userName: '张三', mode: '永久纪念', accessType: '仅继承人', enabled: true, message: '希望孩子们记住我的笑容' },
  { id: 'mc-002', userName: '李四', mode: '定期回忆', accessType: '公开', enabled: true, message: '我的故事属于每一个人' },
  { id: 'mc-003', userName: '王五', mode: '永久纪念', accessType: '仅继承人', enabled: false, message: '' },
]
