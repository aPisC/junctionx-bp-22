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
      <div className="grid grid-cols-3 w-full px-2 justify-between items-center">
        <div>{homePrice}</div>
        <div className="flex">
          <div className="mx-auto">{icon}</div>
        </div>
        <div className=" text-right">{destinationPrice}</div>
      </div>
    </div>
  )
}
