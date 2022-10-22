import { FlagsRequest } from '../../cache/flagRequest'
import { BACKEND_URL } from '../../config/backendUrl'
import FlagOption from '../../pages/landing/FlagOption'
import { useSpinneredRequest } from '../../utils/useSpinneredRequest'
import Button from '../button'
import { FlagButton } from '../button/FlagButton'
import Modal, { ModalBody, ModalCloseContainer, ModalHandler } from '../modal'

export interface FlagSelectorProps {
  disabled?: boolean
  flag: string | null
  setFlagCallback: Function
}

export const FlagSelector = ({ disabled = false, flag, setFlagCallback }: FlagSelectorProps) => {
  const { data: flags, error } = useSpinneredRequest(() => FlagsRequest, [])
  if (error) return <div>flagsRequest.error.message</div>
  if (!flags) return null

  const selectedFlag = flags.find((x) => x.id == flag)

  return disabled ? (
    <div className="w-full flex items-center justify-center">
      <FlagButton disabled={disabled} className="w-[50%]">
        {selectedFlag && (
          <img
            className="object-fill scale-150"
            src={`${BACKEND_URL}/${selectedFlag?.image}`}
            alt={selectedFlag?.country}
          />
        )}
      </FlagButton>
    </div>
  ) : (
    <Modal blur rounded>
      <ModalHandler>
        <div className="w-full flex items-center justify-center">
          <FlagButton className="w-[50%]">
            {selectedFlag && (
              <img
                className="object-fill scale-150"
                src={`${BACKEND_URL}/${selectedFlag?.image}`}
                alt={selectedFlag?.country}
              />
            )}
          </FlagButton>
        </div>
      </ModalHandler>
      <ModalBody title="Select Country">
        {flags.map((flag: any) => (
          <Button
            key={flag.id}
            variant="none"
            className="my-2 w-full"
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
