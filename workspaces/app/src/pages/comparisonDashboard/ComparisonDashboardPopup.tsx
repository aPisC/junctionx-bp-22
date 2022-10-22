import { ReactNode } from 'react'
import { flags } from '../../config/flags'
import { FlagButton } from '../../modules/button/FlagButton'

export interface ComparisonDashboardPopupProps {
  children: ReactNode
}

export const ComparisonDashboardPopup = ({ children }: ComparisonDashboardPopupProps) => {
  return (
    <div>
      <div className="flex justify-evenly">
        <FlagButton variant="flag" className="w-[20%] border-0">
          <img
            className="object-fill scale-150"
            src={flags.find((flag) => localStorage.getItem('flag') === flag.country)?.flag}
          />
        </FlagButton>
        <FlagButton variant="flag" className="w-[20%] border-0">
          <img
            className="object-fill scale-150"
            src={flags.find((flag) => localStorage.getItem('destination') === flag.country)?.flag}
          />
        </FlagButton>
      </div>
      {children}
    </div>
  )
}
