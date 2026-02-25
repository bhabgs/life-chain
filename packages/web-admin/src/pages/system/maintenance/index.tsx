import { Tabs, Table, Tag, Card, Row, Col, Statistic, Button, Spin, App } from 'antd'
import { DatabaseOutlined, FileTextOutlined } from '@ant-design/icons'
import { useQuery, useMutation } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import PageContainer from '@/components/common/PageContainer'
import { systemService } from '@/services/system.service'

// ============ 数据备份 ============
function DataBackup() {
  const { message } = App.useApp()
  const { data, isLoading } = useQuery({
    queryKey: ['system-backups'],
    queryFn: () => systemService.getBackups(),
  })

  const backupMutation = useMutation({
    mutationFn: () => systemService.createBackup(),
    onSuccess: () => message.success('备份任务已启动'),
  })

  const columns: ColumnsType<Record<string, unknown>> = [
    { title: '备份ID', dataIndex: 'id', key: 'id' },
    { title: '类型', dataIndex: 'type', key: 'type', width: 80 },
    { title: '大小', dataIndex: 'size', key: 'size', width: 100 },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (v: string) => <Tag color={v === '完成' ? 'green' : v === '进行中' ? 'blue' : 'red'}>{v}</Tag>,
    },
  ]

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<DatabaseOutlined />} onClick={() => backupMutation.mutate()} loading={backupMutation.isPending}>
          立即备份
        </Button>
      </div>
      <Spin spinning={isLoading}>
        <Table rowKey="id" columns={columns} dataSource={(data?.data ?? []) as Record<string, unknown>[]} pagination={false} size="small" />
      </Spin>
    </>
  )
}

// ============ 日志管理 ============
function LogManagement() {
  const { data, isLoading } = useQuery({
    queryKey: ['system-logs-stats'],
    queryFn: () => systemService.getLogStats(),
  })
  const stats = (data?.data ?? {}) as Record<string, unknown>

  return (
    <Spin spinning={isLoading}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card><Statistic title="日志总量" value={(stats.totalLogs as number) ?? 0} suffix="条" prefix={<FileTextOutlined />} /></Card>
        </Col>
        <Col span={8}>
          <Card><Statistic title="存储占用" value={(stats.storageUsed as string) ?? '-'} /></Card>
        </Col>
        <Col span={8}>
          <Card><Statistic title="保留天数" value={(stats.retentionDays as number) ?? 0} suffix="天" /></Card>
        </Col>
      </Row>
      <Card title="日志分类统计" size="small">
        <Table
          rowKey="category"
          columns={[
            { title: '日志分类', dataIndex: 'category', key: 'category' },
            { title: '记录数', dataIndex: 'count', key: 'count' },
            { title: '最新记录', dataIndex: 'latestAt', key: 'latestAt' },
          ]}
          dataSource={(stats.categories as Array<Record<string, unknown>>) ?? []}
          pagination={false}
          size="small"
        />
      </Card>
    </Spin>
  )
}

// ============ 性能监控 ============
function PerformanceMonitor() {
  const { data, isLoading } = useQuery({
    queryKey: ['system-performance'],
    queryFn: () => systemService.getPerformanceStats(),
  })

  const metrics = (data?.data ?? []) as Array<Record<string, unknown>>
  const columns: ColumnsType<Record<string, unknown>> = [
    { title: '指标', dataIndex: 'metric', key: 'metric' },
    { title: '当前值', dataIndex: 'current', key: 'current' },
    { title: '平均值', dataIndex: 'average', key: 'average' },
    { title: 'P95', dataIndex: 'p95', key: 'p95' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (v: string) => <Tag color={v === '正常' ? 'green' : v === '警告' ? 'orange' : 'red'}>{v}</Tag>,
    },
  ]

  return (
    <Spin spinning={isLoading}>
      <Table rowKey="metric" columns={columns} dataSource={metrics} pagination={false} size="small" />
    </Spin>
  )
}

// ============ 主页面 ============
export default function MaintenancePage() {
  return (
    <PageContainer title="系统维护">
      <Tabs
        items={[
          { key: 'backup', label: '数据备份', children: <DataBackup /> },
          { key: 'logs', label: '日志管理', children: <LogManagement /> },
          { key: 'performance', label: '性能监控', children: <PerformanceMonitor /> },
        ]}
      />
    </PageContainer>
  )
}
