import { Typography } from 'antd'

const { Title } = Typography

interface PageContainerProps {
  title: string
  extra?: React.ReactNode
  children: React.ReactNode
}

export default function PageContainer({ title, extra, children }: PageContainerProps) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          {title}
        </Title>
        {extra && <div>{extra}</div>}
      </div>
      {children}
    </div>
  )
}
