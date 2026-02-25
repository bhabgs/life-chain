import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import AuthGuard from './AuthGuard'

// 布局
const MainLayout = lazy(() => import('@/layouts/MainLayout'))
const LoginPage = lazy(() => import('@/pages/login'))

// 仪表盘
const DashboardPage = lazy(() => import('@/pages/dashboard'))

// 用户管理
const UserListPage = lazy(() => import('@/pages/user/list'))
const UserDetailPage = lazy(() => import('@/pages/user/detail'))
const UserSegmentsPage = lazy(() => import('@/pages/user/segments'))
const UserReviewPage = lazy(() => import('@/pages/user/review'))
const UserBehaviorPage = lazy(() => import('@/pages/user/behavior'))

// 数字人格管理
const PersonalityTemplatesPage = lazy(() => import('@/pages/personality/templates'))
const PersonalityTemplateEditorPage = lazy(() => import('@/pages/personality/template-editor'))
const PersonalityAvatarPage = lazy(() => import('@/pages/personality/avatar'))
const PersonalityDialoguePage = lazy(() => import('@/pages/personality/dialogue-strategy'))
const PersonalityNamingPage = lazy(() => import('@/pages/personality/naming'))

// 记忆系统管理
const MemoryListPage = lazy(() => import('@/pages/memory/list'))
const MemoryDetailPage = lazy(() => import('@/pages/memory/detail'))
const MemoryStatsPage = lazy(() => import('@/pages/memory/stats'))
const MemoryStructuringPage = lazy(() => import('@/pages/memory/structuring'))
const MemoryReviewTemplatePage = lazy(() => import('@/pages/memory/review-template'))
const MemoryStoragePage = lazy(() => import('@/pages/memory/storage'))

// 情绪与健康
const EmotionPage = lazy(() => import('@/pages/emotion'))

// 内容管理
const ContentPage = lazy(() => import('@/pages/content'))

// 阶段化陪伴
const StagePage = lazy(() => import('@/pages/stage'))

// 数字资产与传承
const AssetPage = lazy(() => import('@/pages/asset'))

// 硬件设备管理
const HardwarePage = lazy(() => import('@/pages/hardware'))

// 权限与安全
const RolesPage = lazy(() => import('@/pages/permission/roles'))
const LogsPage = lazy(() => import('@/pages/permission/operation-log'))
const AuditPage = lazy(() => import('@/pages/permission/audit'))
const CompliancePage = lazy(() => import('@/pages/permission/compliance'))

// 系统管理
const SystemConfigPage = lazy(() => import('@/pages/system/config'))
const SystemMonitorPage = lazy(() => import('@/pages/system/monitor'))
const AIModelPage = lazy(() => import('@/pages/system/ai-model'))
const ThirdPartyPage = lazy(() => import('@/pages/system/third-party'))
const MaintenancePage = lazy(() => import('@/pages/system/maintenance'))

// 运营与分析
const AnalysisPage = lazy(() => import('@/pages/analysis'))

// 客服与支持
const SupportPage = lazy(() => import('@/pages/support'))
const InterventionPage = lazy(() => import('@/pages/support/intervention'))
const FAQPage = lazy(() => import('@/pages/support/faq'))

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

      // 仪表盘
      { path: 'dashboard', element: <DashboardPage /> },

      // 用户管理
      { path: 'users', element: <UserListPage /> },
      { path: 'users/segments', element: <UserSegmentsPage /> },
      { path: 'users/review', element: <UserReviewPage /> },
      { path: 'users/behavior', element: <UserBehaviorPage /> },
      { path: 'users/:id', element: <UserDetailPage /> },

      // 数字人格管理
      { path: 'personality/templates', element: <PersonalityTemplatesPage /> },
      { path: 'personality/templates/new', element: <PersonalityTemplateEditorPage /> },
      { path: 'personality/templates/:id/edit', element: <PersonalityTemplateEditorPage /> },
      { path: 'personality/avatar', element: <PersonalityAvatarPage /> },
      { path: 'personality/dialogue-strategy', element: <PersonalityDialoguePage /> },
      { path: 'personality/naming', element: <PersonalityNamingPage /> },

      // 记忆系统管理
      { path: 'memories', element: <MemoryListPage /> },
      { path: 'memories/stats', element: <MemoryStatsPage /> },
      { path: 'memories/structuring', element: <MemoryStructuringPage /> },
      { path: 'memories/review-template', element: <MemoryReviewTemplatePage /> },
      { path: 'memories/storage', element: <MemoryStoragePage /> },
      { path: 'memories/:id', element: <MemoryDetailPage /> },

      // 情绪与健康
      { path: 'emotion', element: <EmotionPage /> },

      // 内容管理
      { path: 'content', element: <ContentPage /> },

      // 阶段化陪伴
      { path: 'stage', element: <StagePage /> },

      // 数字资产与传承
      { path: 'asset', element: <AssetPage /> },

      // 硬件设备管理
      { path: 'hardware', element: <HardwarePage /> },

      // 权限与安全
      { path: 'permission/roles', element: <RolesPage /> },
      { path: 'permission/operation-log', element: <LogsPage /> },
      { path: 'permission/audit', element: <AuditPage /> },
      { path: 'permission/compliance', element: <CompliancePage /> },

      // 系统管理
      { path: 'system/config', element: <SystemConfigPage /> },
      { path: 'system/monitor', element: <SystemMonitorPage /> },
      { path: 'system/ai-model', element: <AIModelPage /> },
      { path: 'system/third-party', element: <ThirdPartyPage /> },
      { path: 'system/maintenance', element: <MaintenancePage /> },

      // 运营与分析
      { path: 'analysis', element: <AnalysisPage /> },

      // 客服与支持
      { path: 'support', element: <SupportPage /> },
      { path: 'support/intervention', element: <InterventionPage /> },
      { path: 'support/faq', element: <FAQPage /> },
    ],
  },
]
