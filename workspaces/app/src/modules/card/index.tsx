import { ReactNode, useMemo, useState } from 'react'
import { CardContextProvider, CardContextProps, CardContextProviderProps } from './CardContext'
import { BaseCard, BaseCardProps } from './BaseCard'
import { ExpandedCard, ExpandedCardProps } from './ExpandedCard'
import { CardStyle } from '../../styles/card/Card'

export interface CardProps {
  children: ReactNode
  variant?: keyof typeof CardStyle.variants
  rounded?: boolean
}

export const Card = ({ children, variant = 'base', rounded = false }: CardProps) => {
  const [selected, setSelected] = useState(false)

  const context = useMemo(
    () => ({
      selected,
      setSelected,
      variant,
      rounded,
    }),
    [selected, setSelected, variant, rounded]
  )
  return <CardContextProvider value={context}>{children}</CardContextProvider>
}

export type { BaseCardProps, ExpandedCardProps, CardContextProps, CardContextProviderProps }
export { BaseCard, ExpandedCard, CardContextProvider, CardStyle }
export default Card
