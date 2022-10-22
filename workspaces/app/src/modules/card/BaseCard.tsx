import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { CardStyle } from '../../styles/card/Card'
import { cls } from '../../utils/DesignUtils'
import { objectsToString } from '../../utils/Utils'
import { useCard } from './CardContext'

export interface BaseCardProps {
  layoutId?: string
  children?: ReactNode
  className?: string
}

export const BaseCard = ({ children, className = '', layoutId }: BaseCardProps) => {
  const { rounded, selected, setSelected, variant } = useCard()
  return (
    <motion.div
      layoutId={layoutId}
      className={cls(`${className}
    overflow-hidden`)}
    >
      <div
        className={cls(`
        ${objectsToString(CardStyle.default.base)}
        ${objectsToString(CardStyle.variants[variant].base)}
        ${objectsToString(CardStyle.variants[variant].default)}
        ${rounded && objectsToString(CardStyle.default.rounded)}`)}
        onClick={() => setSelected(!selected)}
      >
        {children}
      </div>
    </motion.div>
  )
}

export default BaseCard
