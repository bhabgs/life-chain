import { Tabs, Table, Tag, Button, Rate, Spin } from 'antd'
import { useQuery } from '@tanstack/react-query'
import PageContainer from '@/components/common/PageContainer'
import { supportService } from '@/services/support.service'
import type { ITicket } from '@/services/support.service'
import { formatDateTime } from '@/utils'

const priorityColorMap: Record<string, string> = {
  '高': 'red',
  '中': 'orange',
  '低': 'blue',
}

const ticketStatusColorMap: Record<string, string> = {
  '待处理': 'orange',
  '处理中': 'blue',
  '已完成': 'green',
}

const feedbackTypeColorMap: Record<string, string> = {
  Bug: 'red',
  '建议': 'blue',
  '投诉': 'orange',
}

export default function SupportPage() {
  const { data: ticketsRes, isLoading: ticketsLoading } = useQuery({
    queryKey: ['support', 'tickets'],
    queryFn: () => supportService.getTickets(),
  })

  const { data: feedbacksRes, isLoading: feedbacksLoading } = useQuery({
    queryKey: ['support', 'feedbacks'],
    queryFn: () => supportService.getFeedbacks(),
  })

  const ticketColumns = [
    { title: '工单号', dataIndex: 'id', key: 'id' },
    { title: '用户', dataIndex: 'user', key: 'user' },
    { title: '标题', dataIndex: 'title', key: 'title' },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => <Tag color={priorityColorMap[priority]}>{priority}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={ticketStatusColorMap[status]}>{status}</Tag>,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (val: string) => formatDateTime(val),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: ITicket) =>
        record.status !== '已完成' ? (
          <Button type="link" size="small">处理</Button>
        ) : null,
    },
  ]

  const feedbackColumns = [
    { title: '反馈者', dataIndex: 'user', key: 'user' },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color={feedbackTypeColorMap[type]}>{type}</Tag>,
    },
    { title: '内容摘要', dataIndex: 'summary', key: 'summary', ellipsis: true },
    {
      title: '评分',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => <Rate disabled defaultValue={rating} style={{ fontSize: 14 }} />,
    },
    {
      title: '时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (val: string) => formatDateTime(val),
    },
  ]

  const tabItems = [
    {
      key: 'ticket',
      label: '工单管理',
      children: (
        <Spin spinning={ticketsLoading}>
          <Table rowKey="id" columns={ticketColumns} dataSource={ticketsRes?.data?.items ?? []} pagination={false} />
        </Spin>
      ),
    },
    {
      key: 'feedback',
      label: '用户反馈',
      children: (
        <Spin spinning={feedbacksLoading}>
          <Table rowKey="id" columns={feedbackColumns} dataSource={feedbacksRes?.data?.items ?? []} pagination={false} />
        </Spin>
      ),
    },
  ]

  return (
    <PageContainer title="客服支持">
      <Tabs items={tabItems} />
    </PageContainer>
  )
}
