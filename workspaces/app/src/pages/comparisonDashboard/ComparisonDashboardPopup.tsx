import { ReactNode } from 'react'
import { FlagsRequest } from '../../cache/flagRequest'
import { BACKEND_URL } from '../../config/backendUrl'
import { useSpinneredRequest } from '../../utils/useSpinneredRequest'

export interface ComparisonDashboardPopupProps {
  children: ReactNode
  targetCountry: string
  sourceCountry: string
}

export const ComparisonDashboardPopup = ({ targetCountry, sourceCountry, children }: ComparisonDashboardPopupProps) => {
  const { data: flags, error } = useSpinneredRequest(() => FlagsRequest, [])

  const sourceFlag = flags?.find((f) => f.id == sourceCountry)
  const targetFlag = flags?.find((f) => f.id == targetCountry)

  return (
    <div>
      <div className="flex justify-between py-[24px] px-6">
        {sourceFlag && <img className="w-[15%] object-fill scale-150" src={`${BACKEND_URL}/${sourceFlag.image}`} />}
        {targetFlag && <img className="w-[15%] object-fill scale-150" src={`${BACKEND_URL}/${targetFlag.image}`} />}
      </div>
      {children}
    </div>
  )
}
