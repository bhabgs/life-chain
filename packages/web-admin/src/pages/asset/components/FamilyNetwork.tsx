import { Table, Tag, Button, Spin, Card, Row, Col, Statistic } from 'antd'
import { TeamOutlined, ShareAltOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import { assetService } from '@/services/asset.service'

interface IFamilyNode {
  id: string
  familyName: string
  memberCount: number
  createdAt: string
  status: string
}

interface IMemorialRequest {
  id: string
  userName: string
  familyName: string
  type: string
  status: string
  requestedAt: string
}

export default function FamilyNetwork() {
  const { data: familyData, isLoading: familyLoading } = useQuery({
    queryKey: ['family-networks'],
    queryFn: () => assetService.getFamilyNetworks(),
  })

  const { data: memorialData, isLoading: memorialLoading } = useQuery({
    queryKey: ['memorial-requests'],
    queryFn: () => assetService.getMemorialRequests(),
  })

  const families = (familyData?.data ?? []) as IFamilyNode[]
  const memorials = (memorialData?.data ?? []) as IMemorialRequest[]

  const familyColumns: ColumnsType<IFamilyNode> = [
    { title: '家族名称', dataIndex: 'familyName', key: 'familyName' },
    { title: '成员数', dataIndex: 'memberCount', key: 'memberCount', width: 80 },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (v: string) => <Tag color={v === '活跃' ? 'green' : 'default'}>{v}</Tag>,
    },
    {
      title: '操作',
      key: 'action',
      render: () => <Button type="link" size="small">查看图谱</Button>,
    },
  ]

  const memorialColumns: ColumnsType<IMemorialRequest> = [
    { title: '申请人', dataIndex: 'userName', key: 'userName' },
    { title: '所属家族', dataIndex: 'familyName', key: 'familyName' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (v: string) => (
        <Tag color={v === '已通过' ? 'green' : v === '待审核' ? 'orange' : 'red'}>{v}</Tag>
      ),
    },
    { title: '申请时间', dataIndex: 'requestedAt', key: 'requestedAt' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic title="家族总数" value={families.length} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic title="总成员数" value={families.reduce((sum, f) => sum + f.memberCount, 0)} prefix={<ShareAltOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card title="家族关系图谱" size="small">
        <Spin spinning={familyLoading}>
          <Table<IFamilyNode> rowKey="id" columns={familyColumns} dataSource={families} pagination={false} size="small" />
        </Spin>
      </Card>

      <Card title="数字纪念馆审核" size="small">
        <Spin spinning={memorialLoading}>
          <Table<IMemorialRequest> rowKey="id" columns={memorialColumns} dataSource={memorials} pagination={false} size="small" />
        </Spin>
      </Card>
    </div>
  )
}
