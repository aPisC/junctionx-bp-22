import { FaUtensils } from 'react-icons/fa'
import Button from '../../modules/button'
import { H1 } from '../../modules/h1'
import Navigation from '../../modules/navigation'
import SliderGallery, { SliderGalleryItem } from '../../modules/sliderGallery'
import BasePage from '../base'
import { useNavigate } from 'react-router-dom'
import PieChart from './PieChart'
import { useRequest } from '../../utils/useRequest'
import axios from 'axios'
import { BACKEND_URL } from '../../config/backendUrl'
import { useSpinnerOverlay } from '../../utils/SipnnerOverlay/useSpinnerOverlay'
import { InfoBox } from './InfoBox'
import { Scrollbars } from 'react-custom-scrollbars-2'
import SliderItem from './SliderItem'

type Props = {}

export default function ComparisonDashboardPage({}: Props) {
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
            <InfoBox>asdf</InfoBox>
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
          </Scrollbars>
        </div>
        <div>
          <Button variant="hub" className="rounded-none" onClick={() => navigate('/saving-dashboard')}>
            <H1>Spend like a local!</H1>
          </Button>
        </div>
      </div>
    </BasePage>
  )
}
