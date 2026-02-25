import { Card, Table, Tag } from 'antd'
import {
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import type { ISystemAlert } from '@/services/dashboard.service'

const alertLevelMap: Record<string, { color: string; icon: React.ReactNode }> = {
  info: { color: 'blue', icon: <CheckCircleOutlined /> },
  warning: { color: 'orange', icon: <WarningOutlined /> },
  critical: { color: 'red', icon: <CloseCircleOutlined /> },
}

interface RecentAlertsProps {
  alerts?: ISystemAlert[]
  loading: boolean
}

export default function RecentAlerts({ alerts, loading }: RecentAlertsProps) {
  const columns = [
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
      dataIndex: 'time',
      key: 'time',
      width: 170,
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
    <Card title="最近告警" bordered={false} style={{ marginTop: 16 }}>
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={alerts ?? []}
        pagination={false}
        size="small"
      />
    </Card>
  )
}
