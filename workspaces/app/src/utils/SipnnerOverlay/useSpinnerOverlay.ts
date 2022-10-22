import { useContext, useEffect } from 'react'
import { SpinnerOverlayContext } from './SpinnerOverlay'

export function useSpinnerOverlay(active: boolean) {
  const handler = useContext(SpinnerOverlayContext)

  useEffect(() => {
    if (active) {
      handler.activate()
      return handler.deactivate
    }
  }, [active, handler])
}
