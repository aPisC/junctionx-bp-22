import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { ModalStyle } from '../../styles/modal/Modal'
import { cls } from '../../utils/DesignUtils'
import { objectsToString } from '../../utils/Utils'
import { useModal } from './ModalContext'

export interface ModalBackdropProps {
  children: ReactNode
  onClick: Function
}

export const ModalBackdrop = ({ children, onClick }: ModalBackdropProps) => {
  const { blur, placement } = useModal()
  return (
    <motion.div
      onClick={() => onClick()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cls(`
        ${objectsToString(ModalStyle.backdrop)}
        ${blur && objectsToString(ModalStyle.blur)}
        ${objectsToString(ModalStyle.placements[placement])}
      `)}
    >
      {children}
    </motion.div>
  )
}

export default ModalBackdrop
