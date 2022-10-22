import axios from 'axios'
import { FaRegTimesCircle } from 'react-icons/fa'
import { BACKEND_URL } from '../../config/backendUrl'
import FlagOption from '../../pages/landing/FlagOption'
import { useSpinnerOverlay } from '../../utils/SipnnerOverlay/useSpinnerOverlay'
import { useRequest } from '../../utils/useRequest'
import Button from '../button'
import { FlagButton } from '../button/FlagButton'
import Icon from '../icon'
import Modal, { ModalBody, ModalCloseContainer, ModalHandler } from '../modal'

export interface FlagSelectorProps {
  disabled?: boolean
  flag: string
  setFlagCallback: Function
}

export const FlagSelector = ({ disabled = false, flag, setFlagCallback }: FlagSelectorProps) => {
  const flagsRequest = useRequest(() => axios.get(`${BACKEND_URL}/api/countries`).then((r) => r.data), [])
  useSpinnerOverlay(flagsRequest.isRunning)

  if (flagsRequest.isRunning) return null
  if (flagsRequest.error) return <div>flagsRequest.error.message</div>

  const flags: any[] = flagsRequest.data
  const selectedFlag = flags.find((x) => x.id == flag)

  return disabled ? (
    <div className="w-full flex items-center justify-center">
      <FlagButton disabled={disabled} className="w-[50%]">
        <img
          className="object-fill scale-150"
          src={`${BACKEND_URL}/${selectedFlag?.image}`}
          alt={selectedFlag?.country}
        />
      </FlagButton>
    </div>
  ) : (
    <Modal blur rounded>
      <ModalHandler>
        <div className="w-full flex items-center justify-center">
          <FlagButton className="w-[50%]">
            <img
              className="object-fill scale-150"
              src={`${BACKEND_URL}/${selectedFlag?.image}`}
              alt={selectedFlag?.country}
            />
          </FlagButton>
        </div>
      </ModalHandler>
      <ModalBody>
        <ModalCloseContainer className="flex w-full justify-end cursor-pointer">
          <Icon>
            <FaRegTimesCircle />
          </Icon>
        </ModalCloseContainer>
        {flags.map((flag: any) => (
          <Button
            key={flag.id}
            variant="hub"
            className="my-2"
            onClick={() => {
              setFlagCallback(flag.id)
            }}
          >
            <ModalCloseContainer key={flag.id}>
              <FlagOption flag={flag} />
            </ModalCloseContainer>
          </Button>
        ))}
      </ModalBody>
    </Modal>
  )
}
