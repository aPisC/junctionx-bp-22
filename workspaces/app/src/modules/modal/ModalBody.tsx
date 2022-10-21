import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useContext } from 'react'
import ReactDOM from 'react-dom'
import { ScaleAnimation } from '../../animations/scaleAnimation'
import { ModalPortalContext } from '../../App'
import { ModalStyle } from '../../styles/modal/Modal'
import { cls } from '../../utils/DesignUtils'
import { objectsToString } from '../../utils/Utils'
import ModalBackdrop from './ModalBackdrop'
import { useModal } from './ModalContext'

export interface ModalBodyProps {
  className?: string
  children: ReactNode
}

export const ModalBody = ({ children }: ModalBodyProps) => {
  const { active, modalHandler, rounded, variant } = useModal()
  const modalPortalContext = useContext(ModalPortalContext)

  return (
    modalPortalContext &&
    ReactDOM.createPortal(
      <AnimatePresence initial={false}>
        {active && (
          <ModalBackdrop onClick={() => modalHandler(!active)}>
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className={cls(`
              ${objectsToString(ModalStyle.body)}
              ${rounded && objectsToString(ModalStyle.rounded)}
              ${objectsToString(ModalStyle.variants[variant])}
            `)}
              variants={ScaleAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {children}
            </motion.div>
          </ModalBackdrop>
        )}
      </AnimatePresence>,
      modalPortalContext
    )
  )
}

export default ModalBody
