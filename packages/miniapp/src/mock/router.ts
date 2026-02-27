import { routes } from './handlers/index'
import type { TMockHandler } from './helpers'

// 重导出类型和辅助函数，保持向后兼容
export type { IMockRequest, TMockHandler, IRouteEntry } from './helpers'
export { ok, paginated, fail } from './helpers'

// ============ 路由匹配 ============

// 为所有 handler 附加 pattern 以供 extractParams 使用
routes.forEach((r) => {
  r.handler._pattern = r.pattern
})

/** 匹配路由，返回 handler；未匹配则返回 null */
export function matchHandler(method: string, pathname: string): TMockHandler | null {
  for (const route of routes) {
    if (route.method !== method.toUpperCase()) continue
    if (matchPath(route.pattern, pathname)) {
      return route.handler
    }
  }
  return null
}

/** 简单路径匹配（支持 :param 动态段） */
function matchPath(pattern: string, pathname: string): boolean {
  const patternParts = pattern.split('/').filter(Boolean)
  const pathParts = pathname.split('/').filter(Boolean)

  if (patternParts.length !== pathParts.length) return false

  return patternParts.every(
    (part, i) => part.startsWith(':') || part === pathParts[i]
  )
}
