import { FaRegSmileBeam } from 'react-icons/fa'
import Button from '../../modules/button'
import { H1 } from '../../modules/h1'
import Navigation from '../../modules/navigation'
import SliderGallery, { SliderGalleryItem } from '../../modules/sliderGallery'
import BasePage from '../base'
import { BarChartView } from '../home/BarChartView'
import { MultiSeriesPieChartView } from './MultiSeriesPieChartView'
import { useNavigate } from 'react-router-dom'
import Card, { BaseCard, ExpandedCard } from '../../modules/card'
import { ComparisonDashboardPopup } from './ComparisonDashboardPopup'
import Icon from '../../modules/icon'
import { PricePairItem } from './PricePairItem'
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
            <div className="flex w-full justify-center">
              <H1 className="text-xl">Categories</H1>
            </div>
            <SliderGallery>
              <SliderGalleryItem>
                <SliderItem />
              </SliderGalleryItem>
              {Array.from(Array(7)).map((item, index) => (
                <SliderGalleryItem key={index}>
                  <SliderItem />
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
