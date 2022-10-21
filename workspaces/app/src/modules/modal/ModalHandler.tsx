import { cloneElement, ComponentProps, ReactNode } from 'react'
import { useModal } from './ModalContext'

export interface ModalHandlerProps extends ComponentProps<any> {
  children: ReactNode | ComponentProps<any>
}

export const ModalHandler = ({ children }: ModalHandlerProps) => {
  const { active, modalHandler } = useModal()
  return cloneElement(children, {
    onClick: () => modalHandler(!active),
  })
}

export default ModalHandler
