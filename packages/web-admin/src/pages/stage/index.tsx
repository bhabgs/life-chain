import { Tabs } from 'antd'
import PageContainer from '@/components/common/PageContainer'
import ChildStage from './components/ChildStage'
import TeenStage from './components/TeenStage'
import YouthStage from './components/YouthStage'
import MiddleStage from './components/MiddleStage'
import SeniorStage from './components/SeniorStage'

export default function StagePage() {
  return (
    <PageContainer title="阶段功能配置">
      <Tabs
        items={[
          { key: 'childhood', label: '儿童阶段', children: <ChildStage /> },
          { key: 'adolescence', label: '青少年阶段', children: <TeenStage /> },
          { key: 'youth', label: '青年阶段', children: <YouthStage /> },
          { key: 'middle_age', label: '中年阶段', children: <MiddleStage /> },
          { key: 'old_age', label: '老年阶段', children: <SeniorStage /> },
        ]}
      />
    </PageContainer>
  )
}
