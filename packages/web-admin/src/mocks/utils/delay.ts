/** 模拟网络延迟 */
export function randomDelay(min = 200, max = 800): number {
  return Math.floor(Math.random() * (max - min)) + min
}
