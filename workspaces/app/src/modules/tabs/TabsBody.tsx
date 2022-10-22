import { ComponentProps, forwardRef, ReactNode, useEffect, useMemo } from 'react'
import { objectsToString } from '../../utils/Utils'
import { TabsStyle } from '../../styles/tabs/Tabs'
import { cls } from '../../utils/DesignUtils'

export interface TabsBodyProps extends ComponentProps<'div'> {
  className?: string
  variant?: keyof typeof TabsStyle.variants
  rounded?: boolean
  children: ReactNode
}

export const TabsBody = forwardRef<HTMLDivElement, TabsBodyProps>(
  ({ className = '', variant = 'base', rounded = false, children, ...rest }, ref) => {
    const mainAnimation = useMemo(
      () => ({
        unmount: {
          opacity: 0,
          height: 'auto',
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: 1,
          transition: { duration: 0.5, times: [0.4, 0, 0.2, 1] },
        },
        mount: {
          opacity: 1,
          height: 'auto',
          position: 'relative',
          zIndex: 2,
          transition: { duration: 0.5, times: [0.4, 0, 0.2, 1] },
        },
      }),
      []
    )

    return (
      <div
        {...rest}
        ref={ref}
        className={cls(`${objectsToString(TabsStyle.tabsBody.base)}
        ${objectsToString(TabsStyle.variants[variant].tabsBody)}
        ${rounded ?? objectsToString(TabsStyle.rounded)}`)}
      >
        {children}
      </div>
    )
  }
)
