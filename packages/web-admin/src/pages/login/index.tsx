import { useState } from 'react'
import { Form, Input, Button, Card, Typography, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuth } from '@/hooks/useAuth'
import type { ILoginRequest } from '@lifechain/shared'

const { Title, Text } = Typography

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const onFinish = async (values: ILoginRequest) => {
    setLoading(true)
    try {
      await login(values)
    } catch {
      message.error('登录失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF5F0 0%, #F0F5FF 100%)',
      }}
    >
      <Card
        style={{ width: 400, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
        bordered={false}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={3} style={{ color: '#FF8A5B', marginBottom: 8 }}>
            生命链管理后台
          </Title>
          <Text type="secondary">跨世代数字人格陪伴系统</Text>
        </div>

        <Form
          name="login"
          size="large"
          onFinish={onFinish}
          initialValues={{ email: 'admin@lifechain.com', password: 'admin123' }}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效邮箱' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="邮箱" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center' }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            测试账号：admin@lifechain.com / admin123
          </Text>
        </div>
      </Card>
    </div>
  )
}
