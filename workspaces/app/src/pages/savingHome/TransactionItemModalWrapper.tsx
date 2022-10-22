import Modal, { ModalBody, ModalHandler } from '../../modules/modal'
import { ReactNode } from 'react'

export interface TransactionItemModalWrapperProps {
  modalHandler: ReactNode
  expenses: any
}

export const TransactionItemModalWrapper = ({ modalHandler, expenses }: TransactionItemModalWrapperProps) => {
  return (
    <Modal blur rounded>
      <ModalHandler>{modalHandler}</ModalHandler>
      <ModalBody title="Transaction">
        <div></div>
      </ModalBody>
    </Modal>
  )
}
