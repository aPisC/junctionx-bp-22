import { ReactNode } from 'react'

export interface PricePairItemProps {
  homePrice: number
  icon: ReactNode
  destinationPrice: number
  title: string
  currency?: string
}

export const PricePairItem = ({ homePrice, icon, destinationPrice, title, currency = '' }: PricePairItemProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-center">{title}</div>
      <div className="grid grid-cols-3 w-full px-2 justify-between items-center">
        <div>
          {homePrice} {currency}
        </div>
        <div className="flex">
          <div className="mx-auto">{icon}</div>
        </div>
        <div className=" text-right">
          {destinationPrice} {currency}
        </div>
      </div>
    </div>
  )
}
