import React, { PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react'

interface SpinnerOverlayHandler {
  active: boolean
  activate(): void
  deactivate(): void
}

export const SpinnerOverlayContext = React.createContext<SpinnerOverlayHandler>({
  activate: () => void 0,
  deactivate: () => void 0,
  active: false,
})

export function SpinnerOverlay() {
  const handler = useContext(SpinnerOverlayContext)
  return !handler.active ? null : (
    <div className="w-full h-full bg-white absolute top-0 left-0 flex items-center justify-center">
      <div className="aspect-square w-[30%] border-2 border-t-0 border-l-0 border-wise-navy-dark rounded-full animate-spin"></div>
    </div>
  )
}

export function SpinnerOverlayBackend({ children }: PropsWithChildren) {
  const [counter, setCounter] = useState(0)
  const activate = useCallback(() => setCounter((c) => c + 1), [setCounter])
  const deactivate = useCallback(() => setCounter((c) => c - 1), [setCounter])
  const active = counter > 0

  const handler = useMemo(() => ({ activate, deactivate, active }), [activate, deactivate, active])

  return <SpinnerOverlayContext.Provider value={handler}>{children}</SpinnerOverlayContext.Provider>
}
