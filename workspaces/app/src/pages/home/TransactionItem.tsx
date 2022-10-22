import { useContext } from 'react'
import { motion } from 'framer-motion'
import { ScaleAnimation } from '../../animations/scaleAnimation'
import { IntersectionContext } from '../../utils/hooks/intersectionObserver'

export interface TransactionItemProps {
  expense: number
  shop: string
}

export const TransactionItem = ({ shop, expense }: TransactionItemProps) => {
  return (
    <motion.div
      className="w-full flex justify-between py-2 px-8 rounded-lg bg-ui-grey-disabled"
      variants={ScaleAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div>{shop}</div>
      <div>{expense}</div>
    </motion.div>
  )
}

export default TransactionItem
