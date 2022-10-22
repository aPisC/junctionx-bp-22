import { useSpinnerOverlay } from './SipnnerOverlay/useSpinnerOverlay'
import { useRequest } from './useRequest'

export function useSpinneredRequest<T>(request: () => Promise<T>, dependencies: any[]) {
  const handler = useRequest(request, dependencies)
  useSpinnerOverlay(handler.isRunning)
  return handler
}
