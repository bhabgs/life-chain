import { Table, Tag, Switch, Spin, App } from 'antd'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import { assetService } from '@/services/asset.service'

interface IMemorialConfig {
  id: string
  userName: string
  mode: string
  accessType: string
  enabled: boolean
  message: string
}

export default function MemorialMode() {
  const { message } = App.useApp()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['memorial-configs'],
    queryFn: () => assetService.getMemorialConfigs(),
  })

  const toggleMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      assetService.updateMemorialConfig(id, { enabled }),
    onSuccess: () => {
      message.success('状态已更新')
      queryClient.invalidateQueries({ queryKey: ['memorial-configs'] })
    },
  })

  const columns: ColumnsType<IMemorialConfig> = [
    { title: '用户', dataIndex: 'userName', key: 'userName' },
    { title: '纪念模式', dataIndex: 'mode', key: 'mode' },
    {
      title: '访问类型',
      dataIndex: 'accessType',
      key: 'accessType',
      render: (v: string) => <Tag color={v === '公开' ? 'green' : v === '仅继承人' ? 'blue' : 'default'}>{v}</Tag>,
    },
    { title: '留言', dataIndex: 'message', key: 'message', ellipsis: true },
    {
      title: '启用',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (enabled: boolean, record: IMemorialConfig) => (
        <Switch
          size="small"
          checked={enabled}
          onChange={(checked) => toggleMutation.mutate({ id: record.id, enabled: checked })}
        />
      ),
    },
  ]

  return (
    <Spin spinning={isLoading}>
      <Table<IMemorialConfig>
        rowKey="id"
        columns={columns}
        dataSource={(data?.data ?? []) as IMemorialConfig[]}
        pagination={{ showTotal: (t) => `共 ${t} 条` }}
      />
    </Spin>
  )
}
