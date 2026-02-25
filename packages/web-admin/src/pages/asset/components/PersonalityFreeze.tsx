import { Table, Tag, Button, Space, Spin } from 'antd'
import { useQuery } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import { assetService } from '@/services/asset.service'

interface IFreezeVersion {
  id: string
  userName: string
  version: string
  frozenAt: string
  size: string
  status: string
  description: string
}

export default function PersonalityFreeze() {
  const { data, isLoading } = useQuery({
    queryKey: ['personality-freeze'],
    queryFn: () => assetService.getFreezeVersions(),
  })

  const columns: ColumnsType<IFreezeVersion> = [
    { title: '用户', dataIndex: 'userName', key: 'userName' },
    { title: '版本号', dataIndex: 'version', key: 'version' },
    { title: '冻结时间', dataIndex: 'frozenAt', key: 'frozenAt' },
    { title: '备份大小', dataIndex: 'size', key: 'size', width: 100 },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (v: string) => (
        <Tag color={v === '有效' ? 'green' : v === '已过期' ? 'default' : 'orange'}>{v}</Tag>
      ),
    },
    { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: () => (
        <Space size="small">
          <Button type="link" size="small">查看</Button>
          <Button type="link" size="small">恢复</Button>
        </Space>
      ),
    },
  ]

  return (
    <Spin spinning={isLoading}>
      <Table<IFreezeVersion>
        rowKey="id"
        columns={columns}
        dataSource={(data?.data ?? []) as IFreezeVersion[]}
        pagination={{ showTotal: (t) => `共 ${t} 条` }}
      />
    </Spin>
  )
}
