import { ReactNode } from 'react'
import { FaBalanceScale } from 'react-icons/fa'
import { H1 } from '../../modules/h1'
import Icon from '../../modules/icon'

export interface InfoBoxProps {
  children: ReactNode
}

export const InfoBox = ({ children }: InfoBoxProps) => {
  return (
    <div className="p-2">
      <div className="p-4 bg-keyline-grey w-full flex rounded-lg items-center">
        <Icon>
          <FaBalanceScale className="text-5xl text-wise-navy-blue" />
        </Icon>
        <div className="flex flex-grow">
          <H1 variant="medium">Compare your living expenses!</H1>
        </div>
      </div>
    </div>
  )
}
