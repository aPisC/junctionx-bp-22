import { ReactNode } from 'react'
import { useModal } from './ModalContext'

export interface ModalCloseContainerProps {
  className?: string
  children?: ReactNode
}

export const ModalCloseContainer = ({ className = '', children }: ModalCloseContainerProps) => {
  const { modalHandler } = useModal()
  return (
    <div className={className} onClick={() => modalHandler(false)}>
      {children}
    </div>
  )
}

export default ModalCloseContainer
