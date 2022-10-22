import React from 'react'
import Button from '../../modules/button'
import { H1 } from '../../modules/h1'
import Navigation from '../../modules/navigation'
import BasePage from '../base'
import { useNavigate } from 'react-router-dom'

interface SavingTutorialPageProps {}

export default function SavingTutorialPage({}: SavingTutorialPageProps) {
  const navigate = useNavigate()
  return (
    <BasePage>
      <div className="h-full flex flex-col">
        <Navigation />
        <div className="flex-grow overflow-hidden">
          <H1>This is a tutorial page!</H1>
          <div className="flex w-full justify-center">
            <Button
              rounded
              onClick={() => {
                navigate('/saving-dashboard')
              }}
            >
              GG go next!
            </Button>
          </div>
        </div>
      </div>
    </BasePage>
  )
}
