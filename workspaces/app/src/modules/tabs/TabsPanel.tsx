import { AnimatePresence, MotionProps, motion } from 'framer-motion'
import { forwardRef, ReactNode } from 'react'
import { TabsStyle } from '../../styles/tabs/Tabs'
import { cls } from '../../utils/DesignUtils'
import { objectsToString } from '../../utils/Utils'
import { useTabs } from './TabsContext'

export interface TabsPanelProps extends MotionProps {
  value: string | number
  className?: string
  variant?: keyof typeof TabsStyle.variants
  children: ReactNode
}

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
}

const containerVariants = {
  closed: {
    height: 0,
    opacity: 0,
  },
  open: {
    height: 'fit-content',
    duration: 200,
    opacity: 1,
  },
}

export const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ value, className = '', children, variant = 'base', ...rest }, ref) => {
    const { state } = useTabs()
    const { active } = state
    return (
      <AnimatePresence mode="wait">
        <motion.div
          {...rest}
          ref={ref}
          role="tabpanel"
          className={cls(`${objectsToString(TabsStyle.tabsPanel.base)}`)}
          data-value={value}
          initial={active === value ? 'open' : 'closed'}
          exit="closed"
          animate={active === value ? 'open' : 'closed'}
          variants={containerVariants}
        >
          <motion.div
            className={cls(`${objectsToString(TabsStyle.variants[variant].tabsPanel)}`)}
            variants={itemVariants}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }
)

export default TabsPanel
