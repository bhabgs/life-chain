import { Table, Tag, Card, Row, Col, Statistic, Progress, Spin } from 'antd'
import { RobotOutlined, ThunderboltOutlined, CloudServerOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import PageContainer from '@/components/common/PageContainer'
import { systemService } from '@/services/system.service'

interface IAIModel {
  id: string
  name: string
  type: string
  version: string
  provider: string
  status: string
  accuracy: number
  latency: number
  dailyCalls: number
  lastUpdated: string
}

export default function AIModelPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['ai-models'],
    queryFn: () => systemService.getAIModels(),
  })

  const models = (data?.data ?? []) as IAIModel[]
  const activeCount = models.filter((m) => m.status === '运行中').length

  const columns: ColumnsType<IAIModel> = [
    { title: '模型名称', dataIndex: 'name', key: 'name' },
    { title: '类型', dataIndex: 'type', key: 'type', width: 100 },
    { title: '版本', dataIndex: 'version', key: 'version', width: 80 },
    { title: '提供商', dataIndex: 'provider', key: 'provider', width: 100 },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 90,
      render: (v: string) => <Tag color={v === '运行中' ? 'green' : v === '停用' ? 'default' : 'orange'}>{v}</Tag>,
    },
    {
      title: '准确率',
      dataIndex: 'accuracy',
      key: 'accuracy',
      width: 130,
      render: (v: number) => <Progress percent={v} size="small" strokeColor={v > 90 ? '#52c41a' : '#faad14'} />,
    },
    { title: '平均延迟', dataIndex: 'latency', key: 'latency', width: 100, render: (v: number) => `${v}ms` },
    { title: '日调用量', dataIndex: 'dailyCalls', key: 'dailyCalls', width: 100 },
    { title: '最后更新', dataIndex: 'lastUpdated', key: 'lastUpdated' },
  ]

  return (
    <PageContainer title="AI模型管理">
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card><Statistic title="模型总数" value={models.length} prefix={<RobotOutlined />} /></Card>
        </Col>
        <Col span={8}>
          <Card><Statistic title="运行中" value={activeCount} prefix={<ThunderboltOutlined />} valueStyle={{ color: '#52c41a' }} /></Card>
        </Col>
        <Col span={8}>
          <Card><Statistic title="日调用总量" value={models.reduce((s, m) => s + m.dailyCalls, 0)} prefix={<CloudServerOutlined />} /></Card>
        </Col>
      </Row>

      <Spin spinning={isLoading}>
        <Table<IAIModel> rowKey="id" columns={columns} dataSource={models} pagination={false} />
      </Spin>
    </PageContainer>
  )
}
