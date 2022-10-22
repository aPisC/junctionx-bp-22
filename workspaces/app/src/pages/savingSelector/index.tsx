import { flags } from '../../config/flags'
import { useState } from 'react'
import { FlagSelector } from '../../modules/flagSelector'
import { H1 } from '../../modules/h1'
import Navigation from '../../modules/navigation'
import BasePage from '../base'
import Button from '../../modules/button'
import { useNavigate } from 'react-router-dom'

export interface SavingSelectorPageProps {}

export default function SavingSelectorPage({}: SavingSelectorPageProps) {
  const [flag, setFlag] = useState<typeof flags[0] | null>(null)
  const navigate = useNavigate()
  return (
    <BasePage>
      <div className="h-full flex flex-col">
        <Navigation />
        <div className="flex flex-grow overflow-hidden">
          <div className="p-4 w-full h-full flex flex-col justify-evenly items-center">
            <H1>Home Country</H1>
            <FlagSelector
              disabled
              flag={flags.find((flag) => localStorage.getItem('flag') === flag.country)}
              setFlagCallback={setFlag}
            />
            <H1 className="text-center">Destination Country</H1>
            <FlagSelector flag={flag} setFlagCallback={setFlag} />
            <Button
              disabled={flag == null}
              rounded
              onClick={() => {
                localStorage.setItem('destination', flag?.country ?? '')
                navigate('/saving-tutorial')
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
