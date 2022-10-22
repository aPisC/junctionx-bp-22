import { useState, useEffect } from 'react'
import { flags } from '../../config/flags'
import Button from '../../modules/button'
import { FlagSelector } from '../../modules/flagSelector'
import { H1 } from '../../modules/h1'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export interface LandingPageProps {}

export default function LandingPage({}: LandingPageProps) {
  const navigate = useNavigate()

  const [flag, setFlag] = useState<typeof flags[0] | null>(flags.find((flag) => flag.country === 'Hungary') ?? null)
  useEffect(() => {
    if (localStorage.getItem('id')) {
      navigate('/home')
    }
  }, [])
  return (
    <div className="p-4 w-full h-full flex flex-col justify-evenly items-center">
      <H1>Home Country</H1>
      <FlagSelector flag={flag} setFlagCallback={setFlag} />
      <a href="/home">
        <Button rounded onClick={() => {}}>
          Continue
        </Button>
      </a>
    </div>
  )
}
