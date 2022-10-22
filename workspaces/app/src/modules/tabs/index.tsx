import { ComponentProps, forwardRef, ReactNode } from 'react'
import { TabsStyle } from '../../styles/tabs/Tabs'
import { objectsToString } from '../../utils/Utils'
import { TabsBody, TabsBodyProps } from './TabsBody'
import { TabsContextProvider, useTabs } from './TabsContext'
import { TabsHeader, TabsHeaderProps } from './TabsHeader'
import { Tab, TabProps } from './Tab'
import { TabsPanel, TabsPanelProps } from './TabsPanel'

export interface TabsProps extends ComponentProps<'div' | any> {
  id: string
  value: string | number
  className?: string
  children: ReactNode
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(({ id, value, className = '', children, ...rest }, ref) => {
  return (
    <TabsContextProvider id={id} value={value}>
      <div {...rest} ref={ref} className={objectsToString(TabsStyle.base)}>
        {children}
      </div>
    </TabsContextProvider>
  )
})

export type { TabProps, TabsBodyProps, TabsHeaderProps, TabsPanelProps }
export { Tabs, Tab, TabsBody, TabsHeader, TabsPanel, useTabs }
export default Object.assign(Tabs, {
  Tab,
  Body: TabsBody,
  Header: TabsHeader,
  Panel: TabsPanel,
})
