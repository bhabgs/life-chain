import { useState } from 'react'
import { Tabs, Table, Button, Space, Modal, Input, Tag, message } from 'antd'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import PageContainer from '@/components/common/PageContainer'
import { userService } from '@/services/user.service'
import { formatDateTime } from '@/utils'

interface IReviewUser {
  id: string
  username: string
  email: string
  registeredAt: string
  reason: string
  reviewStatus: 'pending' | 'approved' | 'rejected'
  reviewedAt?: string
  reviewReason?: string
  reviewer?: string
}

type TReviewTab = 'pending' | 'reviewed'

const REVIEW_STATUS_TAG: Record<string, { color: string; label: string }> = {
  pending: { color: 'processing', label: '待审核' },
  approved: { color: 'success', label: '已通过' },
  rejected: { color: 'error', label: '已拒绝' },
}

export default function UserReviewPage() {
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<TReviewTab>('pending')
  const [modalOpen, setModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<IReviewUser | null>(null)
  const [currentAction, setCurrentAction] = useState<'approved' | 'rejected'>('approved')
  const [reviewReason, setReviewReason] = useState('')

  const pendingQuery = useQuery({
    queryKey: ['user-review', 'pending'],
    queryFn: () => userService.getReviewList({ status: 'pending' }),
  })

  const reviewedQuery = useQuery({
    queryKey: ['user-review', 'reviewed'],
    queryFn: () =>
      userService.getReviewList({}),
  })

  const reviewMutation = useMutation({
    mutationFn: ({ id, action, reason }: { id: string; action: string; reason?: string }) =>
      userService.reviewUser(id, action, reason),
    onSuccess: () => {
      message.success('审核操作成功')
      queryClient.invalidateQueries({ queryKey: ['user-review'] })
      setModalOpen(false)
      setReviewReason('')
      setCurrentUser(null)
    },
    onError: () => {
      message.error('审核操作失败')
    },
  })

  const openReviewModal = (user: IReviewUser, action: 'approved' | 'rejected') => {
    setCurrentUser(user)
    setCurrentAction(action)
    setReviewReason('')
    setModalOpen(true)
  }

  const handleConfirmReview = () => {
    if (!currentUser) return
    if (!reviewReason.trim()) {
      message.warning('请填写审核意见')
      return
    }
    reviewMutation.mutate({
      id: currentUser.id,
      action: currentAction,
      reason: reviewReason,
    })
  }

  const pendingColumns: ColumnsType<IReviewUser> = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '注册时间',
      dataIndex: 'registeredAt',
      key: 'registeredAt',
      render: (text) => formatDateTime(text),
    },
    {
      title: '申请理由',
      dataIndex: 'reason',
      key: 'reason',
      width: 300,
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<CheckCircleOutlined />}
            style={{ backgroundColor: '#52C41A', borderColor: '#52C41A' }}
            onClick={() => openReviewModal(record, 'approved')}
          >
            通过
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            icon={<CloseCircleOutlined />}
            onClick={() => openReviewModal(record, 'rejected')}
          >
            拒绝
          </Button>
        </Space>
      ),
    },
  ]

  const reviewedColumns: ColumnsType<IReviewUser> = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '注册时间',
      dataIndex: 'registeredAt',
      key: 'registeredAt',
      render: (text) => formatDateTime(text),
    },
    {
      title: '申请理由',
      dataIndex: 'reason',
      key: 'reason',
      width: 200,
      ellipsis: true,
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      key: 'reviewStatus',
      render: (status: string) => {
        const config = REVIEW_STATUS_TAG[status]
        return config ? <Tag color={config.color}>{config.label}</Tag> : <Tag>{status}</Tag>
      },
    },
    {
      title: '审核意见',
      dataIndex: 'reviewReason',
      key: 'reviewReason',
      width: 200,
      ellipsis: true,
      render: (text) => text || '-',
    },
    {
      title: '审核人',
      dataIndex: 'reviewer',
      key: 'reviewer',
      render: (text) => text || '-',
    },
    {
      title: '审核时间',
      dataIndex: 'reviewedAt',
      key: 'reviewedAt',
      render: (text) => (text ? formatDateTime(text) : '-'),
    },
  ]

  const pendingData = pendingQuery.data?.data as { items: IReviewUser[] } | undefined
  const reviewedData = reviewedQuery.data?.data as { items: IReviewUser[] } | undefined
  const reviewedItems = (reviewedData?.items || []).filter(
    (u) => u.reviewStatus !== 'pending',
  )

  const tabItems = [
    {
      key: 'pending' as const,
      label: `待审核 (${pendingData?.items?.length || 0})`,
      children: (
        <Table<IReviewUser>
          rowKey="id"
          columns={pendingColumns}
          dataSource={pendingData?.items || []}
          loading={pendingQuery.isLoading}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      ),
    },
    {
      key: 'reviewed' as const,
      label: '已审核',
      children: (
        <Table<IReviewUser>
          rowKey="id"
          columns={reviewedColumns}
          dataSource={reviewedItems}
          loading={reviewedQuery.isLoading}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      ),
    },
  ]

  return (
    <PageContainer title="账号审核">
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as TReviewTab)}
        items={tabItems}
      />

      <Modal
        title={
          <Space>
            <ExclamationCircleOutlined
              style={{ color: currentAction === 'approved' ? '#52C41A' : '#F5222D' }}
            />
            <span>{currentAction === 'approved' ? '通过审核' : '拒绝审核'}</span>
          </Space>
        }
        open={modalOpen}
        onOk={handleConfirmReview}
        onCancel={() => {
          setModalOpen(false)
          setReviewReason('')
        }}
        okText="确认"
        cancelText="取消"
        okButtonProps={{
          loading: reviewMutation.isPending,
          danger: currentAction === 'rejected',
        }}
      >
        <div style={{ marginBottom: 12 }}>
          <strong>用户：</strong>
          {currentUser?.username}（{currentUser?.email}）
        </div>
        <div style={{ marginBottom: 12 }}>
          <strong>申请理由：</strong>
          {currentUser?.reason}
        </div>
        <div>
          <strong>审核意见：</strong>
          <Input.TextArea
            rows={3}
            placeholder="请输入审核意见..."
            value={reviewReason}
            onChange={(e) => setReviewReason(e.target.value)}
            style={{ marginTop: 8 }}
          />
        </div>
      </Modal>
    </PageContainer>
  )
}
