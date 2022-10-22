import axios from 'axios'
import React from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { FaArchive } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../config/backendUrl'
import Icon from '../../modules/icon'
import Navigation from '../../modules/navigation'
import { useSpinnerOverlay } from '../../utils/SipnnerOverlay/useSpinnerOverlay'
import { useRequest } from '../../utils/useRequest'
import BasePage from '../base'
import { InfoBox } from '../comparisonDashboard/InfoBox'
import PieChart from '../comparisonDashboard/PieChart'

export interface AbroadDashboardPageProps {}

export default function AbroadDashboardPage({}: AbroadDashboardPageProps) {
  const navigate = useNavigate()
  const userRequest = useRequest(
    () =>
      axios(`${BACKEND_URL}/api/user/${localStorage.getItem('token')}`)
        .then((d) => d.data)
        .catch((e) => {
          localStorage.removeItem('token')
          navigate('/')
        }),
    []
  )
  useSpinnerOverlay(userRequest.isRunning)

  if (userRequest.isRunning) return null

  const user: any = userRequest.data

  return (
    <BasePage>
      <div className="h-full flex flex-col">
        <Navigation />
        <div className="flex flex-grow overflow-hidden items-start">
          <Scrollbars>
            <InfoBox
              icon={
                <Icon>
                  <FaArchive className="text-5xl text-wise-navy-blue" />
                </Icon>
              }
              title="Arrived in the country!"
            />
            <div className="flex flex-col w-full justify-center">
              <PieChart
                homeCountry={user.sourceCountry}
                targetCountry={user.targetCountry}
                data={[
                  {
                    backgroundColor: ['#37517e', 'transparent'],
                    data: [79, 21],
                  },
                  {
                    backgroundColor: ['#A8AAAC', 'transparent'],
                    data: [67, 33],
                  },
                ]}
              />
            </div>
          </Scrollbars>
        </div>
      </div>
    </BasePage>
  )
}
