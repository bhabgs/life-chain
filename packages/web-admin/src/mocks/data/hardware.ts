export const mockDeviceModels = [
  { id: 'dm-001', name: 'LifeChain Mini', type: '桌面陪伴', stage: '童年/青少年', specs: '7寸屏幕，8GB RAM，WiFi/BLE', status: '在售' },
  { id: 'dm-002', name: 'LifeChain Pod', type: '便携终端', stage: '青年/中年', specs: '3.5寸触屏，语音交互，4G/WiFi', status: '在售' },
  { id: 'dm-003', name: 'LifeChain Frame', type: '智能相框', stage: '老年', specs: '10寸高清屏，语音唤醒，WiFi', status: '在售' },
  { id: 'dm-004', name: 'LifeChain Band', type: '健康手环', stage: '全年龄', specs: '心率/睡眠监测，BLE 5.0', status: '测试中' },
  { id: 'dm-005', name: 'LifeChain Hub', type: '家庭中枢', stage: '全家庭', specs: 'Zigbee网关，多设备联动', status: '停产' },
]

export const mockBindings = [
  { id: 'bd-001', userName: '张三', modelName: 'LifeChain Mini', deviceId: 'LC-M-202601001', boundAt: '2026-01-15 10:30', status: '已绑定' },
  { id: 'bd-002', userName: '李四', modelName: 'LifeChain Pod', deviceId: 'LC-P-202601012', boundAt: '2026-01-20 14:00', status: '已绑定' },
  { id: 'bd-003', userName: '王五', modelName: 'LifeChain Frame', deviceId: 'LC-F-202602005', boundAt: '2026-02-05 09:15', status: '已绑定' },
  { id: 'bd-004', userName: '赵六', modelName: 'LifeChain Mini', deviceId: 'LC-M-202602008', boundAt: '2026-02-08 16:45', status: '已解绑' },
]

export const mockMonitorDevices = [
  { id: 'md-001', name: 'LC-M-202601001', userName: '张三', online: true, health: 95, lastSeen: '2026-02-25 09:30' },
  { id: 'md-002', name: 'LC-P-202601012', userName: '李四', online: true, health: 88, lastSeen: '2026-02-25 09:28' },
  { id: 'md-003', name: 'LC-F-202602005', userName: '王五', online: false, health: 72, lastSeen: '2026-02-24 22:15' },
  { id: 'md-004', name: 'LC-M-202602015', userName: '孙七', online: true, health: 96, lastSeen: '2026-02-25 09:29' },
  { id: 'md-005', name: 'LC-P-202602020', userName: '周八', online: true, health: 91, lastSeen: '2026-02-25 09:25' },
  { id: 'md-006', name: 'LC-F-202602022', userName: '吴九', online: false, health: 45, lastSeen: '2026-02-23 18:00' },
]

export const mockCacheConfig = [
  { deviceName: 'LC-M-202601001', totalSize: '16GB', usedSize: '9.2GB', usagePercent: 57, lastSync: '2026-02-25 09:00' },
  { deviceName: 'LC-P-202601012', totalSize: '8GB', usedSize: '6.1GB', usagePercent: 76, lastSync: '2026-02-25 08:45' },
  { deviceName: 'LC-F-202602005', totalSize: '32GB', usedSize: '12.8GB', usagePercent: 40, lastSync: '2026-02-24 20:00' },
  { deviceName: 'LC-P-202602020', totalSize: '8GB', usedSize: '7.5GB', usagePercent: 94, lastSync: '2026-02-25 09:15' },
]

export const mockFirmwareVersions = [
  { version: '2.4.1', targetModel: 'LifeChain Mini', releasedAt: '2026-02-20', changelog: '修复蓝牙连接断开问题，优化语音唤醒灵敏度', status: '已发布', updateCount: 234 },
  { version: '2.4.0', targetModel: 'LifeChain Mini', releasedAt: '2026-02-10', changelog: '新增离线对话缓存功能', status: '已发布', updateCount: 312 },
  { version: '1.8.0', targetModel: 'LifeChain Pod', releasedAt: '2026-02-18', changelog: '优化电池续航，新增健康数据同步', status: '已发布', updateCount: 156 },
  { version: '3.0.0-beta', targetModel: 'LifeChain Frame', releasedAt: '2026-02-24', changelog: '全新 UI 界面，支持家庭相册轮播', status: '测试中', updateCount: 12 },
  { version: '1.2.0', targetModel: 'LifeChain Band', releasedAt: '2026-02-15', changelog: '心率监测算法升级', status: '已发布', updateCount: 45 },
]
