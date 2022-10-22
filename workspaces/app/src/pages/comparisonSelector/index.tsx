import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { flags } from '../../config/flags'
import Button from '../../modules/button'
import { FlagSelector } from '../../modules/flagSelector'
import { H1 } from '../../modules/h1'
import Navigation from '../../modules/navigation'
import BasePage from '../base'

export interface ComparisonSelectorPageProps {}

export default function ComparisonSelectorPage({}: ComparisonSelectorPageProps) {
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
              flag={flags.find((flag) => localStorage.getItem('flag') === flag.country) as any}
              setFlagCallback={setFlag}
            />
            <H1 className="text-center">Destination Country</H1>
            <FlagSelector flag={flag as any} setFlagCallback={setFlag} />
            <Button
              disabled={flag == null}
              rounded
              onClick={() => {
                localStorage.setItem('destination', flag?.country ?? '')
                navigate('/comparison-dashboard')
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
