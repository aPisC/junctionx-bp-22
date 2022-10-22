import { useEffect, useState } from 'react'

type RequestResult<T> = { isRunning: true } | { isRunning: false; data: T } | { isRunning: false; error: Error }

export function useRequest<T = unknown>(request: () => Promise<T>, dependencies: any[]): RequestResult<T> {
  const [isRunning, setIsRunning] = useState(true)
  const [data, setData] = useState<T>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    setIsRunning(true)
    request()
      .then((data) => {
        setData(data)
        setIsRunning(false)
      })
      .catch((err) => {
        setError(err)
        setIsRunning(false)
      })
  }, dependencies)

  if (isRunning) return { isRunning: true }
  if (error) return { isRunning: false, error: error }
  return { isRunning: false, data: data as T }
}
