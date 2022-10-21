import { createContext, Dispatch, ReactNode, SetStateAction, useContext } from 'react'
import { ModalStyle } from '../../styles/modal/Modal'

export type ModalContextProps = {
  modalHandler: Dispatch<SetStateAction<any>>
  active?: boolean
  rounded: boolean
  blur: boolean
  variant: keyof typeof ModalStyle.variants
  placement: keyof typeof ModalStyle.placements
}

export interface ModalContextProviderProps {
  value: ModalContextProps
  children: ReactNode
}

export const ModalContext = createContext<ModalContextProps | null>(null)

export function useModal() {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModal() must be used within a Modal.')
  }
  return context
}

export const ModalContextProvider = ({ value, children }: ModalContextProviderProps) => {
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export default ModalContextProvider
