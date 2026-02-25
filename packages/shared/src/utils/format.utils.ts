/** 截断文本 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/** 格式化文件大小 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`
}

/** 格式化数字（千分位） */
export function formatNumber(num: number): string {
  return num.toLocaleString('zh-CN')
}

/** 格式化百分比 */
export function formatPercent(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`
}
