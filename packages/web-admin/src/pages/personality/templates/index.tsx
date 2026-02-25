import { useNavigate } from 'react-router-dom'
import { Table, Button, Space, Modal, Tag, message } from 'antd'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import PageContainer from '@/components/common/PageContainer'
import { personalityService } from '@/services/personality.service'
import type { IPersonalityTemplate, TRelationshipType } from '@lifechain/shared'
import { RELATIONSHIP_TYPES } from '@lifechain/shared'

export default function PersonalityTemplatesPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['personality-templates'],
    queryFn: () => personalityService.getTemplates(),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => personalityService.deleteTemplate(id),
    onSuccess: () => {
      message.success('删除成功')
      queryClient.invalidateQueries({ queryKey: ['personality-templates'] })
    },
    onError: () => {
      message.error('删除失败')
    },
  })

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '删除后数据将无法恢复，确定要删除该模板吗？',
      okText: '确认',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: () => deleteMutation.mutateAsync(id),
    })
  }

  const columns: ColumnsType<IPersonalityTemplate> = [
    {
      title: '模板名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      width: 300,
    },
    {
      title: '关系类型',
      dataIndex: 'relationship',
      key: 'relationship',
      render: (type: TRelationshipType) => (
        <Tag>{RELATIONSHIP_TYPES[type]?.label || type}</Tag>
      ),
    },
    {
      title: '是否默认',
      dataIndex: 'isDefault',
      key: 'isDefault',
      render: (val: boolean) =>
        val ? <Tag color="#FF8A5B">默认</Tag> : <Tag>否</Tag>,
    },
    {
      title: '使用次数',
      dataIndex: 'usageCount',
      key: 'usageCount',
      sorter: true,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            onClick={() => navigate(`/personality/templates/${record.id}/edit`)}
          >
            编辑
          </Button>
          <Button type="link" size="small" danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageContainer
      title="人格模板管理"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/personality/templates/new')}
        >
          新增模板
        </Button>
      }
    >
      <Table<IPersonalityTemplate>
        rowKey="id"
        columns={columns}
        dataSource={data?.data?.items}
        loading={isLoading}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
      />
    </PageContainer>
  )
}
