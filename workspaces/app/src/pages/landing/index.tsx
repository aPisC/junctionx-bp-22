import Button from '../../modules/button'
import { FlagButton } from '../../modules/button/FlagButton'
import { H1 } from '../../modules/h1'
import Modal, { ModalBody, ModalHandler } from '../../modules/modal'

export interface LandingPageProps {}

export default function LandingPage({}: LandingPageProps) {
  return (
    <div className="p-4 w-full h-full flex flex-col justify-evenly items-center">
      <Modal blur rounded>
        <H1>Home Country</H1>
        <ModalHandler>
          <div className="w-full flex items-center justify-center">
            <FlagButton className="w-[50%]" flag="asdf">
              <img src="" alt="" />
            </FlagButton>
          </div>
        </ModalHandler>
        <ModalBody>asdf</ModalBody>
      </Modal>
      <Button rounded>Continue</Button>
    </div>
  )
}
