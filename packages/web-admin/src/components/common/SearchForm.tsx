import { Form, Button, Space } from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'

interface SearchFormProps {
  onSearch: (values: Record<string, unknown>) => void
  onReset?: () => void
  children: React.ReactNode
  loading?: boolean
}

export default function SearchForm({ onSearch, onReset, children, loading }: SearchFormProps) {
  const [form] = Form.useForm()

  const handleReset = () => {
    form.resetFields()
    onReset?.()
  }

  return (
    <Form form={form} layout="inline" onFinish={onSearch} style={{ marginBottom: 16 }}>
      {children}
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />} loading={loading}>
            搜索
          </Button>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
