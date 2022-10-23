import { useEffect, useState } from 'react'

type RequestResult<T> =
  | { isRunning: true; error: undefined; data: undefined }
  | { isRunning: false; data: T; error: undefined }
  | { isRunning: false; error: Error; data: undefined }

export function useRequest<T = unknown>(request: () => Promise<T>, dependencies: any[]): RequestResult<T> {
  const [isRunning, setIsRunning] = useState(true)
  const [data, setData] = useState<T>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    setIsRunning(true)
    request()
      .then((data) => {
        setData(data)
        setError(undefined)
        setIsRunning(false)
      })
      .catch((err) => {
        setError(err)
        setData(undefined)
        setIsRunning(false)
      })
  }, dependencies)

  if (isRunning) return { isRunning: true, data: undefined, error: undefined }
  if (error) return { isRunning: false, error: error, data: undefined }
  return { isRunning: false, data: data as T, error: undefined }
}
