import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Input, Select, Slider, Switch, Button, Card, Row, Col, Spin, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useQuery, useMutation } from '@tanstack/react-query'
import PageContainer from '@/components/common/PageContainer'
import { personalityService } from '@/services/personality.service'
import type { IPersonalityTemplateRequest, TRelationshipType } from '@lifechain/shared'
import { RELATIONSHIP_TYPES } from '@lifechain/shared'

const REPLY_LENGTH_OPTIONS = [
  { label: '简短', value: 'short' },
  { label: '适中', value: 'medium' },
  { label: '详细', value: 'long' },
]

const EMOJI_USAGE_OPTIONS = [
  { label: '不使用', value: 'none' },
  { label: '适度', value: 'moderate' },
  { label: '频繁', value: 'frequent' },
]

const FORMAL_LEVEL_OPTIONS = [
  { label: '随意', value: 'casual' },
  { label: '适中', value: 'moderate' },
  { label: '正式', value: 'formal' },
]

const QUESTION_FREQUENCY_OPTIONS = [
  { label: '较少', value: 'low' },
  { label: '适中', value: 'moderate' },
  { label: '频繁', value: 'high' },
]

const relationshipOptions = Object.entries(RELATIONSHIP_TYPES).map(([value, config]) => ({
  label: config.label,
  value: value as TRelationshipType,
}))

export default function PersonalityTemplateEditorPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [form] = Form.useForm<IPersonalityTemplateRequest>()
  const isEdit = !!id

  const { data, isLoading } = useQuery({
    queryKey: ['personality-template', id],
    queryFn: () => personalityService.getTemplate(id!),
    enabled: isEdit,
  })

  useEffect(() => {
    if (data?.data) {
      const { name, description, bigFive, customTraits, behaviorStyle, relationship, isDefault } =
        data.data
      form.setFieldsValue({
        name,
        description,
        bigFive,
        customTraits,
        behaviorStyle,
        relationship,
        isDefault,
      })
    }
  }, [data, form])

  const createMutation = useMutation({
    mutationFn: (values: IPersonalityTemplateRequest) =>
      personalityService.createTemplate(values),
    onSuccess: () => {
      message.success('创建成功')
      navigate('/personality/templates')
    },
    onError: () => {
      message.error('创建失败')
    },
  })

  const updateMutation = useMutation({
    mutationFn: (values: Partial<IPersonalityTemplateRequest>) =>
      personalityService.updateTemplate(id!, values),
    onSuccess: () => {
      message.success('更新成功')
      navigate('/personality/templates')
    },
    onError: () => {
      message.error('更新失败')
    },
  })

  const handleSubmit = (values: IPersonalityTemplateRequest) => {
    if (isEdit) {
      updateMutation.mutate(values)
    } else {
      createMutation.mutate(values)
    }
  }

  const saving = createMutation.isPending || updateMutation.isPending

  if (isEdit && isLoading) {
    return (
      <PageContainer
        title="编辑人格模板"
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

  return (
    <PageContainer
      title={isEdit ? '编辑人格模板' : '新建人格模板'}
      extra={
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          返回
        </Button>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          bigFive: {
            openness: 0.5,
            conscientiousness: 0.5,
            extraversion: 0.5,
            agreeableness: 0.5,
            neuroticism: 0.5,
          },
          customTraits: {
            warmth: 0.5,
            rationality: 0.5,
            humorousness: 0.5,
          },
          behaviorStyle: {
            replyLength: 'medium',
            emojiUsage: 'moderate',
            formalLevel: 'moderate',
            questionFrequency: 'moderate',
          },
          isDefault: false,
        }}
      >
        <Card title="基本信息" style={{ marginBottom: 16 }}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="名称"
                name="name"
                rules={[{ required: true, message: '请输入模板名称' }]}
              >
                <Input placeholder="请输入模板名称" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="关系类型"
                name="relationship"
                rules={[{ required: true, message: '请选择关系类型' }]}
              >
                <Select placeholder="请选择关系类型" options={relationshipOptions} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="描述"
                name="description"
                rules={[{ required: true, message: '请输入模板描述' }]}
              >
                <Input.TextArea rows={3} placeholder="请输入模板描述" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="五大人格维度" style={{ marginBottom: 16 }}>
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item label="开放性" name={['bigFive', 'openness']}>
                <Slider min={0} max={1} step={0.01} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="尽责性" name={['bigFive', 'conscientiousness']}>
                <Slider min={0} max={1} step={0.01} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="外向性" name={['bigFive', 'extraversion']}>
                <Slider min={0} max={1} step={0.01} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="宜人性" name={['bigFive', 'agreeableness']}>
                <Slider min={0} max={1} step={0.01} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="神经质" name={['bigFive', 'neuroticism']}>
                <Slider min={0} max={1} step={0.01} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="自定义维度" style={{ marginBottom: 16 }}>
          <Row gutter={24}>
            <Col xs={24} md={8}>
              <Form.Item label="温暖度" name={['customTraits', 'warmth']}>
                <Slider min={0} max={1} step={0.01} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="理性度" name={['customTraits', 'rationality']}>
                <Slider min={0} max={1} step={0.01} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="幽默感" name={['customTraits', 'humorousness']}>
                <Slider min={0} max={1} step={0.01} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="行为风格" style={{ marginBottom: 16 }}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="回复长度" name={['behaviorStyle', 'replyLength']}>
                <Select options={REPLY_LENGTH_OPTIONS} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="表情使用" name={['behaviorStyle', 'emojiUsage']}>
                <Select options={EMOJI_USAGE_OPTIONS} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="正式程度" name={['behaviorStyle', 'formalLevel']}>
                <Select options={FORMAL_LEVEL_OPTIONS} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="提问频率" name={['behaviorStyle', 'questionFrequency']}>
                <Select options={QUESTION_FREQUENCY_OPTIONS} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Form.Item label="设为默认模板" name="isDefault" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Card>

        <div style={{ textAlign: 'right' }}>
          <Button style={{ marginRight: 12 }} onClick={() => navigate(-1)}>
            取消
          </Button>
          <Button type="primary" htmlType="submit" loading={saving}>
            {isEdit ? '保存修改' : '创建模板'}
          </Button>
        </div>
      </Form>
    </PageContainer>
  )
}
