import { useState } from 'react'
import { Tabs, Table, Spin } from 'antd'
import { useQuery } from '@tanstack/react-query'
import ReactECharts from 'echarts-for-react'
import type { ColumnsType } from 'antd/es/table'
import PageContainer from '@/components/common/PageContainer'
import { userService } from '@/services/user.service'

interface ISegmentItem {
  label: string
  count: number
  percent: number
}

interface ISegmentsData {
  byAge: ISegmentItem[]
  byActivity: ISegmentItem[]
  byDuration: ISegmentItem[]
}

type TSegmentTab = 'byAge' | 'byActivity' | 'byDuration'

const TAB_LABELS: Record<TSegmentTab, string> = {
  byAge: '按年龄阶段',
  byActivity: '按活跃度',
  byDuration: '按使用时长',
}

const columns: ColumnsType<ISegmentItem> = [
  {
    title: '分组',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: '人数',
    dataIndex: 'count',
    key: 'count',
    sorter: (a, b) => a.count - b.count,
  },
  {
    title: '占比',
    dataIndex: 'percent',
    key: 'percent',
    render: (val: number) => `${val}%`,
    sorter: (a, b) => a.percent - b.percent,
  },
]

function getBarOption(items: ISegmentItem[], title: string) {
  return {
    title: {
      text: title,
      left: 'center',
      textStyle: { fontSize: 14, fontWeight: 500 },
    },
    tooltip: {
      trigger: 'axis' as const,
      formatter: (params: Array<{ name: string; value: number }>) => {
        const item = params[0]
        return `${item.name}<br/>人数：${item.value}`
      },
    },
    xAxis: {
      type: 'category' as const,
      data: items.map((i) => i.label),
      axisLabel: {
        interval: 0,
        rotate: items.some((i) => i.label.length > 5) ? 20 : 0,
        fontSize: 12,
      },
    },
    yAxis: {
      type: 'value' as const,
      name: '人数',
    },
    series: [
      {
        type: 'bar',
        data: items.map((i) => i.count),
        itemStyle: {
          color: '#FF8A5B',
          borderRadius: [4, 4, 0, 0],
        },
        barMaxWidth: 50,
        label: {
          show: true,
          position: 'top' as const,
          formatter: '{c}',
          fontSize: 12,
        },
      },
    ],
    grid: {
      left: 60,
      right: 20,
      bottom: 60,
      top: 50,
    },
  }
}

export default function UserSegmentsPage() {
  const [activeTab, setActiveTab] = useState<TSegmentTab>('byAge')

  const { data, isLoading } = useQuery({
    queryKey: ['user-segments'],
    queryFn: () => userService.getSegments(),
  })

  const segmentsData = data?.data as ISegmentsData | undefined
  const currentItems = segmentsData?.[activeTab] || []

  const tabItems = (Object.keys(TAB_LABELS) as TSegmentTab[]).map((key) => ({
    key,
    label: TAB_LABELS[key],
    children: (
      <Spin spinning={isLoading}>
        <Table<ISegmentItem>
          rowKey="label"
          columns={columns}
          dataSource={currentItems}
          pagination={false}
          size="middle"
          style={{ marginBottom: 24 }}
        />
        {currentItems.length > 0 && (
          <ReactECharts
            option={getBarOption(currentItems, `${TAB_LABELS[key]}分布`)}
            style={{ height: 360 }}
          />
        )}
      </Spin>
    ),
  }))

  return (
    <PageContainer title="用户分组">
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as TSegmentTab)}
        items={tabItems}
      />
    </PageContainer>
  )
}
