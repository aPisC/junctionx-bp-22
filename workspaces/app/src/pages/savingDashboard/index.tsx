import axios from 'axios'
import Scrollbars from 'react-custom-scrollbars-2'
import { FaCalendar, FaUtensils } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../config/backendUrl'
import Button from '../../modules/button'
import { H1 } from '../../modules/h1'
import Icon from '../../modules/icon'
import Navigation from '../../modules/navigation'
import SliderGallery, { SliderGalleryItem } from '../../modules/sliderGallery'
import { useSpinnerOverlay } from '../../utils/SipnnerOverlay/useSpinnerOverlay'
import { useRequest } from '../../utils/useRequest'
import BasePage from '../base'
import { InfoBox } from '../comparisonDashboard/InfoBox'
import PieChart from '../comparisonDashboard/PieChart'
import SliderItem from '../comparisonDashboard/SliderItem'

export interface SavingDashboardPageProps {}

export default function SavingDashboardPage({}: SavingDashboardPageProps) {
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
        <div className="flex-grow overflow-hidden">
          <Scrollbars>
            <InfoBox
              icon={
                <Icon>
                  <FaCalendar className="text-5xl text-wise-navy-blue" />
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
              <SliderGallery>
                {Array.from(Array(7)).map((item, index) => (
                  <SliderGalleryItem key={index}>
                    <SliderItem
                      icon={<FaUtensils />}
                      labels={['Food']}
                      datasets={[
                        {
                          label: 'Home',
                          data: [100],
                          barThickness: 10,
                          borderRadius: 8,
                          backgroundColor: '#37517e',
                        },
                        {
                          label: 'Ex.',
                          data: [350],
                          barThickness: 10,
                          borderRadius: 8,
                          backgroundColor: '#A8AAAC',
                        },
                      ]}
                    />
                  </SliderGalleryItem>
                ))}
              </SliderGallery>
            </div>
          </Scrollbars>
        </div>
        <div>
          <Button variant="hub" className="rounded-none" onClick={() => navigate('/saving-home')}>
            <H1>Start</H1>
          </Button>
        </div>
      </div>
    </BasePage>
  )
}
