import { Tag, Switch, Card, Descriptions, Spin, App } from 'antd'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import PageContainer from '@/components/common/PageContainer'
import { systemService } from '@/services/system.service'

interface IThirdPartyService {
  id: string
  name: string
  category: string
  provider: string
  status: string
  enabled: boolean
  apiEndpoint: string
  healthCheck: string
  lastChecked: string
  monthlyQuota: number
  usedQuota: number
}

export default function ThirdPartyPage() {
  const { message } = App.useApp()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['third-party-services'],
    queryFn: () => systemService.getThirdPartyServices(),
  })

  const toggleMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      systemService.updateThirdPartyService(id, { enabled }),
    onSuccess: () => {
      message.success('状态已更新')
      queryClient.invalidateQueries({ queryKey: ['third-party-services'] })
    },
  })

  const services = (data?.data ?? []) as IThirdPartyService[]

  return (
    <PageContainer title="第三方服务配置">
      <Spin spinning={isLoading}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {services.map((svc) => (
            <Card
              key={svc.id}
              size="small"
              title={svc.name}
              extra={
                <Switch
                  checked={svc.enabled}
                  checkedChildren="启用"
                  unCheckedChildren="停用"
                  onChange={(checked) => toggleMutation.mutate({ id: svc.id, enabled: checked })}
                />
              }
            >
              <Descriptions size="small" column={2}>
                <Descriptions.Item label="类别">{svc.category}</Descriptions.Item>
                <Descriptions.Item label="提供商">{svc.provider}</Descriptions.Item>
                <Descriptions.Item label="API 端点">{svc.apiEndpoint}</Descriptions.Item>
                <Descriptions.Item label="健康检查">
                  <Tag color={svc.healthCheck === '正常' ? 'green' : svc.healthCheck === '异常' ? 'red' : 'orange'}>
                    {svc.healthCheck}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="月配额">{svc.monthlyQuota.toLocaleString()}</Descriptions.Item>
                <Descriptions.Item label="已使用">
                  {svc.usedQuota.toLocaleString()} ({Math.round((svc.usedQuota / svc.monthlyQuota) * 100)}%)
                </Descriptions.Item>
                <Descriptions.Item label="最后检查">{svc.lastChecked}</Descriptions.Item>
              </Descriptions>
            </Card>
          ))}
        </div>
      </Spin>
    </PageContainer>
  )
}
