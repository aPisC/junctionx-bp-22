import { motion } from 'framer-motion'
import { ComponentProps, forwardRef, ReactNode } from 'react'
import { TabsStyle } from '../../styles/tabs/Tabs'
import { cls } from '../../utils/DesignUtils'
import { objectsToString } from '../../utils/Utils'
import { useTabs } from './TabsContext'

export interface TabProps extends ComponentProps<'li'> {
  value: string | number
  children: ReactNode
  className?: string
  disabled?: boolean
}

export const Tab = forwardRef<HTMLLIElement, TabProps>(
  ({ value, className = '', disabled = false, children, ...rest }, ref) => {
    const { state, setActive } = useTabs()
    const { id, active, indicatorProps } = state
    return (
      <li
        {...rest}
        ref={ref}
        role="tab"
        className={cls(`${objectsToString(TabsStyle.tab.base)}
        ${disabled ?? objectsToString(TabsStyle.tab.disabled)}
        ${className}`)}
        onClick={(e) => {
          const onClick = rest?.onClick

          if (typeof onClick === 'function') {
            setActive(value)
            onClick(e)
          }

          setActive(value)
        }}
        data-value={value}
      >
        <div className="z-[2]">{children}</div>
        {active === value && (
          <motion.div
            {...indicatorProps}
            transition={{ duration: 0.5 }}
            className={cls(`${objectsToString(TabsStyle.tab.indicator)}
            ${indicatorProps?.className ?? ''}`)}
            layoutId={id}
          />
        )}
      </li>
    )
  }
)

export default Tab
