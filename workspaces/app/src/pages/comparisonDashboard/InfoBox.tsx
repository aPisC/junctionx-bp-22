import { ReactNode } from 'react'
import { FaBalanceScale } from 'react-icons/fa'
import { H1 } from '../../modules/h1'
import Icon from '../../modules/icon'

export interface InfoBoxProps {
  icon: ReactNode
  title: string
}

export const InfoBox = ({ icon, title }: InfoBoxProps) => {
  return (
    <div className="p-2">
      <div className="p-4 bg-keyline-grey w-full flex rounded-lg items-center">
        {icon}
        <div className="flex flex-grow">
          <H1 variant="medium">{title}</H1>
        </div>
      </div>
    </div>
  )
}
