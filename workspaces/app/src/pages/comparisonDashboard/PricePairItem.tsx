import { ReactNode } from 'react'
import { FaRegSmileBeam } from 'react-icons/fa'
import Icon from '../../modules/icon'

export interface PricePairItemProps {
  homePrice: number
  icon: ReactNode
  destinationPrice: number
}

export const PricePairItem = ({ homePrice, icon, destinationPrice }: PricePairItemProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-center">title</div>
      <div className="flex w-full justify-evenly items-center">
        <div>{homePrice}</div>
        <div>{icon}</div>
        <div>{destinationPrice}</div>
      </div>
    </div>
  )
}
