import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../config/backendUrl'
import Button from '../../modules/button'
import { FlagSelector } from '../../modules/flagSelector'
import { H1 } from '../../modules/h1'
import Navigation from '../../modules/navigation'
import { useSpinnerOverlay } from '../../utils/SipnnerOverlay/useSpinnerOverlay'
import { useSpinneredRequest } from '../../utils/useSpinneredRequest'
import { useTriggeredRequest } from '../../utils/useTriggeredRequest'
import BasePage from '../base'

export interface ComparisonSelectorPageProps {
  redirect: string
}

export default function ComparisonSelectorPage({ redirect }: ComparisonSelectorPageProps) {
  const navigate = useNavigate()
  const [flag, setFlag] = useState<string | null>(null)

  const userRequest = useSpinneredRequest(
    () =>
      axios(`${BACKEND_URL}/api/user/${localStorage.getItem('token')}`)
        .then((d) => {
          if (d.data.targetCountry) navigate(redirect)
          return d.data
        })
        .catch((e) => {
          localStorage.removeItem('token')
          navigate('/')
        }),
    []
  )

  const setTargetCountryRequest = useTriggeredRequest(async () => {
    axios.post(`${BACKEND_URL}/api/user/setTarget/${flag}/${userRequest.data.id}`)
    navigate(redirect)
  })
  useSpinnerOverlay(setTargetCountryRequest.isRunning)

  if (userRequest.isRunning) return null

  return (
    <BasePage>
      <div className="h-full flex flex-col">
        <Navigation />
        <div className="flex flex-grow overflow-hidden">
          <div className="p-4 w-full h-full flex flex-col justify-evenly items-center">
            <H1>Home Country</H1>
            <FlagSelector disabled flag={userRequest.data?.sourceCountry} setFlagCallback={setFlag} />
            <H1 className="text-center">Destination Country</H1>
            <FlagSelector flag={flag} setFlagCallback={setFlag} />
            <Button
              disabled={flag == null}
              rounded
              onClick={() => {
                setTargetCountryRequest.run()
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </BasePage>
  )
}
