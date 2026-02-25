import { Tabs, Table, Tag, Button, Rate } from 'antd'
import PageContainer from '@/components/common/PageContainer'
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

const ticketData = [
  { id: 'T20260224001', user: '张三', title: '无法上传语音记忆', priority: '高', status: '待处理', createdAt: '2026-02-24T14:30:00Z' },
  { id: 'T20260224002', user: '李四', title: '对话响应速度慢', priority: '中', status: '处理中', createdAt: '2026-02-24T10:15:00Z' },
  { id: 'T20260223003', user: '王五', title: '人格设置不生效', priority: '高', status: '待处理', createdAt: '2026-02-23T18:20:00Z' },
  { id: 'T20260223004', user: '赵六', title: '记忆时间轴显示异常', priority: '低', status: '已完成', createdAt: '2026-02-23T09:45:00Z' },
  { id: 'T20260222005', user: '孙七', title: '账号无法登录', priority: '高', status: '已完成', createdAt: '2026-02-22T20:00:00Z' },
  { id: 'T20260222006', user: '周八', title: '照片上传失败', priority: '中', status: '处理中', createdAt: '2026-02-22T16:30:00Z' },
  { id: 'T20260221007', user: '吴九', title: '通知设置无法保存', priority: '低', status: '待处理', createdAt: '2026-02-21T11:00:00Z' },
]

const feedbackData = [
  { id: '1', user: '张三', type: 'Bug', summary: '在老年模式下字体大小调整无效', rating: 2, createdAt: '2026-02-24T15:00:00Z' },
  { id: '2', user: '李四', type: '建议', summary: '希望增加家庭相册功能', rating: 4, createdAt: '2026-02-24T12:30:00Z' },
  { id: '3', user: '王五', type: '投诉', summary: '对话内容审核误判导致记忆丢失', rating: 1, createdAt: '2026-02-23T19:00:00Z' },
  { id: '4', user: '赵六', type: '建议', summary: '希望支持方言语音识别', rating: 5, createdAt: '2026-02-23T08:20:00Z' },
  { id: '5', user: '孙七', type: 'Bug', summary: '小程序端图片加载缓慢', rating: 3, createdAt: '2026-02-22T21:10:00Z' },
  { id: '6', user: '周八', type: '建议', summary: '增加记忆导出为PDF的功能', rating: 4, createdAt: '2026-02-22T14:45:00Z' },
  { id: '7', user: '吴九', type: '投诉', summary: '付费后功能未及时开通', rating: 1, createdAt: '2026-02-21T10:30:00Z' },
]

const feedbackTypeColorMap: Record<string, string> = {
  Bug: 'red',
  '建议': 'blue',
  '投诉': 'orange',
}

export default function SupportPage() {
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
      render: (_: unknown, record: (typeof ticketData)[number]) =>
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
      children: <Table rowKey="id" columns={ticketColumns} dataSource={ticketData} pagination={false} />,
    },
    {
      key: 'feedback',
      label: '用户反馈',
      children: <Table rowKey="id" columns={feedbackColumns} dataSource={feedbackData} pagination={false} />,
    },
  ]

  return (
    <PageContainer title="客服支持">
      <Tabs items={tabItems} />
    </PageContainer>
  )
}
