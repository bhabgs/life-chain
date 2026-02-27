import type { IRouteEntry } from '../helpers'
import { ok } from '../helpers'
import { mockTimelineData, mockStageSummaries } from '../data/review'

export const reviewHandlers: IRouteEntry[] = [
  // 时间轴数据
  {
    method: 'GET',
    pattern: '/review/timeline',
    handler: () => ok(mockTimelineData),
  },

  // 阶段总结
  {
    method: 'GET',
    pattern: '/review/summary',
    handler: (req) => {
      const period = req.query.period || '30d'
      const summary = mockStageSummaries.find((s) => s.period === period) || mockStageSummaries[0]
      return ok(summary)
    },
  },
]
