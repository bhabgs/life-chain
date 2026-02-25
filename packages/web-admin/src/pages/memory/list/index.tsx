import { useState } from 'react'
import { Table, Tag, Button, Input, Select, Space, Popconfirm, message } from 'antd'
import { EyeOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import PageContainer from '@/components/common/PageContainer'
import { memoryService } from '@/services/memory.service'
import { formatDateTime } from '@/utils'
import type { IMemory, IMemoryQueryParams } from '@lifechain/shared'
import { MEMORY_TYPES, LIFE_STAGES, PRIVACY_LEVELS } from '@lifechain/shared'

const typeColorMap: Record<string, string> = {
  text: 'blue',
  voice: 'purple',
  image: 'green',
  video: 'orange',
  event: 'cyan',
}

const stageColorMap: Record<string, string> = {
  childhood: 'gold',
  adolescence: 'lime',
  youth: 'blue',
  middle_age: 'orange',
  old_age: 'purple',
}

export default function MemoryListPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [params, setParams] = useState<IMemoryQueryParams>({
    page: 1,
    pageSize: 10,
  })

  const { data, isLoading } = useQuery({
    queryKey: ['memories', params],
    queryFn: () => memoryService.getList(params),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => memoryService.delete(id),
    onSuccess: () => {
      message.success('删除成功')
      queryClient.invalidateQueries({ queryKey: ['memories'] })
    },
    onError: () => {
      message.error('删除失败')
    },
  })

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (text: string) => text || '-',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: keyof typeof MEMORY_TYPES) => (
        <Tag color={typeColorMap[type]}>{MEMORY_TYPES[type]?.label}</Tag>
      ),
    },
    {
      title: '阶段',
      dataIndex: 'stage',
      key: 'stage',
      width: 100,
      render: (stage: keyof typeof LIFE_STAGES) =>
        stage ? <Tag color={stageColorMap[stage]}>{LIFE_STAGES[stage]?.label}</Tag> : '-',
    },
    {
      title: '情绪',
      dataIndex: 'emotion',
      key: 'emotion',
      width: 80,
      render: (text: string) => text || '-',
    },
    {
      title: '隐私等级',
      dataIndex: 'privacyLevel',
      key: 'privacyLevel',
      width: 110,
      render: (level: keyof typeof PRIVACY_LEVELS) => PRIVACY_LEVELS[level]?.label ?? '-',
    },
    {
      title: '所属用户',
      dataIndex: 'userId',
      key: 'userId',
      width: 140,
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 170,
      render: (text: string) => formatDateTime(text),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_: unknown, record: IMemory) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/memory/detail/${record.id}`)}
          >
            查看
          </Button>
          <Popconfirm
            title="确定要删除这条记忆吗？"
            onConfirm={() => deleteMutation.mutate(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <PageContainer title="记忆列表">
      <Space style={{ marginBottom: 16 }} wrap>
        <Input
          placeholder="搜索关键词"
          prefix={<SearchOutlined />}
          allowClear
          style={{ width: 200 }}
          onPressEnter={(e) =>
            setParams((prev) => ({
              ...prev,
              page: 1,
              keyword: (e.target as HTMLInputElement).value || undefined,
            }))
          }
          onChange={(e) => {
            if (!e.target.value) {
              setParams((prev) => ({ ...prev, page: 1, keyword: undefined }))
            }
          }}
        />
        <Select
          placeholder="记忆类型"
          allowClear
          style={{ width: 140 }}
          onChange={(value) => setParams((prev) => ({ ...prev, page: 1, type: value }))}
          options={Object.entries(MEMORY_TYPES).map(([key, val]) => ({
            label: val.label,
            value: key,
          }))}
        />
        <Select
          placeholder="人生阶段"
          allowClear
          style={{ width: 140 }}
          onChange={(value) => setParams((prev) => ({ ...prev, page: 1, stage: value }))}
          options={Object.entries(LIFE_STAGES).map(([key, val]) => ({
            label: val.label,
            value: key,
          }))}
        />
      </Space>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data?.data?.items ?? []}
        loading={isLoading}
        pagination={{
          current: params.page,
          pageSize: params.pageSize,
          total: data?.data?.total ?? 0,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (page, pageSize) => setParams((prev) => ({ ...prev, page, pageSize })),
        }}
      />
    </PageContainer>
  )
}
