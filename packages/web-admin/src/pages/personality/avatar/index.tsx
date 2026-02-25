import { useState } from 'react'
import {
  Card,
  Tabs,
  Tag,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Upload,
  Image,
  Popconfirm,
  App,
} from 'antd'
import {
  PlusOutlined,
  UploadOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import PageContainer from '@/components/common/PageContainer'
import { personalityService } from '@/services/personality.service'
import type { IAvatarResource } from '@/mocks/data/personality-templates'

const stageOptions = [
  { label: '童年', value: 'childhood' },
  { label: '青少年', value: 'adolescence' },
  { label: '青年', value: 'youth' },
  { label: '中年', value: 'middle_age' },
  { label: '老年', value: 'old_age' },
]

const stageLabels: Record<string, string> = {
  childhood: '童年',
  adolescence: '青少年',
  youth: '青年',
  middle_age: '中年',
  old_age: '老年',
}

const statusColorMap: Record<string, string> = {
  approved: 'green',
  pending: 'orange',
  rejected: 'red',
}

const statusLabelMap: Record<string, string> = {
  approved: '已通过',
  pending: '待审核',
  rejected: '已拒绝',
}

export default function AvatarPage() {
  const { message } = App.useApp()
  const queryClient = useQueryClient()
  const [activeStage, setActiveStage] = useState('childhood')
  const [uploadOpen, setUploadOpen] = useState(false)
  const [form] = Form.useForm()

  const { data, isLoading } = useQuery({
    queryKey: ['avatars', activeStage],
    queryFn: () => personalityService.getAvatars(activeStage),
  })

  const uploadMutation = useMutation({
    mutationFn: (values: Partial<IAvatarResource>) => personalityService.uploadAvatar(values),
    onSuccess: () => {
      message.success('上传成功')
      queryClient.invalidateQueries({ queryKey: ['avatars'] })
      setUploadOpen(false)
      form.resetFields()
    },
    onError: () => {
      message.error('上传失败')
    },
  })

  const reviewMutation = useMutation({
    mutationFn: ({ id, action }: { id: string; action: 'approve' | 'reject' }) =>
      personalityService.reviewAvatar(id, action),
    onSuccess: () => {
      message.success('审核操作成功')
      queryClient.invalidateQueries({ queryKey: ['avatars'] })
    },
    onError: () => {
      message.error('审核操作失败')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => personalityService.deleteAvatar(id),
    onSuccess: () => {
      message.success('删除成功')
      queryClient.invalidateQueries({ queryKey: ['avatars'] })
    },
    onError: () => {
      message.error('删除失败')
    },
  })

  const handleUpload = () => {
    form.validateFields().then((values) => {
      uploadMutation.mutate({
        ...values,
        stage: activeStage,
        imageUrl: `https://picsum.photos/200/200?random=${Date.now()}`,
      })
    })
  }

  const avatars = (data?.data ?? []) as IAvatarResource[]

  return (
    <PageContainer
      title="形象资源库"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setUploadOpen(true)}>
          上传新形象
        </Button>
      }
    >
      <Tabs
        activeKey={activeStage}
        onChange={setActiveStage}
        items={stageOptions.map((s) => ({ key: s.value, label: s.label }))}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
          marginTop: 16,
        }}
      >
        {isLoading ? (
          <Card loading style={{ width: 280 }} />
        ) : avatars.length === 0 ? (
          <div style={{ color: '#999', padding: 40 }}>
            暂无{stageLabels[activeStage]}阶段的形象资源
          </div>
        ) : (
          avatars.map((avatar) => (
            <Card
              key={avatar.id}
              hoverable
              cover={
                <Image
                  alt={avatar.name}
                  src={avatar.imageUrl}
                  height={200}
                  style={{ objectFit: 'cover' }}
                  fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJhAPkE0VKkQAAAABJRU5ErkJggg=="
                />
              }
              actions={[
                ...(avatar.status === 'pending'
                  ? [
                      <Button
                        key="approve"
                        type="link"
                        size="small"
                        icon={<CheckOutlined />}
                        onClick={() => reviewMutation.mutate({ id: avatar.id, action: 'approve' })}
                      >
                        通过
                      </Button>,
                      <Button
                        key="reject"
                        type="link"
                        size="small"
                        danger
                        icon={<CloseOutlined />}
                        onClick={() => reviewMutation.mutate({ id: avatar.id, action: 'reject' })}
                      >
                        拒绝
                      </Button>,
                    ]
                  : []),
                <Popconfirm
                  key="delete"
                  title="确定要删除这个形象吗？"
                  onConfirm={() => deleteMutation.mutate(avatar.id)}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button type="link" size="small" danger icon={<DeleteOutlined />}>
                    删除
                  </Button>
                </Popconfirm>,
              ]}
            >
              <Card.Meta
                title={
                  <Space>
                    {avatar.name}
                    <Tag color={statusColorMap[avatar.status]}>
                      {statusLabelMap[avatar.status]}
                    </Tag>
                  </Space>
                }
                description={avatar.description}
              />
            </Card>
          ))
        )}
      </div>

      <Modal
        title="上传新形象"
        open={uploadOpen}
        onOk={handleUpload}
        onCancel={() => {
          setUploadOpen(false)
          form.resetFields()
        }}
        confirmLoading={uploadMutation.isPending}
        okText="提交"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="形象名称"
            rules={[{ required: true, message: '请输入形象名称' }]}
          >
            <Input placeholder="请输入形象名称" />
          </Form.Item>
          <Form.Item
            name="description"
            label="形象描述"
            rules={[{ required: true, message: '请输入形象描述' }]}
          >
            <Input.TextArea rows={3} placeholder="请描述形象特点" />
          </Form.Item>
          <Form.Item label="所属阶段">
            <Input disabled value={stageLabels[activeStage]} />
          </Form.Item>
          <Form.Item label="形象图片">
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>选择图片</div>
              </div>
            </Upload>
            <span style={{ color: '#999', fontSize: 12 }}>
              模拟上传，实际图片将使用随机占位图
            </span>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  )
}
