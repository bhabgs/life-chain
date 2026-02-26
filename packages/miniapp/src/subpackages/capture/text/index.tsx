import { useState } from 'react'
import { View, Text, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { EMOTION_LABELS } from '@lifechain/shared'
import type { TEmotionLabel } from '@lifechain/shared'
import TagSelector from '@/components/TagSelector'
import NavBar from '@/components/NavBar'
import { memoryService } from '@/services/memory.service'
import './index.scss'

const emotionTags = Object.entries(EMOTION_LABELS).map(([key, val]) => ({
  key,
  label: val.label,
  color: val.color,
}))

export default function TextCapturePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!content.trim()) {
      Taro.showToast({ title: '请输入内容', icon: 'none' })
      return
    }
    setSaving(true)
    try {
      await memoryService.create({
        type: 'text',
        title: title || '文字记忆',
        content,
        emotion: selectedEmotions[0] as TEmotionLabel,
        tags: selectedEmotions,
      })
      Taro.showToast({ title: '记录成功', icon: 'success' })
      setTimeout(() => Taro.navigateBack(), 1500)
    } catch {
      Taro.showToast({ title: '保存失败', icon: 'none' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <View className='page-text-capture'>
      <NavBar title='文字记录' rightText='保存' onRightClick={handleSave} />

      <View className='page-text-capture__form'>
        <Textarea
          className='page-text-capture__title-input'
          placeholder='给这段记忆起个标题...'
          value={title}
          onInput={(e) => setTitle(e.detail.value)}
          maxlength={50}
          autoHeight
        />
        <Textarea
          className='page-text-capture__content-input'
          placeholder='写下你此刻的想法和感受...'
          value={content}
          onInput={(e) => setContent(e.detail.value)}
          maxlength={2000}
          autoHeight
        />
        <Text className='page-text-capture__count'>{content.length}/2000</Text>
      </View>

      <View className='page-text-capture__emotion'>
        <Text className='page-text-capture__label'>此刻的情绪</Text>
        <TagSelector
          tags={emotionTags}
          selected={selectedEmotions}
          onChange={setSelectedEmotions}
        />
      </View>

      <View
        className={`page-text-capture__save-btn ${saving ? 'page-text-capture__save-btn--disabled' : ''}`}
        onClick={handleSave}
      >
        <Text className='page-text-capture__save-text'>{saving ? '保存中...' : '保存记忆'}</Text>
      </View>
    </View>
  )
}
