import { Tabs, Table, Tag, Card, Row, Col, Progress, Spin } from 'antd'
import { useQuery } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import PageContainer from '@/components/common/PageContainer'
import { hardwareService } from '@/services/hardware.service'

// ============ 设备型号管理 ============
function DeviceModels() {
  const { data, isLoading } = useQuery({
    queryKey: ['hardware-models'],
    queryFn: () => hardwareService.getModels(),
  })
  const columns: ColumnsType<Record<string, unknown>> = [
    { title: '型号名称', dataIndex: 'name', key: 'name' },
    { title: '设备类型', dataIndex: 'type', key: 'type' },
    { title: '适用阶段', dataIndex: 'stage', key: 'stage' },
    { title: '规格参数', dataIndex: 'specs', key: 'specs', ellipsis: true },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (v: string) => <Tag color={v === '在售' ? 'green' : v === '停产' ? 'default' : 'blue'}>{v}</Tag>,
    },
  ]
  return (
    <Spin spinning={isLoading}>
      <Table rowKey="id" columns={columns} dataSource={(data?.data ?? []) as Record<string, unknown>[]} pagination={false} size="small" />
    </Spin>
  )
}

// ============ 设备绑定记录 ============
function DeviceBindings() {
  const { data, isLoading } = useQuery({
    queryKey: ['hardware-bindings'],
    queryFn: () => hardwareService.getBindings(),
  })
  const columns: ColumnsType<Record<string, unknown>> = [
    { title: '用户', dataIndex: 'userName', key: 'userName' },
    { title: '设备型号', dataIndex: 'modelName', key: 'modelName' },
    { title: '设备ID', dataIndex: 'deviceId', key: 'deviceId' },
    { title: '绑定时间', dataIndex: 'boundAt', key: 'boundAt' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (v: string) => <Tag color={v === '已绑定' ? 'green' : 'default'}>{v}</Tag>,
    },
  ]
  return (
    <Spin spinning={isLoading}>
      <Table rowKey="id" columns={columns} dataSource={(data?.data ?? []) as Record<string, unknown>[]} pagination={false} size="small" />
    </Spin>
  )
}

// ============ 设备状态监控 ============
function DeviceMonitor() {
  const { data, isLoading } = useQuery({
    queryKey: ['hardware-monitor'],
    queryFn: () => hardwareService.getMonitorData(),
  })
  const devices = (data?.data ?? []) as Array<Record<string, unknown>>
  return (
    <Spin spinning={isLoading}>
      <Row gutter={[16, 16]}>
        {devices.map((d) => (
          <Col xs={24} sm={12} lg={8} key={d.id as string}>
            <Card size="small" title={d.name as string} extra={<Tag color={d.online ? 'green' : 'red'}>{d.online ? '在线' : '离线'}</Tag>}>
              <div style={{ marginBottom: 8 }}>用户：{d.userName as string}</div>
              <div style={{ marginBottom: 8 }}>
                健康度：<Progress percent={d.health as number} size="small" strokeColor={(d.health as number) > 80 ? '#52c41a' : '#faad14'} />
              </div>
              <div>最后上报：{d.lastSeen as string}</div>
            </Card>
          </Col>
        ))}
      </Row>
    </Spin>
  )
}

// ============ 离线缓存管理 ============
function OfflineCache() {
  const { data, isLoading } = useQuery({
    queryKey: ['hardware-cache'],
    queryFn: () => hardwareService.getCacheConfig(),
  })
  const items = (data?.data ?? []) as Array<Record<string, unknown>>
  const columns: ColumnsType<Record<string, unknown>> = [
    { title: '设备', dataIndex: 'deviceName', key: 'deviceName' },
    { title: '缓存总量', dataIndex: 'totalSize', key: 'totalSize' },
    { title: '已用空间', dataIndex: 'usedSize', key: 'usedSize' },
    {
      title: '使用率',
      dataIndex: 'usagePercent',
      key: 'usagePercent',
      render: (v: number) => <Progress percent={v} size="small" style={{ width: 120 }} />,
    },
    { title: '最后同步', dataIndex: 'lastSync', key: 'lastSync' },
  ]
  return (
    <Spin spinning={isLoading}>
      <Table rowKey="deviceName" columns={columns} dataSource={items} pagination={false} size="small" />
    </Spin>
  )
}

// ============ 固件版本管理 ============
function FirmwareVersions() {
  const { data, isLoading } = useQuery({
    queryKey: ['hardware-firmware'],
    queryFn: () => hardwareService.getFirmwareVersions(),
  })
  const columns: ColumnsType<Record<string, unknown>> = [
    { title: '版本号', dataIndex: 'version', key: 'version' },
    { title: '适用型号', dataIndex: 'targetModel', key: 'targetModel' },
    { title: '发布时间', dataIndex: 'releasedAt', key: 'releasedAt' },
    { title: '更新内容', dataIndex: 'changelog', key: 'changelog', ellipsis: true },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (v: string) => <Tag color={v === '已发布' ? 'green' : v === '测试中' ? 'blue' : 'default'}>{v}</Tag>,
    },
    { title: '升级设备数', dataIndex: 'updateCount', key: 'updateCount', width: 110 },
  ]
  return (
    <Spin spinning={isLoading}>
      <Table rowKey="version" columns={columns} dataSource={(data?.data ?? []) as Record<string, unknown>[]} pagination={false} size="small" />
    </Spin>
  )
}

// ============ 主页面 ============
export default function HardwarePage() {
  return (
    <PageContainer title="硬件设备管理">
      <Tabs
        items={[
          { key: 'models', label: '设备型号', children: <DeviceModels /> },
          { key: 'bindings', label: '绑定记录', children: <DeviceBindings /> },
          { key: 'monitor', label: '状态监控', children: <DeviceMonitor /> },
          { key: 'cache', label: '离线缓存', children: <OfflineCache /> },
          { key: 'firmware', label: '固件版本', children: <FirmwareVersions /> },
        ]}
      />
    </PageContainer>
  )
}
