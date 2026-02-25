import { Table, Tag, Button, Card, Select, DatePicker, Space, Spin, App } from 'antd'
import { DownloadOutlined, FileExcelOutlined, FilePdfOutlined } from '@ant-design/icons'
import { useQuery, useMutation } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import { analysisService } from '@/services/analysis.service'

interface IReport {
  id: string
  name: string
  type: string
  format: string
  generatedAt: string
  size: string
  status: string
}

export default function ReportExport() {
  const { message } = App.useApp()

  const { data, isLoading } = useQuery({
    queryKey: ['analysis', 'reports'],
    queryFn: () => analysisService.getReports(),
  })

  const generateMutation = useMutation({
    mutationFn: (params: { type: string; format: string }) => analysisService.generateReport(params),
    onSuccess: () => message.success('报表生成任务已提交'),
  })

  const formatIcon = (format: string) =>
    format === 'Excel' ? <FileExcelOutlined style={{ color: '#52c41a' }} /> : <FilePdfOutlined style={{ color: '#f5222d' }} />

  const columns: ColumnsType<IReport> = [
    { title: '报表名称', dataIndex: 'name', key: 'name' },
    { title: '类型', dataIndex: 'type', key: 'type', width: 120 },
    {
      title: '格式',
      dataIndex: 'format',
      key: 'format',
      width: 80,
      render: (v: string) => <Space>{formatIcon(v)}{v}</Space>,
    },
    { title: '生成时间', dataIndex: 'generatedAt', key: 'generatedAt' },
    { title: '文件大小', dataIndex: 'size', key: 'size', width: 100 },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (v: string) => <Tag color={v === '已完成' ? 'green' : v === '生成中' ? 'blue' : 'red'}>{v}</Tag>,
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      render: (_, record) =>
        record.status === '已完成' ? (
          <Button type="link" size="small" icon={<DownloadOutlined />}>下载</Button>
        ) : null,
    },
  ]

  return (
    <>
      <Card size="small" style={{ marginBottom: 16 }}>
        <Space wrap>
          <Select defaultValue="用户分析" style={{ width: 140 }} options={[
            { value: '用户分析', label: '用户分析' },
            { value: '记忆分析', label: '记忆分析' },
            { value: '情绪分析', label: '情绪分析' },
            { value: '综合报告', label: '综合报告' },
          ]} />
          <Select defaultValue="Excel" style={{ width: 100 }} options={[
            { value: 'Excel', label: 'Excel' },
            { value: 'PDF', label: 'PDF' },
          ]} />
          <DatePicker.RangePicker />
          <Button
            type="primary"
            onClick={() => generateMutation.mutate({ type: '综合报告', format: 'Excel' })}
            loading={generateMutation.isPending}
          >
            生成报表
          </Button>
        </Space>
      </Card>

      <Spin spinning={isLoading}>
        <Table<IReport>
          rowKey="id"
          columns={columns}
          dataSource={(data?.data ?? []) as IReport[]}
          pagination={{ showTotal: (t) => `共 ${t} 条` }}
        />
      </Spin>
    </>
  )
}
