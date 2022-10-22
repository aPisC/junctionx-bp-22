import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useContext } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import ReactDOM from 'react-dom'
import { FaRegTimesCircle } from 'react-icons/fa'
import { ScaleAnimation } from '../../animations/scaleAnimation'
import { ModalPortalContext } from '../../App'
import { ModalStyle } from '../../styles/modal/Modal'
import { cls } from '../../utils/DesignUtils'
import { objectsToString } from '../../utils/Utils'
import { H1 } from '../h1'
import Icon from '../icon'
import ModalBackdrop from './ModalBackdrop'
import ModalCloseContainer from './ModalCloseContainer'
import { useModal } from './ModalContext'

export interface ModalBodyProps {
  className?: string
  children: ReactNode
  title: string
}

export const ModalBody = ({ children, title }: ModalBodyProps) => {
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
              <div className="relative flex w-full items-center">
                {title && <H1 variant="medium">{title}</H1>}
                <div className="absolute right-0 top-0">
                  <ModalCloseContainer>
                    <Icon>
                      <FaRegTimesCircle className="text-wise-navy-blue cursor-pointer" />
                    </Icon>
                  </ModalCloseContainer>
                </div>
              </div>
              <Scrollbars>{children}</Scrollbars>
            </motion.div>
          </ModalBackdrop>
        )}
      </AnimatePresence>,
      modalPortalContext
    )
  )
}

export default ModalBody
