import type { IUserDetail } from '@lifechain/shared'

const now = new Date().toISOString()

export const mockUsers: IUserDetail[] = Array.from({ length: 35 }, (_, i) => {
  const id = `user-${String(i + 1).padStart(3, '0')}`
  const statuses = ['active', 'active', 'active', 'suspended', 'deleted'] as const
  const roles = ['user', 'user', 'user', 'admin', 'auditor'] as const
  const genders = ['male', 'female', 'other'] as const
  const names = [
    '张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十',
    '郑雅', '冯涛', '陈慧', '褚玲', '卫东', '蒋明', '沈丽', '韩飞',
    '杨洋', '朱峰', '秦刚', '尤敏', '许宁', '何华', '吕燕', '施磊',
    '张晓', '林默', '宋文', '马超', '黄晓', '梁思', '曹雪', '罗平',
    '高远', '徐静', '谢芳',
  ]

  const daysAgo = Math.floor(Math.random() * 180)
  const createdAt = new Date(Date.now() - daysAgo * 86400000).toISOString()

  return {
    id,
    email: `user${i + 1}@lifechain.com`,
    phone: `138${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
    username: `user_${i + 1}`,
    nickname: names[i % names.length],
    avatar: undefined,
    birthDate: `${1970 + Math.floor(Math.random() * 40)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    gender: genders[i % genders.length],
    status: statuses[i % statuses.length],
    role: roles[i % roles.length],
    memoryCount: Math.floor(Math.random() * 200),
    chatSessionCount: Math.floor(Math.random() * 50),
    lastActiveAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 86400000).toISOString(),
    personality: i % 3 === 0 ? undefined : {
      id: `pers-${id}`,
      name: '小链',
      relationship: 'friend',
    },
    createdAt,
    updatedAt: now,
    deletedAt: null,
  }
})
