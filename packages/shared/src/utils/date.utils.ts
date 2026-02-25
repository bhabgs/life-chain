/** 格式化日期为 YYYY-MM-DD */
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** 格式化日期时间为 YYYY-MM-DD HH:mm:ss */
export function formatDateTime(date: string | Date): string {
  const d = new Date(date)
  const datePart = formatDate(d)
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')
  return `${datePart} ${hours}:${minutes}:${seconds}`
}

/** 获取相对时间描述 */
export function getRelativeTime(date: string | Date): string {
  const now = Date.now()
  const target = new Date(date).getTime()
  const diff = now - target

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (seconds < 60) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 30) return `${days}天前`
  if (months < 12) return `${months}个月前`
  return `${years}年前`
}

/** 判断是否是今天 */
export function isToday(date: string | Date): boolean {
  return formatDate(date) === formatDate(new Date())
}
