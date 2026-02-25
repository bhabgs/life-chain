import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Input, Select, Button, Space, Modal, message, Tag } from 'antd'
import {
  SearchOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import PageContainer from '@/components/common/PageContainer'
import StatusTag from '@/components/common/StatusTag'
import { userService } from '@/services/user.service'
import { getRelativeTime } from '@/utils'
import type { IUser, IUserQueryParams, TUserStatus, TUserRole } from '@lifechain/shared'
import { USER_STATUS, USER_ROLES } from '@lifechain/shared'

export default function UserListPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [params, setParams] = useState<IUserQueryParams>({
    page: 1,
    pageSize: 10,
  })

  const { data, isLoading } = useQuery({
    queryKey: ['users', params],
    queryFn: () => userService.getList(params),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => userService.delete(id),
    onSuccess: () => {
      message.success('删除成功')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: () => {
      message.error('删除失败')
    },
  })

  const batchDeleteMutation = useMutation({
    mutationFn: (ids: string[]) => userService.batchDelete(ids),
    onSuccess: () => {
      message.success('批量删除成功')
      setSelectedRowKeys([])
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: () => {
      message.error('批量删除失败')
    },
  })

  const freezeMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: TUserStatus }) =>
      userService.update(id, { status }),
    onSuccess: () => {
      message.success('操作成功')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: () => {
      message.error('操作失败')
    },
  })

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '删除后数据将无法恢复，确定要删除该用户吗？',
      okText: '确认',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: () => deleteMutation.mutateAsync(id),
    })
  }

  const handleBatchDelete = () => {
    Modal.confirm({
      title: '确认批量删除',
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除选中的 ${selectedRowKeys.length} 个用户吗？`,
      okText: '确认',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: () => batchDeleteMutation.mutateAsync(selectedRowKeys as string[]),
    })
  }

  const handleFreeze = (id: string, currentStatus: TUserStatus) => {
    const isSuspended = currentStatus === 'suspended'
    Modal.confirm({
      title: isSuspended ? '确认解冻' : '确认冻结',
      icon: <ExclamationCircleOutlined />,
      content: isSuspended ? '确定要解冻该用户吗？' : '确定要冻结该用户吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () =>
        freezeMutation.mutateAsync({
          id,
          status: isSuspended ? 'active' : 'suspended',
        }),
    })
  }

  const columns: ColumnsType<IUser> = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      render: (text) => text || '-',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: TUserRole) => {
        const config = USER_ROLES[role]
        return <Tag color={role === 'admin' ? '#FF8A5B' : 'default'}>{config?.label || role}</Tag>
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: TUserStatus) => <StatusTag status={status} />,
    },
    {
      title: '记忆数',
      dataIndex: 'memoryCount',
      key: 'memoryCount',
      sorter: true,
    },
    {
      title: '最近活跃',
      dataIndex: 'lastActiveAt',
      key: 'lastActiveAt',
      render: (text) => (text ? getRelativeTime(text) : '-'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small" onClick={() => navigate(`/users/${record.id}`)}>
            查看
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => handleFreeze(record.id, record.status)}
          >
            {record.status === 'suspended' ? '解冻' : '冻结'}
          </Button>
          <Button type="link" size="small" danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  const statusOptions = Object.entries(USER_STATUS).map(([value, config]) => ({
    label: config.label,
    value,
  }))

  const roleOptions = Object.entries(USER_ROLES).map(([value, config]) => ({
    label: config.label,
    value,
  }))

  return (
    <PageContainer title="用户管理">
      <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Input
          placeholder="搜索用户名 / 邮箱 / 昵称"
          prefix={<SearchOutlined />}
          style={{ width: 280 }}
          allowClear
          onChange={(e) =>
            setParams((prev) => ({ ...prev, keyword: e.target.value || undefined, page: 1 }))
          }
        />
        <Select
          placeholder="用户状态"
          style={{ width: 140 }}
          allowClear
          options={statusOptions}
          onChange={(value) =>
            setParams((prev) => ({ ...prev, status: value as TUserStatus, page: 1 }))
          }
        />
        <Select
          placeholder="用户角色"
          style={{ width: 140 }}
          allowClear
          options={roleOptions}
          onChange={(value) =>
            setParams((prev) => ({ ...prev, role: value as TUserRole, page: 1 }))
          }
        />
        {selectedRowKeys.length > 0 && (
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={handleBatchDelete}
            loading={batchDeleteMutation.isPending}
          >
            批量删除 ({selectedRowKeys.length})
          </Button>
        )}
      </div>

      <Table<IUser>
        rowKey="id"
        columns={columns}
        dataSource={data?.data?.items}
        loading={isLoading}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        pagination={{
          current: data?.data?.page || params.page,
          pageSize: data?.data?.pageSize || params.pageSize,
          total: data?.data?.total || 0,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (page, pageSize) => setParams((prev) => ({ ...prev, page, pageSize })),
        }}
      />
    </PageContainer>
  )
}
