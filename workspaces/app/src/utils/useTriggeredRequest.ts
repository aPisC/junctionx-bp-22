import { useCallback, useEffect, useState } from 'react'

type RequestResult<T> =
  | { run: () => void; isRunning: true; error: undefined; data: undefined }
  | { run: () => void; isRunning: false; data: T; error: undefined }
  | { run: () => void; isRunning: false; error: Error; data: undefined }

export function useTriggeredRequest<T = unknown>(request: () => Promise<T>): RequestResult<T> {
  const [isRunning, setIsRunning] = useState(false)
  const [data, setData] = useState<T>()
  const [error, setError] = useState<Error>()
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    if (counter == 0) return
    console.log('Starting request')
    setIsRunning(true)
    request()
      .then((data) => {
        console.log('Request finished successfully')
        setData(data)
        setError(undefined)
        setIsRunning(false)
      })
      .catch((err) => {
        console.log('Request finished with error', err)
        setError(err)
        setData(undefined)
        setIsRunning(false)
      })
  }, [counter])

  const run = useCallback(() => setCounter((c) => c + 1), [setCounter])

  if (isRunning) return { run, isRunning: true, data: undefined, error: undefined }
  if (error) return { run, isRunning: false, error: error, data: undefined }
  return { run, isRunning: false, data: data as T, error: undefined }
}
