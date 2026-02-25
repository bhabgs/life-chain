/** 分页工具 */
export function paginate<T>(items: T[], page: number, pageSize: number) {
  const total = items.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const end = start + pageSize

  return {
    items: items.slice(start, end),
    total,
    page,
    pageSize,
    totalPages,
  }
}

/** 搜索过滤 */
export function filterByKeyword<T extends object>(
  items: T[],
  keyword: string | undefined,
  fields: (keyof T)[],
): T[] {
  if (!keyword) return items
  const lower = keyword.toLowerCase()
  return items.filter((item) =>
    fields.some((field) => String(item[field] ?? '').toLowerCase().includes(lower)),
  )
}
