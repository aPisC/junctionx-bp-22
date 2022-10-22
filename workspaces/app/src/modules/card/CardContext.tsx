import { createContext, ReactNode, useContext } from 'react'
import { CardStyle } from '../../styles/card/Card'

export type CardContextProps = {
  rounded: boolean
  variant: keyof typeof CardStyle.variants
  selected: boolean
  setSelected: Function
}

export interface CardContextProviderProps {
  value: CardContextProps
  children: ReactNode
}

export const CardContext = createContext<CardContextProps | null>(null)

export function useCard() {
  const context = useContext(CardContext)

  if (!context) {
    throw new Error('useCard() must be used within a Card.')
  }
  return context
}

export const CardContextProvider = ({ value, children }: CardContextProviderProps) => {
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>
}

export default CardContextProvider
