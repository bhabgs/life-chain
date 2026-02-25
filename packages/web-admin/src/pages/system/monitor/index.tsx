import { Row, Col, Card, Badge, Table, Tag, Progress, Spin } from 'antd'
import {
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import PageContainer from '@/components/common/PageContainer'
import { systemService } from '@/services/system.service'
import type { IServiceStatus } from '@/services/system.service'
import { formatDateTime } from '@/utils'

const statusMap: Record<
  IServiceStatus['status'],
  { color: string; text: string; badgeStatus: 'success' | 'warning' | 'error' }
> = {
  healthy: { color: '#52C41A', text: '正常', badgeStatus: 'success' },
  degraded: { color: '#FAAD14', text: '降级', badgeStatus: 'warning' },
  down: { color: '#F5222D', text: '宕机', badgeStatus: 'error' },
}

const alertLevelMap: Record<string, { color: string; icon: React.ReactNode }> = {
  info: { color: 'blue', icon: <CheckCircleOutlined /> },
  warning: { color: 'orange', icon: <WarningOutlined /> },
  critical: { color: 'red', icon: <CloseCircleOutlined /> },
}

export default function SystemMonitorPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['system', 'monitor'],
    queryFn: () => systemService.getMonitor(),
    refetchInterval: 30000,
  })

  const monitor = data?.data

  if (isLoading) {
    return (
      <PageContainer title="系统监控">
        <div style={{ textAlign: 'center', padding: 80 }}>
          <Spin size="large" />
        </div>
      </PageContainer>
    )
  }

  const alertColumns = [
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
      width: 100,
      render: (level: string) => {
        const config = alertLevelMap[level]
        return (
          <Tag color={config?.color} icon={config?.icon}>
            {level.toUpperCase()}
          </Tag>
        )
      },
    },
    {
      title: '消息',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
    },
    {
      title: '服务',
      dataIndex: 'service',
      key: 'service',
      width: 140,
    },
    {
      title: '时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 170,
      render: (text: string) => formatDateTime(text),
    },
    {
      title: '状态',
      dataIndex: 'resolved',
      key: 'resolved',
      width: 100,
      render: (resolved: boolean) =>
        resolved ? (
          <Tag color="green">已解决</Tag>
        ) : (
          <Tag color="red">未解决</Tag>
        ),
    },
  ]

  return (
    <PageContainer title="系统监控">
      <Row gutter={[16, 16]}>
        {(monitor?.services ?? []).map((service) => {
          const status = statusMap[service.status]
          return (
            <Col xs={24} sm={12} lg={8} xl={6} key={service.name}>
              <Card bordered={false} size="small">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{service.name}</span>
                  <Badge status={status.badgeStatus} text={status.text} />
                </div>
                <div style={{ marginBottom: 8, color: '#8C8C8C', fontSize: 13 }}>
                  运行时间：{service.uptime}
                </div>
                <div style={{ marginBottom: 8, color: '#8C8C8C', fontSize: 13 }}>
                  响应时间：{service.responseTime}ms
                </div>
                <div style={{ marginBottom: 4 }}>
                  <span style={{ fontSize: 13 }}>CPU</span>
                  <Progress
                    percent={service.cpu}
                    size="small"
                    strokeColor={service.cpu > 80 ? '#F5222D' : service.cpu > 60 ? '#FAAD14' : '#52C41A'}
                  />
                </div>
                <div>
                  <span style={{ fontSize: 13 }}>内存</span>
                  <Progress
                    percent={service.memory}
                    size="small"
                    strokeColor={service.memory > 80 ? '#F5222D' : service.memory > 60 ? '#FAAD14' : '#52C41A'}
                  />
                </div>
              </Card>
            </Col>
          )
        })}
      </Row>

      <Card title="告警列表" bordered={false} style={{ marginTop: 16 }}>
        <Table
          rowKey="id"
          columns={alertColumns}
          dataSource={monitor?.alerts ?? []}
          pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条` }}
        />
      </Card>
    </PageContainer>
  )
}
