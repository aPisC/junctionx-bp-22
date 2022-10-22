import { useState } from 'react'
import { flags } from '../../config/flags'
import Button from '../../modules/button'
import { FlagButton } from '../../modules/button/FlagButton'
import { H1 } from '../../modules/h1'
import Icon from '../../modules/icon'
import { FaRegTimesCircle } from 'react-icons/fa'
import Modal, { ModalBody, ModalCloseContainer, ModalHandler } from '../../modules/modal'
import { Scrollbars } from 'react-custom-scrollbars-2'
import FlagOption from './FlagOption'

export interface LandingPageProps {}

export default function LandingPage({}: LandingPageProps) {
  const [flag, setFlag] = useState(flags.find((flag) => flag.country === 'Hungary'))
  return (
    <div className="p-4 w-full h-full flex flex-col justify-evenly items-center">
      <Modal blur rounded>
        <H1>Home Country</H1>
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
      <Button rounded>Continue</Button>
    </div>
  )
}
