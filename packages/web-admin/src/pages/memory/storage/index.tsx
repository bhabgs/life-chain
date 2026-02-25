import { Row, Col, Card, Progress, Table, Switch, Statistic, Spin, Tag, App } from 'antd'
import { DatabaseOutlined, HddOutlined } from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import ReactECharts from 'echarts-for-react'
import type { ColumnsType } from 'antd/es/table'
import PageContainer from '@/components/common/PageContainer'
import { memoryService } from '@/services/memory.service'

interface IBackupRecord {
  id: string
  time: string
  size: string
  status: string
}

interface IArchiveRule {
  id: string
  name: string
  condition: string
  archiveDays: number
  enabled: boolean
}

interface IStorageInfo {
  totalCapacity: string
  usedCapacity: string
  usagePercent: number
  growthTrend: number
  distribution: Array<{ type: string; size: number; percent: number }>
  backupStrategy: {
    enabled: boolean
    frequency: string
    retentionDays: number
    storagePath: string
  }
  backupRecords: IBackupRecord[]
  archiveRules: IArchiveRule[]
}

export default function MemoryStoragePage() {
  const { message } = App.useApp()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['memory-storage'],
    queryFn: () => memoryService.getStorageInfo(),
  })

  const toggleArchiveMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      memoryService.updateArchiveRule(id, { enabled }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memory-storage'] })
    },
  })

  const toggleBackupMutation = useMutation({
    mutationFn: (enabled: boolean) => memoryService.updateBackupStrategy({ enabled }),
    onSuccess: () => {
      message.success('备份策略已更新')
      queryClient.invalidateQueries({ queryKey: ['memory-storage'] })
    },
  })

  const info = data?.data as IStorageInfo | undefined

  const pieOption = info ? {
    tooltip: { trigger: 'item' as const, formatter: '{b}: {c}GB ({d}%)' },
    legend: { bottom: 0 },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      data: info.distribution.map((d) => ({ name: d.type, value: d.size })),
      emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.3)' } },
    }],
  } : {}

  const backupColumns: ColumnsType<IBackupRecord> = [
    { title: '备份时间', dataIndex: 'time', key: 'time' },
    { title: '大小', dataIndex: 'size', key: 'size' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => <Tag color={s === '成功' ? 'green' : s === '进行中' ? 'blue' : 'red'}>{s}</Tag>,
    },
  ]

  const archiveColumns: ColumnsType<IArchiveRule> = [
    { title: '规则名', dataIndex: 'name', key: 'name' },
    { title: '条件', dataIndex: 'condition', key: 'condition' },
    { title: '归档天数', dataIndex: 'archiveDays', key: 'archiveDays', width: 100 },
    {
      title: '状态',
      dataIndex: 'enabled',
      key: 'enabled',
      width: 80,
      render: (enabled: boolean, record: IArchiveRule) => (
        <Switch
          size="small"
          checked={enabled}
          onChange={(checked) => toggleArchiveMutation.mutate({ id: record.id, enabled: checked })}
        />
      ),
    },
  ]

  return (
    <PageContainer title="记忆存储管理">
      <Spin spinning={isLoading}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="总容量"
                value={info?.totalCapacity ?? '-'}
                prefix={<HddOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="已使用"
                value={info?.usedCapacity ?? '-'}
                prefix={<DatabaseOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#666', marginBottom: 8 }}>使用率</p>
                <Progress
                  type="circle"
                  percent={info?.usagePercent ?? 0}
                  size={100}
                  strokeColor={
                    (info?.usagePercent ?? 0) > 85 ? '#f5222d'
                    : (info?.usagePercent ?? 0) > 70 ? '#faad14'
                    : '#52c41a'
                  }
                />
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} lg={12}>
            <Card title="存储使用分布" bordered={false}>
              {info && <ReactECharts option={pieOption} style={{ height: 300 }} />}
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card
              title="备份策略"
              bordered={false}
              extra={
                <Switch
                  checked={info?.backupStrategy?.enabled}
                  checkedChildren="已启用"
                  unCheckedChildren="已关闭"
                  onChange={(checked) => toggleBackupMutation.mutate(checked)}
                />
              }
            >
              {info?.backupStrategy && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div>备份频率：{info.backupStrategy.frequency}</div>
                  <div>保留天数：{info.backupStrategy.retentionDays} 天</div>
                  <div>存储路径：{info.backupStrategy.storagePath}</div>
                </div>
              )}
            </Card>
          </Col>
        </Row>

        <Card title="最近备份记录" bordered={false} style={{ marginTop: 16 }}>
          <Table<IBackupRecord>
            rowKey="id"
            columns={backupColumns}
            dataSource={info?.backupRecords ?? []}
            pagination={false}
            size="small"
          />
        </Card>

        <Card title="数据归档规则" bordered={false} style={{ marginTop: 16 }}>
          <Table<IArchiveRule>
            rowKey="id"
            columns={archiveColumns}
            dataSource={info?.archiveRules ?? []}
            pagination={false}
            size="small"
          />
        </Card>
      </Spin>
    </PageContainer>
  )
}
