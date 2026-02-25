import { Tabs, Table, Tag, Button, Space } from 'antd'
import { LIFE_STAGES } from '@lifechain/shared'
import type { TLifeStage } from '@lifechain/shared'
import PageContainer from '@/components/common/PageContainer'

const comfortData = [
  { id: '1', title: '星空下的小熊', type: '故事', stage: 'childhood' as TLifeStage, status: '已发布' },
  { id: '2', title: '雨后的彩虹', type: '故事', stage: 'childhood' as TLifeStage, status: '草稿' },
  { id: '3', title: '轻柔钢琴曲集', type: '音乐', stage: 'youth' as TLifeStage, status: '已发布' },
  { id: '4', title: '冥想引导视频', type: '视频', stage: 'middle_age' as TLifeStage, status: '已发布' },
  { id: '5', title: '晚安故事系列', type: '故事', stage: 'old_age' as TLifeStage, status: '已发布' },
  { id: '6', title: '自然白噪音', type: '音乐', stage: 'adolescence' as TLifeStage, status: '草稿' },
  { id: '7', title: '呼吸练习教程', type: '视频', stage: 'youth' as TLifeStage, status: '已发布' },
]

const corpusData = [
  { id: '1', category: '日常问候', question: '你好，今天过得怎么样？', template: '你好呀！今天{weather}，希望你心情和天气一样好~', frequency: 1280 },
  { id: '2', category: '情绪安抚', question: '我今天心情不好', template: '我能感受到你现在不太开心，愿意和我说说发生了什么吗？', frequency: 892 },
  { id: '3', category: '记忆引导', question: '帮我记录一下今天的事', template: '好的，让我们一起记录这个美好的瞬间吧。今天发生了什么特别的事呢？', frequency: 756 },
  { id: '4', category: '睡前陪伴', question: '我睡不着', template: '夜深了还没睡着呀，要不要我给你讲个轻松的故事？', frequency: 634 },
  { id: '5', category: '节日祝福', question: '今天是什么节日', template: '今天是{holiday}，祝你{wish}！要不要记录一下今天的感受？', frequency: 423 },
  { id: '6', category: '健康关怀', question: '我头疼', template: '头疼可要注意休息哦，多喝温水，如果持续不舒服建议去看医生。', frequency: 312 },
]

const reviewData = [
  { id: '1', summary: '用户自创故事：我的童年小狗', submitter: '张三', type: '故事', submitTime: '2026-02-24 14:30', status: '待审核' },
  { id: '2', summary: '用户上传音频：妈妈的摇篮曲', submitter: '李四', type: '音频', submitTime: '2026-02-24 10:15', status: '待审核' },
  { id: '3', summary: '用户分享记忆：毕业典礼照片', submitter: '王五', type: '图片', submitTime: '2026-02-23 18:20', status: '已通过' },
  { id: '4', summary: '用户自创对话模板', submitter: '赵六', type: '文本', submitTime: '2026-02-23 09:45', status: '已拒绝' },
  { id: '5', summary: '用户上传视频：家庭聚会', submitter: '孙七', type: '视频', submitTime: '2026-02-22 20:00', status: '待审核' },
  { id: '6', summary: '用户分享故事：外婆的厨房', submitter: '周八', type: '故事', submitTime: '2026-02-22 16:30', status: '已通过' },
]

const statusColorMap: Record<string, string> = {
  '已发布': 'green',
  '草稿': 'default',
  '待审核': 'orange',
  '已通过': 'green',
  '已拒绝': 'red',
}

export default function ContentPage() {
  const comfortColumns = [
    { title: '标题', dataIndex: 'title', key: 'title' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    {
      title: '适用阶段',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage: TLifeStage) => LIFE_STAGES[stage].label,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={statusColorMap[status]}>{status}</Tag>,
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" size="small">编辑</Button>
          <Button type="link" size="small" danger>删除</Button>
        </Space>
      ),
    },
  ]

  const corpusColumns = [
    { title: '类别', dataIndex: 'category', key: 'category' },
    { title: '问题', dataIndex: 'question', key: 'question' },
    { title: '回答模板', dataIndex: 'template', key: 'template', ellipsis: true },
    { title: '使用频次', dataIndex: 'frequency', key: 'frequency', sorter: (a: (typeof corpusData)[number], b: (typeof corpusData)[number]) => a.frequency - b.frequency },
  ]

  const reviewColumns = [
    { title: '内容摘要', dataIndex: 'summary', key: 'summary' },
    { title: '提交者', dataIndex: 'submitter', key: 'submitter' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { title: '提交时间', dataIndex: 'submitTime', key: 'submitTime' },
    {
      title: '审核状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={statusColorMap[status]}>{status}</Tag>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: (typeof reviewData)[number]) =>
        record.status === '待审核' ? (
          <Space>
            <Button type="link" size="small">通过</Button>
            <Button type="link" size="small" danger>拒绝</Button>
          </Space>
        ) : null,
    },
  ]

  const tabItems = [
    {
      key: 'comfort',
      label: '安抚内容库',
      children: <Table rowKey="id" columns={comfortColumns} dataSource={comfortData} pagination={false} />,
    },
    {
      key: 'corpus',
      label: '对话语料库',
      children: <Table rowKey="id" columns={corpusColumns} dataSource={corpusData} pagination={false} />,
    },
    {
      key: 'review',
      label: '审核队列',
      children: <Table rowKey="id" columns={reviewColumns} dataSource={reviewData} pagination={false} />,
    },
  ]

  return (
    <PageContainer title="内容管理">
      <Tabs items={tabItems} />
    </PageContainer>
  )
}
