import { useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import {
  DashboardOutlined,
  UserOutlined,
  SmileOutlined,
  BookOutlined,
  HeartOutlined,
  FileTextOutlined,
  SafetyOutlined,
  SettingOutlined,
  CustomerServiceOutlined,
  ClockCircleOutlined,
  GiftOutlined,
  LaptopOutlined,
  BarChartOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        key: '/dashboard',
        icon: <DashboardOutlined />,
        label: '仪表盘',
      },
      {
        key: 'users',
        icon: <UserOutlined />,
        label: '用户管理',
        children: [
          { key: '/users', label: '用户列表' },
          { key: '/users/segments', label: '用户分组' },
          { key: '/users/review', label: '账号审核' },
          { key: '/users/behavior', label: '行为分析' },
        ],
      },
      {
        key: 'personality',
        icon: <SmileOutlined />,
        label: '数字人管理',
        children: [
          { key: '/personality/templates', label: '人格模板' },
          { key: '/personality/avatar', label: '形象资源' },
          { key: '/personality/dialogue-strategy', label: '对话策略' },
          { key: '/personality/naming', label: '命名体系' },
        ],
      },
      {
        key: 'memory',
        icon: <BookOutlined />,
        label: '记忆管理',
        children: [
          { key: '/memories', label: '记忆数据' },
          { key: '/memories/stats', label: '记忆统计' },
          { key: '/memories/structuring', label: '结构化规则' },
          { key: '/memories/review-template', label: '回顾模板' },
          { key: '/memories/storage', label: '存储管理' },
        ],
      },
      {
        key: '/emotion',
        icon: <HeartOutlined />,
        label: '情绪健康',
      },
      {
        key: '/content',
        icon: <FileTextOutlined />,
        label: '内容管理',
      },
      {
        key: '/stage',
        icon: <ClockCircleOutlined />,
        label: '阶段陪伴',
      },
      {
        key: '/asset',
        icon: <GiftOutlined />,
        label: '数字资产',
      },
      {
        key: '/hardware',
        icon: <LaptopOutlined />,
        label: '硬件设备',
      },
      {
        key: 'permission',
        icon: <SafetyOutlined />,
        label: '权限安全',
        children: [
          { key: '/permission/roles', label: '角色管理' },
          { key: '/permission/operation-log', label: '操作日志' },
          { key: '/permission/audit', label: '安全审计' },
          { key: '/permission/compliance', label: '隐私合规' },
        ],
      },
      {
        key: 'system',
        icon: <SettingOutlined />,
        label: '系统管理',
        children: [
          { key: '/system/config', label: '系统配置' },
          { key: '/system/monitor', label: '系统监控' },
          { key: '/system/ai-model', label: 'AI模型管理' },
          { key: '/system/third-party', label: '第三方服务' },
          { key: '/system/maintenance', label: '系统维护' },
        ],
      },
      {
        key: '/analysis',
        icon: <BarChartOutlined />,
        label: '运营分析',
      },
      {
        key: 'support',
        icon: <CustomerServiceOutlined />,
        label: '客服支持',
        children: [
          { key: '/support', label: '工单与反馈' },
          { key: '/support/intervention', label: '人工介入' },
          { key: '/support/faq', label: 'FAQ管理' },
        ],
      },
    ],
    [],
  )

  const selectedKeys = useMemo(() => {
    const path = location.pathname
    // 精确匹配子页面
    if (path === '/users/segments') return ['/users/segments']
    if (path === '/users/review') return ['/users/review']
    if (path === '/users/behavior') return ['/users/behavior']
    if (path.startsWith('/users/')) return ['/users']
    if (path === '/users') return ['/users']
    if (path === '/memories/stats') return ['/memories/stats']
    if (path === '/memories/structuring') return ['/memories/structuring']
    if (path === '/memories/review-template') return ['/memories/review-template']
    if (path === '/memories/storage') return ['/memories/storage']
    if (path.startsWith('/memories/')) return ['/memories']
    if (path.startsWith('/personality/')) {
      if (path.startsWith('/personality/templates')) return ['/personality/templates']
      return [path]
    }
    if (path.startsWith('/permission/')) return [path]
    if (path.startsWith('/system/')) return [path]
    if (path.startsWith('/support/')) return [path]
    return [path]
  }, [location.pathname])

  const openKeys = useMemo(() => {
    const path = location.pathname
    if (path.startsWith('/users')) return ['users']
    if (path.startsWith('/personality')) return ['personality']
    if (path.startsWith('/memories')) return ['memory']
    if (path.startsWith('/permission')) return ['permission']
    if (path.startsWith('/system')) return ['system']
    if (path.startsWith('/support')) return ['support']
    return []
  }, [location.pathname])

  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKeys}
      defaultOpenKeys={openKeys}
      items={menuItems}
      onClick={({ key }) => navigate(key)}
      style={{ borderRight: 0 }}
    />
  )
}
