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
        key: '/users',
        icon: <UserOutlined />,
        label: '用户管理',
      },
      {
        key: 'personality',
        icon: <SmileOutlined />,
        label: '数字人管理',
        children: [
          { key: '/personality/templates', label: '人格模板' },
        ],
      },
      {
        key: 'memory',
        icon: <BookOutlined />,
        label: '记忆管理',
        children: [
          { key: '/memories', label: '记忆数据' },
          { key: '/memories/stats', label: '记忆统计' },
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
        key: 'permission',
        icon: <SafetyOutlined />,
        label: '权限安全',
        children: [
          { key: '/permission/roles', label: '角色管理' },
          { key: '/permission/operation-log', label: '操作日志' },
        ],
      },
      {
        key: 'system',
        icon: <SettingOutlined />,
        label: '系统管理',
        children: [
          { key: '/system/config', label: '系统配置' },
          { key: '/system/monitor', label: '系统监控' },
        ],
      },
      {
        key: '/support',
        icon: <CustomerServiceOutlined />,
        label: '客服支持',
      },
    ],
    [],
  )

  const selectedKeys = useMemo(() => {
    const path = location.pathname
    // 精确匹配或前缀匹配
    if (path.startsWith('/users/')) return ['/users']
    if (path.startsWith('/memories/stats')) return ['/memories/stats']
    if (path.startsWith('/memories/')) return ['/memories']
    if (path.startsWith('/personality/templates')) return ['/personality/templates']
    return [path]
  }, [location.pathname])

  const openKeys = useMemo(() => {
    const path = location.pathname
    if (path.startsWith('/personality')) return ['personality']
    if (path.startsWith('/memories')) return ['memory']
    if (path.startsWith('/permission')) return ['permission']
    if (path.startsWith('/system')) return ['system']
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
