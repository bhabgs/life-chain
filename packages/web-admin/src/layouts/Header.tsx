import { Dropdown, Avatar, Space, theme } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useAppStore } from '@/stores/app.store'
import { useAuth } from '@/hooks/useAuth'

export default function Header() {
  const { token } = theme.useToken()
  const { sidebarCollapsed, toggleSidebar } = useAppStore()
  const { user, logout } = useAuth()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: 64,
        background: token.colorBgContainer,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <div
        onClick={toggleSidebar}
        style={{ fontSize: 18, cursor: 'pointer', color: token.colorText }}
      >
        {sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>

      <Dropdown
        menu={{
          items: [
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: '退出登录',
              onClick: logout,
            },
          ],
        }}
        placement="bottomRight"
      >
        <Space style={{ cursor: 'pointer' }}>
          <Avatar size="small" icon={<UserOutlined />} src={user?.avatar} />
          <span>{user?.nickname || user?.username || '管理员'}</span>
        </Space>
      </Dropdown>
    </div>
  )
}
