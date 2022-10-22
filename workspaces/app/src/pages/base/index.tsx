import { ReactNode } from 'react'
import Navigation from '../../modules/navigation'

export interface BasePageProps {
  children: ReactNode
}

export default function BasePage({ children }: BasePageProps) {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  )
}
