import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
import { ModalContextProvider, useModal, ModalContextProps, ModalContextProviderProps } from './ModalContext'
import { ModalHandlerProps, ModalHandler } from './ModalHandler'
import { ModalBackdropProps, ModalBackdrop } from './ModalBackdrop'
import { ModalBodyProps, ModalBody } from './ModalBody'
import { ModalCloseContainerProps, ModalCloseContainer } from './ModalCloseContainer'
import { PlacementTypes } from '../../types/generic'
import { ModalStyle } from '../../styles/modal/Modal'

export interface ModalProps {
  active?: boolean
  handler?: Dispatch<SetStateAction<any>>
  variant?: keyof typeof ModalStyle.variants
  rounded?: boolean
  blur?: boolean
  placement?: PlacementTypes
  children: ReactNode
}

export const Modal = ({
  active,
  handler,
  variant = 'base',
  rounded = false,
  blur = false,
  placement = 'center',
  children,
}: ModalProps) => {
  const [internalActive, setActive] = useState(false)

  active = active ?? internalActive
  const modalHandler = handler ?? setActive

  const modalContext = useMemo(
    () => ({
      active,
      modalHandler,
      variant,
      rounded,
      blur,
      placement,
    }),
    [active, modalHandler, variant, rounded, blur, placement]
  )
  return <ModalContextProvider value={modalContext}>{children}</ModalContextProvider>
}

export type {
  ModalContextProps,
  ModalContextProviderProps,
  ModalHandlerProps,
  ModalBodyProps,
  ModalBackdropProps,
  ModalCloseContainerProps,
}
export { ModalContextProvider, useModal, ModalHandler, ModalBody, ModalBackdrop, ModalCloseContainer }
export default Modal
