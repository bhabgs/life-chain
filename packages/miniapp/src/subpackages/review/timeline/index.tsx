import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import TimelineItem from '@/components/TimelineItem'
import apiClient from '@/services/api-client'
import type { ITimelineGroup } from '@/mock/data/review'
import './index.scss'

export default function TimelinePage() {
  const [timeline, setTimeline] = useState<ITimelineGroup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTimeline()
  }, [])

  const loadTimeline = async () => {
    try {
      const res = await apiClient.get<ITimelineGroup[]>('/review/timeline')
      setTimeline(res.data)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  const handleItemClick = (id: string) => {
    Taro.navigateTo({ url: `/subpackages/detail/memory-detail/index?id=${id}` })
  }

  return (
    <View className='page-timeline'>
      <NavBar title='人生时间轴' />

      <View className='page-timeline__body'>
        {loading ? (
          <View className='page-timeline__loading'>
            <Text>加载中...</Text>
          </View>
        ) : (
          timeline.map((group) => (
            <TimelineItem
              key={group.month}
              month={group.month}
              label={group.label}
              count={group.count}
              highlights={group.highlights}
              onItemClick={handleItemClick}
            />
          ))
        )}
      </View>
    </View>
  )
}
