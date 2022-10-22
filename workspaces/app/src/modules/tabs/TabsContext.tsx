import { autoPlacement } from '@floating-ui/react-dom-interactions'
import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

export interface TabsContextType {
  state: {
    id: string
    active: string | number
    indicatorProps: {
      [key: string]: any
    }
  }
  setActive: Function
  setId: Function
  setIndicator: Function
}

export interface TabsContextProviderProps {
  id?: string
  value: string | number
  children?: ReactNode
}

export const TabsContext = createContext<TabsContextType | null>(null)

export function useTabs() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('useTabs() must be used within a Tabs.')
  }
  return context
}

export const TabsContextProvider = ({ id, value, children }: TabsContextProviderProps) => {
  const initialState = useMemo(
    () => ({
      id: id ?? 'indicator',
      active: value,
      indicatorProps: {},
    }),
    [id, value]
  )

  const [state, setState] = useState(initialState)

  const setActive = (value: string | number) => setState({ ...state, active: value })
  const setId = (value: string) => setState({ ...state, id: value })
  const setIndicator = (value: { [key: string]: any }) => setState({ ...state, indicatorProps: value })
  const contextValue = useMemo(
    () => ({ state, setActive, setId, setIndicator }),
    [state, setActive, setId, setIndicator]
  )
  return <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
}
