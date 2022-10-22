import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../config/backendUrl'
import Button from '../../modules/button'
import { FlagSelector } from '../../modules/flagSelector'
import { H1 } from '../../modules/h1'
import { useSpinnerOverlay } from '../../utils/SipnnerOverlay/useSpinnerOverlay'
import { useRequest } from '../../utils/useRequest'
import { useTriggeredRequest } from '../../utils/useTriggeredRequest'

export interface LandingPageProps {}

export default function LandingPage({}: LandingPageProps) {
  const navigate = useNavigate()
  const [flag, setFlag] = useState<string>('hu')

  const loadUser = async (token: string | null) => {
    if (!token) return null
    const response = await axios.get<any>(`${BACKEND_URL}/api/user/${token}`).catch((e) => null)
    if (response?.data) {
      localStorage.setItem('flag', response.data.sourceCountry)
      navigate('/home')
    }
    return response?.data
  }

  const createUser = async () => {
    const response = await axios.post<any>(`${BACKEND_URL}/api/user/create`, { country: flag }).catch((e) => null)
    if (!response?.data) return

    localStorage.setItem('token', response.data.id)
    localStorage.setItem('flag', response.data.sourceCountry)
    navigate('/home')
  }

  const createUserRequest = useTriggeredRequest(createUser)
  const loadUserRequest = useRequest(() => loadUser(localStorage.getItem('token')), [])

  useSpinnerOverlay(loadUserRequest.isRunning)
  useSpinnerOverlay(createUserRequest.isRunning)

  return (
    <div className="p-4 w-full h-full flex flex-col justify-evenly items-center">
      <H1>Home Country</H1>
      <FlagSelector flag={flag} setFlagCallback={setFlag} />
      <Button disabled={flag == null} rounded onClick={() => createUserRequest.run()}>
        Continue
      </Button>
    </div>
  )
}
