import { useEffect, useState, useCallback } from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro, { useReachBottom, usePullDownRefresh } from '@tarojs/taro'
import type { IMemory } from '@lifechain/shared'
import MemoryCard from '@/components/MemoryCard'
import LoadMore from '@/components/LoadMore'
import EmptyState from '@/components/EmptyState'
import { memoryService } from '@/services/memory.service'
import './index.scss'

export default function MemoryPage() {
  const [memories, setMemories] = useState<IMemory[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [activeFilter, setActiveFilter] = useState<string>('')

  const pageSize = 10

  const loadMemories = useCallback(
    async (p: number, reset = false) => {
      if (loading) return
      setLoading(true)
      try {
        const res = await memoryService.getList({
          page: p,
          pageSize,
          keyword: keyword || undefined,
          type: (activeFilter as IMemory['type']) || undefined,
        })
        const data = res.data as { list: IMemory[]; total: number }
        setMemories(reset ? data.list : [...memories, ...data.list])
        setTotal(data.total)
        setPage(p)
      } catch {
        // ignore
      } finally {
        setLoading(false)
      }
    },
    [loading, keyword, activeFilter, memories]
  )

  useEffect(() => {
    loadMemories(1, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, activeFilter])

  usePullDownRefresh(() => {
    loadMemories(1, true).then(() => Taro.stopPullDownRefresh())
  })

  useReachBottom(() => {
    if (memories.length < total) {
      loadMemories(page + 1)
    }
  })

  const handleMemoryClick = (id: string) => {
    Taro.navigateTo({ url: `/subpackages/detail/memory-detail/index?id=${id}` })
  }

  const handleAddClick = () => {
    Taro.navigateTo({ url: '/subpackages/capture/text/index' })
  }

  const filters = [
    { key: '', label: '全部' },
    { key: 'text', label: '文字' },
    { key: 'image', label: '图片' },
    { key: 'voice', label: '语音' },
  ]

  const loadMoreStatus = loading
    ? 'loading'
    : memories.length >= total && memories.length > 0
      ? 'noMore'
      : 'idle'

  return (
    <View className='page-memory'>
      {/* 搜索栏 */}
      <View className='page-memory__search'>
        <Input
          className='page-memory__search-input'
          placeholder='搜索记忆...'
          value={keyword}
          onInput={(e) => setKeyword(e.detail.value)}
          confirmType='search'
        />
      </View>

      {/* 筛选 */}
      <View className='page-memory__filters'>
        {filters.map((f) => (
          <View
            key={f.key}
            className={`page-memory__filter ${activeFilter === f.key ? 'page-memory__filter--active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
          >
            <Text>{f.label}</Text>
          </View>
        ))}
      </View>

      {/* 记忆列表 */}
      <View className='page-memory__list'>
        {memories.length === 0 && !loading ? (
          <EmptyState
            icon='📝'
            title='还没有记忆'
            description='记录你的第一段记忆吧'
            actionText='去记录'
            onAction={handleAddClick}
          />
        ) : (
          memories.map((mem) => (
            <MemoryCard
              key={mem.id}
              memory={mem}
              onClick={() => handleMemoryClick(mem.id)}
            />
          ))
        )}
        <LoadMore status={loadMoreStatus} />
      </View>

      {/* FAB */}
      <View className='page-memory__fab' onClick={handleAddClick}>
        <Text className='page-memory__fab-icon'>+</Text>
      </View>
    </View>
  )
}
