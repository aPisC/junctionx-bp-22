import { ComponentProps, forwardRef, ReactNode, useEffect } from 'react'
import { TabsStyle } from '../../styles/tabs/Tabs'
import { cls } from '../../utils/DesignUtils'
import { objectsToString } from '../../utils/Utils'
import { useTabs } from './TabsContext'

export interface TabsHeaderProps extends ComponentProps<'ul'> {
  indicatorProps?: {
    [key: string]: any
  }
  classname?: string
  variant?: keyof typeof TabsStyle.variants
  rounded?: boolean
  children: ReactNode
}

export const TabsHeader = forwardRef<HTMLUListElement, TabsHeaderProps>(
  ({ indicatorProps, className = '', variant = 'base', rounded = false, children, ...rest }, ref) => {
    const { setIndicator } = useTabs()
    useEffect(() => {
      setIndicator(indicatorProps)
    }, [indicatorProps])
    return (
      <nav>
        <ul
          {...rest}
          ref={ref}
          role="tablist"
          className={cls(`${objectsToString(TabsStyle.tabsHeader.base)}
          ${objectsToString(TabsStyle.variants[variant].tabsHeader)}
          ${rounded ?? objectsToString(TabsStyle.rounded)}`)}
        >
          {children}
        </ul>
      </nav>
    )
  }
)
