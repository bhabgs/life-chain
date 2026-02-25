import { Table, Tag, Button, Space, Spin } from 'antd'
import { useQuery } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import { assetService } from '@/services/asset.service'

interface IHeir {
  id: string
  name: string
  relation: string
  userId: string
  ownerName: string
  verificationStatus: string
  accessLevel: string
  createdAt: string
}

const verifyColorMap: Record<string, string> = {
  '已验证': 'green',
  '待验证': 'orange',
  '验证失败': 'red',
}

const accessColorMap: Record<string, string> = {
  '完整访问': 'blue',
  '部分访问': 'cyan',
  '仅查看': 'default',
}

export default function HeirManagement() {
  const { data, isLoading } = useQuery({
    queryKey: ['heirs'],
    queryFn: () => assetService.getHeirs(),
  })

  const columns: ColumnsType<IHeir> = [
    { title: '继承人', dataIndex: 'name', key: 'name' },
    { title: '关系', dataIndex: 'relation', key: 'relation', width: 80 },
    { title: '所属用户', dataIndex: 'ownerName', key: 'ownerName' },
    {
      title: '身份验证',
      dataIndex: 'verificationStatus',
      key: 'verificationStatus',
      render: (v: string) => <Tag color={verifyColorMap[v]}>{v}</Tag>,
    },
    {
      title: '访问权限',
      dataIndex: 'accessLevel',
      key: 'accessLevel',
      render: (v: string) => <Tag color={accessColorMap[v]}>{v}</Tag>,
    },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="small">
          <Button type="link" size="small">查看详情</Button>
          <Button type="link" size="small">权限设置</Button>
        </Space>
      ),
    },
  ]

  return (
    <Spin spinning={isLoading}>
      <Table<IHeir>
        rowKey="id"
        columns={columns}
        dataSource={(data?.data ?? []) as IHeir[]}
        pagination={{ showTotal: (t) => `共 ${t} 条` }}
      />
    </Spin>
  )
}
