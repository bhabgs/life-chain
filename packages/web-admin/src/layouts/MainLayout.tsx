import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin, theme } from 'antd'
import { useAppStore } from '@/stores/app.store'
import Sidebar from './Sidebar'
import Header from './Header'

const { Sider, Content } = Layout

export default function MainLayout() {
  const { token } = theme.useToken()
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={sidebarCollapsed}
        width={240}
        style={{
          background: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: sidebarCollapsed ? 16 : 20,
              fontWeight: 600,
              color: '#FF8A5B',
              whiteSpace: 'nowrap',
            }}
          >
            {sidebarCollapsed ? 'LC' : '生命链管理后台'}
          </h1>
        </div>
        <Sidebar />
      </Sider>

      <Layout>
        <Header />
        <Content
          style={{
            margin: 24,
            padding: 24,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
            minHeight: 280,
            overflow: 'auto',
          }}
        >
          <Suspense
            fallback={
              <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
                <Spin size="large" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}
