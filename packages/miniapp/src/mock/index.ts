import { interceptTaroRequest } from './interceptor'

/** 在开发环境下启用 mock 拦截 */
export function setupMock() {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Mock] 开发环境 mock 拦截器已启用')
    interceptTaroRequest()
  }
}
