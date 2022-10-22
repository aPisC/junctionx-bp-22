import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import { CardStyle } from '../../styles/card/Card'
import { cls } from '../../utils/DesignUtils'
import { objectsToString } from '../../utils/Utils'
import { useCard } from './CardContext'

export interface ExpandedCardProps {
  layoutId?: string
  className?: string
  children?: ReactNode
}

export const ExpandedCard = ({ children, className = '', layoutId }: ExpandedCardProps) => {
  const { selected, setSelected, rounded, variant } = useCard()
  return selected ? (
    <div
      className={cls(`
      ${objectsToString(CardStyle.default.expanded.background)}
      ${objectsToString(CardStyle.variants[variant].expanded.background)}`)}
      onClick={() => setSelected(!selected)}
    >
      <div
        className={cls(`
        ${objectsToString(CardStyle.default.expanded.position)}
        ${objectsToString(CardStyle.variants[variant].expanded.position)}`)}
      >
        <motion.div
          layoutId={layoutId}
          onClick={(e) => e.stopPropagation()}
          className={cls(`
          ${objectsToString(CardStyle.default.expanded.container)}
          ${objectsToString(CardStyle.variants[variant].default)}
          ${objectsToString(CardStyle.variants[variant].expanded.container)}
          ${rounded && objectsToString(CardStyle.default.rounded)}
          ${className}`)}
        >
          <div
            className={cls(`
            ${objectsToString(CardStyle.default.expanded.closeButton)}
            ${objectsToString(CardStyle.variants[variant].expanded.closeButton)}`)}
            onClick={() => {
              setSelected(!selected)
            }}
          >
            <FaRegTimesCircle />
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  ) : null
}

export default ExpandedCard
