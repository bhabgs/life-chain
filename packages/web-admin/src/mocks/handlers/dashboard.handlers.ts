import { http, HttpResponse, delay } from 'msw'
import {
  mockDashboardStats,
  mockUserGrowth,
  mockMemoryTrend,
  mockInteraction,
  mockStageDistribution,
  mockAlerts,
} from '../data/dashboard-stats'

const API = '/api/v1'

export const dashboardHandlers = [
  http.get(`${API}/dashboard/stats`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockDashboardStats })
  }),

  http.get(`${API}/dashboard/user-growth`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockUserGrowth })
  }),

  http.get(`${API}/dashboard/memory-trend`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockMemoryTrend })
  }),

  http.get(`${API}/dashboard/interaction`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockInteraction })
  }),

  http.get(`${API}/dashboard/stage-distribution`, async () => {
    await delay(200)
    return HttpResponse.json({ code: 0, message: 'success', data: mockStageDistribution })
  }),

  http.get(`${API}/dashboard/alerts`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockAlerts })
  }),
]
