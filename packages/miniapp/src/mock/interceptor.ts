import Taro from '@tarojs/taro'
import { matchHandler } from './handlers'

type TaroRequestParams = Parameters<typeof Taro.request>[0]
type TaroRequestResult = ReturnType<typeof Taro.request>

// 保存原始 request 引用
const originalRequest = Taro.request.bind(Taro)

/** 模拟网络延迟 */
function randomDelay(): Promise<void> {
  const ms = 200 + Math.random() * 300
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** 安装 mock 拦截器 */
export function interceptTaroRequest() {
  // @ts-expect-error — 覆盖 Taro.request 做 mock 拦截
  Taro.request = async function mockRequest(params: TaroRequestParams): TaroRequestResult {
    const { url = '', method = 'GET', data } = params

    // 提取路径部分（去掉 baseURL）
    const pathname = url.replace(/^https?:\/\/[^/]+/, '').replace(/^\/api\/v1/, '')

    const handler = matchHandler(method as string, pathname)

    if (handler) {
      await randomDelay()

      const result = handler({
        url: pathname,
        method: method as string,
        data: data as Record<string, unknown>,
        params: extractParams(handler._pattern || '', pathname),
        query: extractQuery(url),
      })

      // 模拟 Taro.request 返回结构
      const response = {
        data: result,
        statusCode: 200,
        header: { 'Content-Type': 'application/json' },
        cookies: [],
        errMsg: 'request:ok',
      }

      // 调用 success 回调
      if (params.success) {
        params.success(response as Taro.request.SuccessCallbackResult<unknown>)
      }
      if (params.complete) {
        params.complete(response as Taro.General.CallbackResult)
      }

      return response as Taro.request.SuccessCallbackResult<unknown>
    }

    // 未匹配到 handler，走原始请求
    return originalRequest(params)
  }
}

/** 从 URL 提取 query 参数 */
function extractQuery(url: string): Record<string, string> {
  const query: Record<string, string> = {}
  const search = url.split('?')[1]
  if (search) {
    search.split('&').forEach((pair) => {
      const [key, value] = pair.split('=')
      if (key) query[decodeURIComponent(key)] = decodeURIComponent(value || '')
    })
  }
  return query
}

/** 从路径模式提取动态参数 */
function extractParams(pattern: string, pathname: string): Record<string, string> {
  const params: Record<string, string> = {}
  const patternParts = pattern.split('/')
  const pathParts = pathname.split('/')

  patternParts.forEach((part, i) => {
    if (part.startsWith(':')) {
      params[part.slice(1)] = pathParts[i] || ''
    }
  })

  return params
}
