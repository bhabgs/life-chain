import { View, Text, Image } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { memoryService } from '@/services/memory.service'
import { formatDate, getRelativeTime, truncateText } from '@lifechain/shared'
import type { IMemory } from '@lifechain/shared'
import NavBar from '@/components/NavBar'
import './index.scss'

const MEMORY_TYPE_MAP: Record<string, { icon: string; label: string }> = {
  text: { icon: '📝', label: '文字' },
  image: { icon: '📷', label: '图片' },
  voice: { icon: '🎤', label: '语音' },
  video: { icon: '🎬', label: '视频' },
}

const EMOTION_MAP: Record<string, { emoji: string; color: string }> = {
  happy: { emoji: '😊', color: '#52C41A' },
  sad: { emoji: '😢', color: '#5BA3FF' },
  excited: { emoji: '🎉', color: '#FF8A5B' },
  calm: { emoji: '😌', color: '#8C8C8C' },
  anxious: { emoji: '😰', color: '#FAAD14' },
  grateful: { emoji: '🙏', color: '#FF69B4' },
  nostalgic: { emoji: '🌅', color: '#9B59B6' },
  proud: { emoji: '💪', color: '#E74C3C' },
  confused: { emoji: '🤔', color: '#95A5A6' },
  hopeful: { emoji: '🌟', color: '#F1C40F' },
}

export default function MemoryDetailPage() {
  const router = useRouter()
  const [memory, setMemory] = useState<IMemory | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = router.params.id
    if (id) {
      loadMemory(id)
    }
  }, [router.params.id])

  const loadMemory = async (id: string) => {
    try {
      setLoading(true)
      const res = await memoryService.getById(id)
      if (res.data) {
        setMemory(res.data)
      }
    } catch {
      Taro.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    Taro.showToast({ title: '编辑功能开发中', icon: 'none' })
  }

  const handleDelete = () => {
    Taro.showModal({
      title: '确认删除',
      content: '删除后将无法恢复，确定要删除这条记忆吗？',
      confirmColor: '#F5222D',
      success: async (res) => {
        if (res.confirm && memory) {
          try {
            await memoryService.delete(memory.id)
            Taro.showToast({ title: '已删除', icon: 'success' })
            setTimeout(() => Taro.navigateBack(), 1500)
          } catch {
            Taro.showToast({ title: '删除失败', icon: 'none' })
          }
        }
      },
    })
  }

  const handleShare = () => {
    Taro.showToast({ title: '分享功能开发中', icon: 'none' })
  }

  if (loading) {
    return (
      <View className="page-memory-detail">
        <NavBar title="记忆详情" />
        <View className="page-memory-detail__loading">
          <Text>加载中...</Text>
        </View>
      </View>
    )
  }

  if (!memory) {
    return (
      <View className="page-memory-detail">
        <NavBar title="记忆详情" />
        <View className="page-memory-detail__empty">
          <Text className="page-memory-detail__empty-icon">📭</Text>
          <Text className="page-memory-detail__empty-text">记忆不存在或已被删除</Text>
        </View>
      </View>
    )
  }

  const typeInfo = MEMORY_TYPE_MAP[memory.type] || { icon: '📝', label: '文字' }
  const emotionInfo = memory.emotionLabel ? EMOTION_MAP[memory.emotionLabel] : null

  return (
    <View className="page-memory-detail">
      <NavBar
        title="记忆详情"
        rightText="编辑"
        onRightClick={handleEdit}
      />

      <View className="page-memory-detail__body">
        {/* 标题区域 */}
        <View className="page-memory-detail__header">
          <View className="page-memory-detail__type-badge">
            <Text className="page-memory-detail__type-icon">{typeInfo.icon}</Text>
            <Text className="page-memory-detail__type-label">{typeInfo.label}</Text>
          </View>
          <Text className="page-memory-detail__title">{memory.title}</Text>
          <Text className="page-memory-detail__time">
            {formatDate(memory.createdAt)} · {getRelativeTime(memory.createdAt)}
          </Text>
        </View>

        {/* 图片区域 */}
        {memory.mediaUrls && memory.mediaUrls.length > 0 && (
          <View className="page-memory-detail__images">
            {memory.mediaUrls.map((url, index) => (
              <Image
                key={index}
                className="page-memory-detail__image"
                src={url}
                mode="aspectFill"
                onClick={() => {
                  Taro.previewImage({
                    current: url,
                    urls: memory.mediaUrls || [],
                  })
                }}
              />
            ))}
          </View>
        )}

        {/* 内容区域 */}
        <View className="page-memory-detail__content">
          <Text className="page-memory-detail__content-text">{memory.content}</Text>
        </View>

        {/* 标签信息 */}
        <View className="page-memory-detail__meta">
          {/* 情绪标签 */}
          {emotionInfo && (
            <View className="page-memory-detail__meta-item">
              <Text className="page-memory-detail__meta-label">情绪</Text>
              <View className="page-memory-detail__emotion-tag">
                <Text>{emotionInfo.emoji}</Text>
                <Text className="page-memory-detail__emotion-text">{memory.emotionLabel}</Text>
              </View>
            </View>
          )}

          {/* 人生阶段 */}
          {memory.lifeStage && (
            <View className="page-memory-detail__meta-item">
              <Text className="page-memory-detail__meta-label">人生阶段</Text>
              <Text className="page-memory-detail__meta-value">{memory.lifeStage}</Text>
            </View>
          )}

          {/* 隐私等级 */}
          {memory.privacyLevel && (
            <View className="page-memory-detail__meta-item">
              <Text className="page-memory-detail__meta-label">隐私等级</Text>
              <Text className="page-memory-detail__meta-value">
                {memory.privacyLevel === 'private' ? '🔒 私密' :
                 memory.privacyLevel === 'family' ? '👨‍👩‍👧‍👦 家人可见' :
                 memory.privacyLevel === 'public' ? '🌍 公开' : memory.privacyLevel}
              </Text>
            </View>
          )}

          {/* 标签 */}
          {memory.tags && memory.tags.length > 0 && (
            <View className="page-memory-detail__meta-item">
              <Text className="page-memory-detail__meta-label">标签</Text>
              <View className="page-memory-detail__tags">
                {memory.tags.map((tag, index) => (
                  <Text key={index} className="page-memory-detail__tag">#{tag}</Text>
                ))}
              </View>
            </View>
          )}

          {/* 关联人物 */}
          {memory.people && memory.people.length > 0 && (
            <View className="page-memory-detail__meta-item">
              <Text className="page-memory-detail__meta-label">关联人物</Text>
              <View className="page-memory-detail__people">
                {memory.people.map((person, index) => (
                  <Text key={index} className="page-memory-detail__person">👤 {person}</Text>
                ))}
              </View>
            </View>
          )}

          {/* 地点 */}
          {memory.location && (
            <View className="page-memory-detail__meta-item">
              <Text className="page-memory-detail__meta-label">地点</Text>
              <Text className="page-memory-detail__meta-value">📍 {memory.location}</Text>
            </View>
          )}
        </View>

        {/* 操作按钮 */}
        <View className="page-memory-detail__actions">
          <View className="page-memory-detail__action page-memory-detail__action--share" onClick={handleShare}>
            <Text className="page-memory-detail__action-icon">📤</Text>
            <Text className="page-memory-detail__action-text">分享</Text>
          </View>
          <View className="page-memory-detail__action page-memory-detail__action--delete" onClick={handleDelete}>
            <Text className="page-memory-detail__action-icon">🗑️</Text>
            <Text className="page-memory-detail__action-text">删除</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
