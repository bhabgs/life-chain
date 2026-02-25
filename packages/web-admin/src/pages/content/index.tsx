import { Tabs, Table, Tag, Button, Space, Spin, message } from 'antd'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { LIFE_STAGES } from '@lifechain/shared'
import type { TLifeStage } from '@lifechain/shared'
import PageContainer from '@/components/common/PageContainer'
import { contentService } from '@/services/content.service'
import type { IComfortContent, ICorpus, IReviewItem } from '@/services/content.service'

const statusColorMap: Record<string, string> = {
  '已发布': 'green',
  '草稿': 'default',
  '审核中': 'orange',
  '待审核': 'orange',
  '已通过': 'green',
  '已拒绝': 'red',
}

const stageMap: Record<string, string> = {
  childhood: '童年',
  adolescence: '青少年',
  youth: '青年',
  middle_age: '中年',
  old_age: '老年',
  all: '全阶段',
}

export default function ContentPage() {
  const queryClient = useQueryClient()

  const { data: comfortRes, isLoading: comfortLoading } = useQuery({
    queryKey: ['content', 'comfort'],
    queryFn: () => contentService.getComfortList(),
  })

  const { data: corpusRes, isLoading: corpusLoading } = useQuery({
    queryKey: ['content', 'corpus'],
    queryFn: () => contentService.getCorpusList(),
  })

  const { data: reviewRes, isLoading: reviewLoading } = useQuery({
    queryKey: ['content', 'review'],
    queryFn: () => contentService.getReviewList(),
  })

  const { data: materialsRes, isLoading: materialsLoading } = useQuery({
    queryKey: ['content', 'stage-materials'],
    queryFn: () => contentService.getStageMaterials(),
  })

  const reviewMutation = useMutation({
    mutationFn: ({ id, action }: { id: string; action: 'approve' | 'reject' }) =>
      contentService.reviewItem(id, action),
    onSuccess: () => {
      message.success('审核操作成功')
      queryClient.invalidateQueries({ queryKey: ['content', 'review'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => contentService.deleteComfort(id),
    onSuccess: () => {
      message.success('删除成功')
      queryClient.invalidateQueries({ queryKey: ['content', 'comfort'] })
    },
  })

  const comfortColumns = [
    { title: '标题', dataIndex: 'title', key: 'title' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    {
      title: '适用阶段',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage: TLifeStage) => LIFE_STAGES[stage]?.label ?? stage,
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
      render: (_: unknown, record: IComfortContent) => (
        <Space>
          <Button type="link" size="small">编辑</Button>
          <Button
            type="link"
            size="small"
            danger
            onClick={() => deleteMutation.mutate(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ]

  const corpusColumns = [
    { title: '类别', dataIndex: 'category', key: 'category' },
    { title: '问题', dataIndex: 'question', key: 'question' },
    { title: '回答模板', dataIndex: 'template', key: 'template', ellipsis: true },
    { title: '使用频次', dataIndex: 'frequency', key: 'frequency', sorter: (a: ICorpus, b: ICorpus) => a.frequency - b.frequency },
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
      render: (_: unknown, record: IReviewItem) =>
        record.status === '待审核' ? (
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => reviewMutation.mutate({ id: record.id, action: 'approve' })}
            >
              通过
            </Button>
            <Button
              type="link"
              size="small"
              danger
              onClick={() => reviewMutation.mutate({ id: record.id, action: 'reject' })}
            >
              拒绝
            </Button>
          </Space>
        ) : null,
    },
  ]

  const materialColumns = [
    { title: '标题', dataIndex: 'title', key: 'title' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    {
      title: '适用阶段',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage: string) => stageMap[stage] ?? stage,
    },
    { title: '分类', dataIndex: 'category', key: 'category' },
    { title: '文件大小', dataIndex: 'fileSize', key: 'fileSize' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={statusColorMap[status]}>{status}</Tag>,
    },
    { title: '上传者', dataIndex: 'uploadedBy', key: 'uploadedBy' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
  ]

  const tabItems = [
    {
      key: 'comfort',
      label: '安抚内容库',
      children: (
        <Spin spinning={comfortLoading}>
          <Table rowKey="id" columns={comfortColumns} dataSource={comfortRes?.data ?? []} pagination={false} />
        </Spin>
      ),
    },
    {
      key: 'corpus',
      label: '对话语料库',
      children: (
        <Spin spinning={corpusLoading}>
          <Table rowKey="id" columns={corpusColumns} dataSource={corpusRes?.data ?? []} pagination={false} />
        </Spin>
      ),
    },
    {
      key: 'review',
      label: '审核队列',
      children: (
        <Spin spinning={reviewLoading}>
          <Table rowKey="id" columns={reviewColumns} dataSource={reviewRes?.data ?? []} pagination={false} />
        </Spin>
      ),
    },
    {
      key: 'materials',
      label: '阶段素材库',
      children: (
        <Spin spinning={materialsLoading}>
          <Table rowKey="id" columns={materialColumns} dataSource={(materialsRes?.data ?? []) as Record<string, unknown>[]} pagination={{ pageSize: 10 }} />
        </Spin>
      ),
    },
  ]

  return (
    <PageContainer title="内容管理">
      <Tabs items={tabItems} />
    </PageContainer>
  )
}
