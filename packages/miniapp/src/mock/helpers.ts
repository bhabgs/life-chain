// ============ 类型定义 ============

export interface IMockRequest {
  url: string
  method: string
  data: Record<string, unknown>
  params: Record<string, string>
  query: Record<string, string>
}

export type TMockHandler = ((req: IMockRequest) => unknown) & { _pattern?: string }

export interface IRouteEntry {
  method: string
  pattern: string
  handler: TMockHandler
}

// ============ 辅助函数 ============

/** 成功响应 */
export function ok<T>(data: T) {
  return { code: 0, message: 'success', data }
}

/** 分页响应（与 @lifechain/shared IPaginatedResponse 一致） */
export function paginated<T>(list: T[], page: number, pageSize: number) {
  const total = list.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  return {
    code: 0,
    message: 'success',
    data: {
      items: list.slice(start, start + pageSize),
      total,
      page,
      pageSize,
      totalPages,
    },
  }
}

/** 错误响应 */
export function fail(code: number, message: string) {
  return { code, message, data: null }
}
