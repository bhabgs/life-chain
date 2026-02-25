import { http, HttpResponse, delay } from 'msw'
import {
  mockDeviceModels,
  mockBindings,
  mockMonitorDevices,
  mockCacheConfig,
  mockFirmwareVersions,
} from '../data/hardware'

const API = '/api/v1'

export const hardwareHandlers = [
  // 设备型号管理
  http.get(`${API}/hardware/models`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockDeviceModels })
  }),

  // 设备绑定记录
  http.get(`${API}/hardware/bindings`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockBindings })
  }),

  // 设备状态监控
  http.get(`${API}/hardware/monitor`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockMonitorDevices })
  }),

  // 离线缓存管理
  http.get(`${API}/hardware/cache`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockCacheConfig })
  }),

  // 固件版本管理
  http.get(`${API}/hardware/firmware`, async () => {
    await delay(300)
    return HttpResponse.json({ code: 0, message: 'success', data: mockFirmwareVersions })
  }),
]
