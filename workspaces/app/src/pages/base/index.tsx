import { ReactNode } from 'react'
import Navigation from '../../modules/navigation'
import { Scrollbars } from 'react-custom-scrollbars-2'

export interface BasePageProps {
  children: ReactNode
}

export default function BasePage({ children }: BasePageProps) {
  return (
    <div className="h-full overflow-hidden">
      <Scrollbars>
        <Navigation />
        {children}
      </Scrollbars>
    </div>
  )
}
