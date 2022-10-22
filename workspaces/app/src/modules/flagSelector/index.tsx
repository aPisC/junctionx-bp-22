import { useState } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import { flags } from '../../config/flags'
import FlagOption from '../../pages/landing/FlagOption'
import Button from '../button'
import { FlagButton } from '../button/FlagButton'
import Icon from '../icon'
import Modal, { ModalHandler, ModalBody, ModalCloseContainer } from '../modal'

export interface FlagSelectorProps {
  disabled?: boolean
  flag?: typeof flags[0] | null
  setFlagCallback: Function
}

export const FlagSelector = ({ disabled = false, flag = null, setFlagCallback }: FlagSelectorProps) => {
  return disabled ? (
    <div className="w-full flex items-center justify-center">
      <FlagButton disabled={disabled} className="w-[50%] overflow-hidden" flag="asdf">
        <img className="object-fill scale-150" src={flag?.flag} alt={flag?.flag} />
      </FlagButton>
    </div>
  ) : (
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
              setFlagCallback(flag)
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
