/** 统一 API 响应格式 */
export interface IApiResponse<T> {
  code: number
  message: string
  data: T
}

/** 分页响应格式 */
export interface IPaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/** 分页请求参数 */
export interface IPaginationParams {
  page?: number
  pageSize?: number
}

/** 排序参数 */
export interface ISortParams {
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

/** API 错误响应 */
export interface IApiError {
  code: number
  message: string
  details?: Record<string, string[]>
}
