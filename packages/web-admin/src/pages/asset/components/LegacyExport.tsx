import { Table, Tag, Spin } from 'antd'
import { useQuery } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import { assetService } from '@/services/asset.service'

interface IExportRecord {
  id: string
  userName: string
  heirName: string
  format: string
  status: string
  requestedAt: string
  completedAt: string | null
  fileSize: string | null
}

const statusColorMap: Record<string, string> = {
  '已完成': 'green',
  '处理中': 'blue',
  '待处理': 'orange',
  '失败': 'red',
}

export default function LegacyExport() {
  const { data, isLoading } = useQuery({
    queryKey: ['legacy-exports'],
    queryFn: () => assetService.getLegacyExports(),
  })

  const columns: ColumnsType<IExportRecord> = [
    { title: '用户', dataIndex: 'userName', key: 'userName' },
    { title: '继承人', dataIndex: 'heirName', key: 'heirName' },
    { title: '导出格式', dataIndex: 'format', key: 'format', width: 100 },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (v: string) => <Tag color={statusColorMap[v]}>{v}</Tag>,
    },
    { title: '申请时间', dataIndex: 'requestedAt', key: 'requestedAt' },
    { title: '完成时间', dataIndex: 'completedAt', key: 'completedAt', render: (v: string | null) => v ?? '-' },
    { title: '文件大小', dataIndex: 'fileSize', key: 'fileSize', render: (v: string | null) => v ?? '-' },
  ]

  return (
    <Spin spinning={isLoading}>
      <Table<IExportRecord>
        rowKey="id"
        columns={columns}
        dataSource={(data?.data ?? []) as IExportRecord[]}
        pagination={{ showTotal: (t) => `共 ${t} 条` }}
      />
    </Spin>
  )
}
