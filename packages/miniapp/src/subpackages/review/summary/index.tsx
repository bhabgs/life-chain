import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import { reviewService } from '@/services/review.service'
import type { IStageSummary } from '@/services/review.service'
import './index.scss'

export default function SummaryPage() {
  const [activePeriod, setActivePeriod] = useState('30d')
  const [summary, setSummary] = useState<IStageSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSummary()
  }, [activePeriod])

  const loadSummary = async () => {
    setLoading(true)
    try {
      const res = await reviewService.getSummary(activePeriod)
      setSummary(res.data)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  const periods = [
    { key: '30d', label: '近30天' },
    { key: '90d', label: '近90天' },
  ]

  return (
    <View className='page-summary'>
      <NavBar title='阶段总结' />

      {/* 周期切换 */}
      <View className='page-summary__tabs'>
        {periods.map((p) => (
          <View
            key={p.key}
            className={`page-summary__tab ${activePeriod === p.key ? 'page-summary__tab--active' : ''}`}
            onClick={() => setActivePeriod(p.key)}
          >
            <Text>{p.label}</Text>
          </View>
        ))}
      </View>

      {loading ? (
        <View className='page-summary__loading'>
          <Text>加载中...</Text>
        </View>
      ) : summary ? (
        <View className='page-summary__body'>
          {/* 概览数据 */}
          <View className='page-summary__stats'>
            <View className='page-summary__stat'>
              <Text className='page-summary__stat-num'>{summary.memoryCount}</Text>
              <Text className='page-summary__stat-label'>记忆数</Text>
            </View>
            <View className='page-summary__stat'>
              <Text className='page-summary__stat-num'>{summary.chatCount}</Text>
              <Text className='page-summary__stat-label'>对话数</Text>
            </View>
            <View className='page-summary__stat'>
              <Text className='page-summary__stat-num'>
                {Object.keys(summary.emotionDistribution).length}
              </Text>
              <Text className='page-summary__stat-label'>情绪种类</Text>
            </View>
          </View>

          {/* 关键词 */}
          <View className='page-summary__card'>
            <Text className='page-summary__card-title'>关键词</Text>
            <View className='page-summary__keywords'>
              {summary.keywords.map((kw) => (
                <View key={kw} className='page-summary__keyword'>
                  <Text>{kw}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 高光时刻 */}
          <View className='page-summary__card'>
            <Text className='page-summary__card-title'>高光时刻</Text>
            {summary.highlights.map((h, i) => (
              <View key={i} className='page-summary__highlight'>
                <Text className='page-summary__highlight-dot'>•</Text>
                <Text className='page-summary__highlight-text'>{h}</Text>
              </View>
            ))}
          </View>

          {/* 情绪分布 */}
          <View className='page-summary__card'>
            <Text className='page-summary__card-title'>情绪分布</Text>
            {Object.entries(summary.emotionDistribution).map(([emotion, percent]) => (
              <View key={emotion} className='page-summary__emotion-row'>
                <Text className='page-summary__emotion-name'>{emotion}</Text>
                <View className='page-summary__emotion-bar'>
                  <View
                    className='page-summary__emotion-fill'
                    style={{ width: `${percent}%` }}
                  />
                </View>
                <Text className='page-summary__emotion-percent'>{percent}%</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}
    </View>
  )
}
