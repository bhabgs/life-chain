import { useState, useCallback, useEffect, useRef } from 'react'

interface IUseRequestOptions<T> {
  /** 是否自动发起请求，默认 false */
  auto?: boolean
  /** 初始数据 */
  initialData?: T
  /** 请求成功回调 */
  onSuccess?: (data: T) => void
}

interface IUseRequestResult<T> {
  data: T | undefined
  loading: boolean
  error: Error | null
  run: (...args: unknown[]) => Promise<T | undefined>
  refresh: () => Promise<T | undefined>
}

export function useRequest<T>(
  service: (...args: unknown[]) => Promise<{ data: T }>,
  options: IUseRequestOptions<T> = {}
): IUseRequestResult<T> {
  const { auto = false, initialData, onSuccess } = options

  const [data, setData] = useState<T | undefined>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const lastArgsRef = useRef<unknown[]>([])

  const run = useCallback(
    async (...args: unknown[]) => {
      lastArgsRef.current = args
      setLoading(true)
      setError(null)
      try {
        const res = await service(...args)
        setData(res.data)
        onSuccess?.(res.data)
        return res.data
      } catch (err) {
        setError(err as Error)
        return undefined
      } finally {
        setLoading(false)
      }
    },
    [service, onSuccess]
  )

  const refresh = useCallback(() => {
    return run(...lastArgsRef.current)
  }, [run])

  useEffect(() => {
    if (auto) {
      run()
    }
  }, [auto, run])

  return { data, loading, error, run, refresh }
}
