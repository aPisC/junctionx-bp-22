import { useContext } from 'react'
import { motion } from 'framer-motion'
import { ScaleAnimation } from '../../animations/scaleAnimation'
import { IntersectionContext } from '../../utils/hooks/intersectionObserver'
import { commify } from '../../utils/Utils'

export interface TransactionItemProps {
  expense: number
  shop: string
}

export const TransactionItem = ({ shop, expense }: TransactionItemProps) => {
  return (
    <motion.div
      className="w-full flex justify-between py-1 px-2 text-ui-grey-body"
      variants={ScaleAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div>{shop}</div>
      <div>-{commify(expense)} Ft</div>
    </motion.div>
  )
}

export default TransactionItem
