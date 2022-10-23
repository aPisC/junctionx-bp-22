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
      <div className="flex justify-between py-4 px-6">
        {sourceFlag && (
          <div className="relative w-[33%] flex flex-col justify-stretch">
            <img className="w-full  flex object-fill" src={`${BACKEND_URL}/${sourceFlag.image}`} />
            <div className="text-s text-center">Original price</div>
          </div>
        )}
        {targetFlag && (
          <div className="relative w-[33%] flex flex-col justify-stretch">
            <img className="w-full flex object-fill" src={`${BACKEND_URL}/${targetFlag.image}`} />
            <div className="text-s text-center">Predicted price</div>
          </div>
        )}
      </div>
      {children}
    </div>
  )
}
