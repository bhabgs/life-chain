import { Tabs } from 'antd'
import PageContainer from '@/components/common/PageContainer'
import UserBehavior from './components/UserBehavior'
import MemoryAnalysis from './components/MemoryAnalysis'
import EmotionAnalysis from './components/EmotionAnalysis'
import ReportExport from './components/ReportExport'

export default function AnalysisPage() {
  return (
    <PageContainer title="运营与分析">
      <Tabs
        items={[
          { key: 'user', label: '用户行为分析', children: <UserBehavior /> },
          { key: 'memory', label: '记忆数据分析', children: <MemoryAnalysis /> },
          { key: 'emotion', label: '情绪健康分析', children: <EmotionAnalysis /> },
          { key: 'export', label: '报表导出', children: <ReportExport /> },
        ]}
      />
    </PageContainer>
  )
}
