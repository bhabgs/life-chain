import { Card, Table, Tag } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { stageService } from '@/services/stage.service'

export default function YouthStage() {
  const { data, isLoading } = useQuery({
    queryKey: ['stage-config', 'youth'],
    queryFn: () => stageService.getConfig('youth'),
  })

  const config = data?.data as Record<string, unknown> | undefined

  const choiceColumns = [
    { title: '分类名称', dataIndex: 'name', key: 'name' },
    { title: '子选项数', dataIndex: 'optionCount', key: 'optionCount', width: 100 },
    { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true },
  ]

  const valueColumns = [
    { title: '标签', dataIndex: 'label', key: 'label' },
    {
      title: '颜色',
      dataIndex: 'color',
      key: 'color',
      width: 100,
      render: (color: string, record: Record<string, unknown>) => (
        <Tag color={color}>{record.label as string}</Tag>
      ),
    },
    { title: '使用次数', dataIndex: 'usageCount', key: 'usageCount', width: 100 },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card title="人生选择分类" loading={isLoading} size="small">
        <Table
          rowKey="name"
          columns={choiceColumns}
          dataSource={(config?.lifeChoices as Array<Record<string, unknown>>) ?? []}
          pagination={false}
          size="small"
        />
      </Card>

      <Card title="价值观标签库" size="small">
        <Table
          rowKey="label"
          columns={valueColumns}
          dataSource={(config?.valueLabels as Array<Record<string, unknown>>) ?? []}
          pagination={false}
          size="small"
        />
      </Card>
    </div>
  )
}
