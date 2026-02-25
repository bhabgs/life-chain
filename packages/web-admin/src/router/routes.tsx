import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import AuthGuard from './AuthGuard'

const MainLayout = lazy(() => import('@/layouts/MainLayout'))
const LoginPage = lazy(() => import('@/pages/login'))
const DashboardPage = lazy(() => import('@/pages/dashboard'))
const UserListPage = lazy(() => import('@/pages/user/list'))
const UserDetailPage = lazy(() => import('@/pages/user/detail'))
const PersonalityTemplatesPage = lazy(() => import('@/pages/personality/templates'))
const PersonalityTemplateEditorPage = lazy(() => import('@/pages/personality/template-editor'))
const MemoryListPage = lazy(() => import('@/pages/memory/list'))
const MemoryDetailPage = lazy(() => import('@/pages/memory/detail'))
const MemoryStatsPage = lazy(() => import('@/pages/memory/stats'))
const EmotionPage = lazy(() => import('@/pages/emotion'))
const ContentPage = lazy(() => import('@/pages/content'))
const RolesPage = lazy(() => import('@/pages/permission/roles'))
const LogsPage = lazy(() => import('@/pages/permission/logs'))
const SystemConfigPage = lazy(() => import('@/pages/system/config'))
const SystemMonitorPage = lazy(() => import('@/pages/system/monitor'))
const SupportPage = lazy(() => import('@/pages/support'))

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'users', element: <UserListPage /> },
      { path: 'users/:id', element: <UserDetailPage /> },
      { path: 'personality/templates', element: <PersonalityTemplatesPage /> },
      { path: 'personality/templates/new', element: <PersonalityTemplateEditorPage /> },
      { path: 'personality/templates/:id/edit', element: <PersonalityTemplateEditorPage /> },
      { path: 'memories', element: <MemoryListPage /> },
      { path: 'memories/:id', element: <MemoryDetailPage /> },
      { path: 'memories/stats', element: <MemoryStatsPage /> },
      { path: 'emotion', element: <EmotionPage /> },
      { path: 'content', element: <ContentPage /> },
      { path: 'permission/roles', element: <RolesPage /> },
      { path: 'permission/logs', element: <LogsPage /> },
      { path: 'system/config', element: <SystemConfigPage /> },
      { path: 'system/monitor', element: <SystemMonitorPage /> },
      { path: 'support', element: <SupportPage /> },
    ],
  },
]
