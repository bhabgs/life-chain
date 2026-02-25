import { useState } from 'react'
import { Table } from 'antd'
import { useQuery } from '@tanstack/react-query'
import PageContainer from '@/components/common/PageContainer'
import { systemService } from '@/services/system.service'
import type { IOperationLog } from '@/services/system.service'
import { formatDateTime } from '@/utils'

export default function LogsPage() {
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20 })

  const { data: logsRes, isLoading } = useQuery({
    queryKey: ['logs', pagination],
    queryFn: () => systemService.getLogs(pagination),
  })

  const columns = [
    { title: '操作人', dataIndex: 'username', key: 'username' },
    { title: '操作类型', dataIndex: 'action', key: 'action' },
    { title: '资源', dataIndex: 'resource', key: 'resource' },
    { title: '详情', dataIndex: 'detail', key: 'detail', ellipsis: true },
    { title: 'IP', dataIndex: 'ip', key: 'ip' },
    {
      title: '时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (val: string) => formatDateTime(val),
    },
  ]

  return (
    <PageContainer title="操作日志">
      <Table<IOperationLog>
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={logsRes?.data?.items}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: logsRes?.data?.total,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (page, pageSize) => setPagination({ page, pageSize }),
        }}
      />
    </PageContainer>
  )
}
