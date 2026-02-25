import { Tabs } from 'antd'
import PageContainer from '@/components/common/PageContainer'
import HeirManagement from './components/HeirManagement'
import LegacyExport from './components/LegacyExport'
import PersonalityFreeze from './components/PersonalityFreeze'
import FamilyNetwork from './components/FamilyNetwork'
import MemorialMode from './components/MemorialMode'

export default function AssetPage() {
  return (
    <PageContainer title="数字资产与传承管理">
      <Tabs
        items={[
          { key: 'heir', label: '继承人管理', children: <HeirManagement /> },
          { key: 'legacy', label: '遗产导出', children: <LegacyExport /> },
          { key: 'freeze', label: '人格冻结', children: <PersonalityFreeze /> },
          { key: 'family', label: '家族网络', children: <FamilyNetwork /> },
          { key: 'memorial', label: '纪念模式', children: <MemorialMode /> },
        ]}
      />
    </PageContainer>
  )
}
