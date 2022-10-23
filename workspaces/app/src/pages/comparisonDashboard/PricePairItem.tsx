import { ReactNode } from 'react'

export interface PricePairItemProps {
  homePrice: number
  icon: ReactNode
  destinationPrice: number
  title: string
}

export const PricePairItem = ({ homePrice, icon, destinationPrice, title }: PricePairItemProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-center">{title}</div>
      <div className="flex w-full justify-evenly items-center">
        <div>{homePrice}</div>
        <div>{icon}</div>
        <div>{destinationPrice}</div>
      </div>
    </div>
  )
}
