import { Tabs, Table, Tag, Switch, Spin } from 'antd'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import PageContainer from '@/components/common/PageContainer'
import { systemService } from '@/services/system.service'

// ============ 隐私政策管理 ============
function PrivacyPolicies() {
  const { data, isLoading } = useQuery({
    queryKey: ['privacy-policies'],
    queryFn: () => systemService.getPrivacyPolicies(),
  })
  const columns: ColumnsType<Record<string, unknown>> = [
    { title: '政策名称', dataIndex: 'name', key: 'name' },
    { title: '版本', dataIndex: 'version', key: 'version', width: 80 },
    { title: '生效日期', dataIndex: 'effectiveDate', key: 'effectiveDate' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (v: string) => <Tag color={v === '生效中' ? 'green' : 'default'}>{v}</Tag>,
    },
    { title: '最后更新', dataIndex: 'updatedAt', key: 'updatedAt' },
  ]
  return (
    <Spin spinning={isLoading}>
      <Table rowKey="id" columns={columns} dataSource={(data?.data ?? []) as Record<string, unknown>[]} pagination={false} size="small" />
    </Spin>
  )
}

// ============ 敏感数据监控 ============
function SensitiveDataMonitor() {
  const { data, isLoading } = useQuery({
    queryKey: ['sensitive-data'],
    queryFn: () => systemService.getSensitiveDataStats(),
  })
  const columns: ColumnsType<Record<string, unknown>> = [
    { title: '数据类别', dataIndex: 'category', key: 'category' },
    { title: '记录总数', dataIndex: 'totalRecords', key: 'totalRecords' },
    { title: '加密率', dataIndex: 'encryptionRate', key: 'encryptionRate', render: (v: number) => `${v}%` },
    { title: '最近访问', dataIndex: 'lastAccessed', key: 'lastAccessed' },
    {
      title: '风险等级',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      render: (v: string) => <Tag color={v === '低' ? 'green' : v === '中' ? 'orange' : 'red'}>{v}</Tag>,
    },
  ]
  return (
    <Spin spinning={isLoading}>
      <Table rowKey="category" columns={columns} dataSource={(data?.data ?? []) as Record<string, unknown>[]} pagination={false} size="small" />
    </Spin>
  )
}

// ============ 数据脱敏规则 ============
function DesensitizationRules() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['desensitization-rules'],
    queryFn: () => systemService.getDesensitizationRules(),
  })

  const toggleMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      systemService.updateDesensitizationRule(id, { enabled }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['desensitization-rules'] })
    },
  })

  const columns: ColumnsType<Record<string, unknown>> = [
    { title: '规则名称', dataIndex: 'name', key: 'name' },
    { title: '数据字段', dataIndex: 'field', key: 'field' },
    { title: '脱敏方式', dataIndex: 'method', key: 'method' },
    { title: '示例', dataIndex: 'example', key: 'example' },
    {
      title: '启用',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (v: boolean, record: Record<string, unknown>) => (
        <Switch size="small" checked={v} onChange={(checked) => toggleMutation.mutate({ id: record.id as string, enabled: checked })} />
      ),
    },
  ]
  return (
    <Spin spinning={isLoading}>
      <Table rowKey="id" columns={columns} dataSource={(data?.data ?? []) as Record<string, unknown>[]} pagination={false} size="small" />
    </Spin>
  )
}

// ============ 合规检查报告 ============
function ComplianceReports() {
  const { data, isLoading } = useQuery({
    queryKey: ['compliance-reports'],
    queryFn: () => systemService.getComplianceReports(),
  })
  const columns: ColumnsType<Record<string, unknown>> = [
    { title: '检查项', dataIndex: 'item', key: 'item' },
    {
      title: '结果',
      dataIndex: 'result',
      key: 'result',
      render: (v: string) => <Tag color={v === '通过' ? 'green' : v === '警告' ? 'orange' : 'red'}>{v}</Tag>,
    },
    { title: '说明', dataIndex: 'description', key: 'description', ellipsis: true },
    { title: '检查时间', dataIndex: 'checkedAt', key: 'checkedAt' },
  ]
  return (
    <Spin spinning={isLoading}>
      <Table rowKey="item" columns={columns} dataSource={(data?.data ?? []) as Record<string, unknown>[]} pagination={false} size="small" />
    </Spin>
  )
}

// ============ 主页面 ============
export default function CompliancePage() {
  return (
    <PageContainer title="隐私与合规">
      <Tabs
        items={[
          { key: 'policy', label: '隐私政策', children: <PrivacyPolicies /> },
          { key: 'sensitive', label: '敏感数据监控', children: <SensitiveDataMonitor /> },
          { key: 'desensitization', label: '脱敏规则', children: <DesensitizationRules /> },
          { key: 'report', label: '合规报告', children: <ComplianceReports /> },
        ]}
      />
    </PageContainer>
  )
}
