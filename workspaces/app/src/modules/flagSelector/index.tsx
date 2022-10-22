import { useState } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import { flags } from '../../config/flags'
import FlagOption from '../../pages/landing/FlagOption'
import Button from '../button'
import { FlagButton } from '../button/FlagButton'
import { H1 } from '../h1'
import Icon from '../icon'
import Modal, { ModalHandler, ModalBody, ModalCloseContainer } from '../modal'

export const FlagSelector = () => {
  const [flag, setFlag] = useState(flags.find((flag) => flag.country === 'Hungary'))
  return (
    <Modal blur rounded>
      <ModalHandler>
        <div className="w-full flex items-center justify-center">
          <FlagButton className="w-[50%] overflow-hidden" flag="asdf">
            <img className="object-fill scale-150" src={flag?.flag} alt={flag?.flag} />
          </FlagButton>
        </div>
      </ModalHandler>
      <ModalBody>
        <ModalCloseContainer className="flex w-full justify-end cursor-pointer">
          <Icon>
            <FaRegTimesCircle />
          </Icon>
        </ModalCloseContainer>
        {flags.map((flag, index) => (
          <Button
            variant="hub"
            className="my-2"
            onClick={() => {
              setFlag(flag)
            }}
          >
            <ModalCloseContainer>
              <FlagOption flag={flag} key={index} />
            </ModalCloseContainer>
          </Button>
        ))}
      </ModalBody>
    </Modal>
  )
}
