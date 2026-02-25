import { useParams, useNavigate } from 'react-router-dom'
import { Descriptions, Tag, Card, Button, Image, Spin, Space, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import PageContainer from '@/components/common/PageContainer'
import { memoryService } from '@/services/memory.service'
import { MEMORY_TYPES, LIFE_STAGES, PRIVACY_LEVELS, EMOTION_LABELS } from '@lifechain/shared'
import type { IMemory } from '@lifechain/shared'
import { formatDateTime } from '@/utils'

const { Paragraph } = Typography

const typeColorMap: Record<string, string> = {
  text: 'blue',
  voice: 'purple',
  image: 'green',
  video: 'orange',
  event: 'cyan',
}

const stageColorMap: Record<string, string> = {
  childhood: 'gold',
  adolescence: 'lime',
  youth: 'blue',
  middle_age: 'orange',
  old_age: 'purple',
}

export default function MemoryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['memory', id],
    queryFn: () => memoryService.getDetail(id!),
    enabled: !!id,
  })

  const memory: IMemory | undefined = data?.data

  if (isLoading) {
    return (
      <PageContainer title="记忆详情">
        <div style={{ textAlign: 'center', padding: 80 }}>
          <Spin size="large" />
        </div>
      </PageContainer>
    )
  }

  if (!memory) {
    return (
      <PageContainer title="记忆详情">
        <div style={{ textAlign: 'center', padding: 80 }}>记忆不存在</div>
      </PageContainer>
    )
  }

  const emotionConfig =
    memory.emotion && EMOTION_LABELS[memory.emotion as keyof typeof EMOTION_LABELS]

  return (
    <PageContainer
      title="记忆详情"
      extra={
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          返回
        </Button>
      }
    >
      <Card bordered={false}>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="标题" span={2}>
            {memory.title || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="类型">
            <Tag color={typeColorMap[memory.type]}>
              {MEMORY_TYPES[memory.type]?.label}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="阶段">
            {memory.stage ? (
              <Tag color={stageColorMap[memory.stage]}>
                {LIFE_STAGES[memory.stage]?.label}
              </Tag>
            ) : (
              '-'
            )}
          </Descriptions.Item>
          <Descriptions.Item label="情绪">
            {emotionConfig ? (
              <Tag color={emotionConfig.color}>{emotionConfig.label}</Tag>
            ) : (
              memory.emotion || '-'
            )}
          </Descriptions.Item>
          <Descriptions.Item label="隐私等级">
            {PRIVACY_LEVELS[memory.privacyLevel]?.label ?? '-'}
          </Descriptions.Item>
          <Descriptions.Item label="所属用户">{memory.userId}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{formatDateTime(memory.createdAt)}</Descriptions.Item>
          <Descriptions.Item label="内容" span={2}>
            <Paragraph style={{ marginBottom: 0, whiteSpace: 'pre-wrap' }}>
              {memory.content || '-'}
            </Paragraph>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {memory.metadata && (
        <Card title="元数据" bordered={false} style={{ marginTop: 16 }}>
          <Descriptions column={2} bordered>
            <Descriptions.Item label="地点">
              {memory.metadata.location || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="天气">
              {memory.metadata.weather || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="人物" span={2}>
              <Space>
                {memory.metadata.people?.length
                  ? memory.metadata.people.map((p) => <Tag key={p}>{p}</Tag>)
                  : '-'}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="标签" span={2}>
              <Space>
                {memory.metadata.tags?.length
                  ? memory.metadata.tags.map((t) => (
                      <Tag key={t} color="blue">
                        {t}
                      </Tag>
                    ))
                  : '-'}
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}

      {memory.mediaUrls?.length > 0 && (
        <Card title="媒体文件" bordered={false} style={{ marginTop: 16 }}>
          <Image.PreviewGroup>
            <Space wrap>
              {memory.mediaUrls.map((url, index) => (
                <Image
                  key={index}
                  width={160}
                  height={160}
                  src={url}
                  style={{ objectFit: 'cover', borderRadius: 8 }}
                />
              ))}
            </Space>
          </Image.PreviewGroup>
        </Card>
      )}
    </PageContainer>
  )
}
