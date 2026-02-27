import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import type { IMemory } from '@lifechain/shared'
import { formatDate, truncateText } from '@lifechain/shared'
import NavBar from '@/components/NavBar'
import { memoryService } from '@/services/memory.service'
import { shareService } from '@/services/share.service'
import './index.scss'

export default function ShareCardPage() {
  const [memories, setMemories] = useState<IMemory[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [cardGenerated, setCardGenerated] = useState(false)

  useEffect(() => {
    loadMemories()
  }, [])

  const loadMemories = async () => {
    try {
      const res = await memoryService.getList({ page: 1, pageSize: 20 })
      setMemories((res.data as { items: IMemory[] }).items || [])
    } catch {
      // ignore
    }
  }

  const selectedMemory = memories.find((m) => m.id === selectedId)

  const handleGenerate = async () => {
    if (!selectedId) {
      Taro.showToast({ title: '请先选择一条记忆', icon: 'none' })
      return
    }
    try {
      await shareService.generateCard(selectedId)
      setCardGenerated(true)
      Taro.showToast({ title: '卡片生成成功', icon: 'success' })
    } catch {
      Taro.showToast({ title: '生成失败', icon: 'none' })
    }
  }

  const handleSaveToAlbum = () => {
    Taro.showToast({ title: '已保存到相册', icon: 'success' })
  }

  const handleShare = () => {
    Taro.showToast({ title: '请使用右上角分享', icon: 'none' })
  }

  return (
    <View className='page-share-card'>
      <NavBar title='记忆卡片' />

      {/* 卡片预览 */}
      {cardGenerated && selectedMemory ? (
        <View className='page-share-card__preview'>
          <View className='page-share-card__card'>
            <Text className='page-share-card__card-title'>{selectedMemory.title}</Text>
            <Text className='page-share-card__card-content'>
              {truncateText(selectedMemory.content || '', 100)}
            </Text>
            <View className='page-share-card__card-footer'>
              <Text className='page-share-card__card-date'>
                {formatDate(selectedMemory.createdAt, 'YYYY-MM-DD')}
              </Text>
              <Text className='page-share-card__card-brand'>生命链</Text>
            </View>
          </View>
          <View className='page-share-card__actions'>
            <View className='page-share-card__action-btn' onClick={handleSaveToAlbum}>
              <Text>保存到相册</Text>
            </View>
            <View className='page-share-card__action-btn page-share-card__action-btn--primary' onClick={handleShare}>
              <Text style={{ color: '#fff' }}>分享给好友</Text>
            </View>
          </View>
        </View>
      ) : (
        <>
          {/* 选择记忆 */}
          <View className='page-share-card__section-title'>
            <Text>选择一条记忆来生成卡片</Text>
          </View>
          <View className='page-share-card__list'>
            {memories.map((mem) => (
              <View
                key={mem.id}
                className={`page-share-card__item ${selectedId === mem.id ? 'page-share-card__item--selected' : ''}`}
                onClick={() => setSelectedId(mem.id)}
              >
                <Text className='page-share-card__item-title'>{mem.title}</Text>
                <Text className='page-share-card__item-date'>
                  {formatDate(mem.createdAt, 'MM-DD')}
                </Text>
              </View>
            ))}
          </View>
          <View className='page-share-card__generate' onClick={handleGenerate}>
            <Text className='page-share-card__generate-text'>生成卡片</Text>
          </View>
        </>
      )}
    </View>
  )
}
