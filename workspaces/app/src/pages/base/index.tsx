import { ReactNode } from 'react'

export interface BasePageProps {
  children: ReactNode
}

export default function BasePage({ children }: BasePageProps) {
  return <div className="h-full overflow-hidden">{children}</div>
}
