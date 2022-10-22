import { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import useIntersection from './useIntersection'

export const IntersectionContext = createContext({ inView: true })

export interface IntersectionObserverProps {
  children: ReactNode
  reset?: boolean // if value set to true - observed element will reappear every time it shows up on the screen
}

export const IntersectionObserver = ({ children, reset = false }: IntersectionObserverProps) => {
  const [inView, setInView] = useState(false)
  const intersectionRef = useRef<HTMLDivElement>(null)
  const intersection = useIntersection(intersectionRef, { threshold: 0 })

  useEffect(() => {
    const inViewNow = intersection && intersection.intersectionRatio > 0
    if (inViewNow) {
      return setInView(inViewNow)
    } else if (reset) {
      return setInView(false)
    }
  }, [intersection, reset])

  return (
    <IntersectionContext.Provider value={{ inView }}>
      <div ref={intersectionRef}>{children}</div>
    </IntersectionContext.Provider>
  )
}
