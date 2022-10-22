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
              title="Start spending like a local!"
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
              <div className="p-2">
                <div className="flex w-full border-b-2 border-ui-grey-body">
                  <H1 variant="large">Categories</H1>
                </div>
              </div>
              <SliderGallery>
                {Array.from(Array(7)).map((item, index) => {
                  const home = Math.floor(Math.random() * 200)
                  const abroad = Math.floor(Math.random() * 200)

                  const data = [
                    {
                      label: 'Home',
                      data: [home],
                      barThickness: 10,
                      borderRadius: 8,
                      backgroundColor: '#37517e',
                      stack: 'stack0',
                    },
                  ]
                  if (home < abroad) {
                    data.push({
                      label: 'Home',
                      data: [Math.abs(home - abroad)],
                      barThickness: 10,
                      borderRadius: 8,
                      backgroundColor: '#00b9ff',
                      stack: `${home > abroad ? 'stack1' : 'stack0'}`,
                    })
                    data.push({
                      label: 'Ex.',
                      data: [abroad],
                      barThickness: 10,
                      borderRadius: 8,
                      backgroundColor: '#A8AAAC',
                      stack: 'stack1',
                    })
                  } else {
                    data.push({
                      label: 'Ex.',
                      data: [abroad],
                      barThickness: 10,
                      borderRadius: 8,
                      backgroundColor: '#A8AAAC',
                      stack: 'stack1',
                    })
                    data.push({
                      label: 'Home',
                      data: [Math.abs(home - abroad)],
                      barThickness: 10,
                      borderRadius: 8,
                      backgroundColor: '#00b9ff',
                      stack: `${home > abroad ? 'stack1' : 'stack0'}`,
                    })
                  }

                  return (
                    <SliderGalleryItem key={index}>
                      <SliderItem icon={<FaUtensils />} labels={['Food']} datasets={data} />
                    </SliderGalleryItem>
                  )
                })}
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
