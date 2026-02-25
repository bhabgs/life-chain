import { useParams, useNavigate } from 'react-router-dom'
import { Card, Descriptions, Avatar, Button, Spin, Tag, Row, Col, Statistic, Empty } from 'antd'
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import PageContainer from '@/components/common/PageContainer'
import StatusTag from '@/components/common/StatusTag'
import { userService } from '@/services/user.service'
import { formatDateTime, getRelativeTime } from '@/utils'
import { USER_ROLES } from '@lifechain/shared'
import type { IUserDetail } from '@lifechain/shared'

const GENDER_MAP: Record<string, string> = {
  male: '男',
  female: '女',
  other: '其他',
}

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getDetail(id!),
    enabled: !!id,
  })

  const user: IUserDetail | undefined = data?.data

  if (isLoading) {
    return (
      <PageContainer
        title="用户详情"
        extra={
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
            返回
          </Button>
        }
      >
        <div style={{ textAlign: 'center', padding: 80 }}>
          <Spin size="large" />
        </div>
      </PageContainer>
    )
  }

  if (!user) {
    return (
      <PageContainer
        title="用户详情"
        extra={
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
            返回
          </Button>
        }
      >
        <Empty description="用户不存在" />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="用户详情"
      extra={
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          返回
        </Button>
      }
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Descriptions
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar size={48} src={user.avatar} icon={<UserOutlined />} />
                  <span>{user.username}</span>
                </div>
              }
              column={{ xs: 1, sm: 2, md: 3 }}
              bordered
            >
              <Descriptions.Item label="用户名">{user.username}</Descriptions.Item>
              <Descriptions.Item label="昵称">{user.nickname || '-'}</Descriptions.Item>
              <Descriptions.Item label="邮箱">{user.email}</Descriptions.Item>
              <Descriptions.Item label="手机">{user.phone || '-'}</Descriptions.Item>
              <Descriptions.Item label="性别">
                {user.gender ? GENDER_MAP[user.gender] || user.gender : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="生日">{user.birthDate || '-'}</Descriptions.Item>
              <Descriptions.Item label="角色">
                <Tag color={user.role === 'admin' ? '#FF8A5B' : 'default'}>
                  {USER_ROLES[user.role]?.label || user.role}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                <StatusTag status={user.status} />
              </Descriptions.Item>
              <Descriptions.Item label="注册时间">
                {formatDateTime(user.createdAt)}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card>
            <Statistic title="记忆数量" value={user.memoryCount} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="对话次数" value={user.chatSessionCount} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="最近活跃"
              value={user.lastActiveAt ? getRelativeTime(user.lastActiveAt) : '-'}
              valueStyle={{ fontSize: 20 }}
            />
          </Card>
        </Col>

        {user.personality && (
          <Col span={24}>
            <Card title="数字人格信息">
              <Descriptions column={{ xs: 1, sm: 2, md: 3 }} bordered>
                <Descriptions.Item label="人格名称">{user.personality.name}</Descriptions.Item>
                <Descriptions.Item label="人格ID">{user.personality.id}</Descriptions.Item>
                <Descriptions.Item label="关系类型">
                  {user.personality.relationship}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        )}
      </Row>
    </PageContainer>
  )
}
