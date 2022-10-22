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
              <Card rounded>
                <BaseCard layoutId="card-0">
                  <BarChartView
                    labels={['Food']}
                    datasets={[
                      {
                        label: 'Home',
                        data: [100],
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      },
                      {
                        label: 'Ex.',
                        data: [350],
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                      },
                    ]}
                  />
                </BaseCard>
                <ExpandedCard layoutId="card-0">
                  <ComparisonDashboardPopup>
                    <PricePairItem
                      homePrice={500}
                      icon={
                        <Icon>
                          <FaRegSmileBeam />
                        </Icon>
                      }
                      destinationPrice={1200}
                    />
                    <PricePairItem
                      homePrice={500}
                      icon={
                        <Icon>
                          <FaRegSmileBeam />
                        </Icon>
                      }
                      destinationPrice={1200}
                    />
                    <PricePairItem
                      homePrice={500}
                      icon={
                        <Icon>
                          <FaRegSmileBeam />
                        </Icon>
                      }
                      destinationPrice={1200}
                    />
                    <PricePairItem
                      homePrice={500}
                      icon={
                        <Icon>
                          <FaRegSmileBeam />
                        </Icon>
                      }
                      destinationPrice={1200}
                    />
                    <PricePairItem
                      homePrice={500}
                      icon={
                        <Icon>
                          <FaRegSmileBeam />
                        </Icon>
                      }
                      destinationPrice={1200}
                    />
                    <PricePairItem
                      homePrice={500}
                      icon={
                        <Icon>
                          <FaRegSmileBeam />
                        </Icon>
                      }
                      destinationPrice={1200}
                    />
                    <PricePairItem
                      homePrice={500}
                      icon={
                        <Icon>
                          <FaRegSmileBeam />
                        </Icon>
                      }
                      destinationPrice={1200}
                    />
                    <PricePairItem
                      homePrice={500}
                      icon={
                        <Icon>
                          <FaRegSmileBeam />
                        </Icon>
                      }
                      destinationPrice={1200}
                    />
                  </ComparisonDashboardPopup>
                </ExpandedCard>
              </Card>
            </SliderGalleryItem>
            <SliderGalleryItem>
              <BarChartView
                labels={['Food']}
                datasets={[
                  {
                    label: 'Home',
                    data: [100],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                  {
                    label: 'Ex.',
                    data: [350],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                  },
                ]}
              />
            </SliderGalleryItem>
            <SliderGalleryItem>
              <BarChartView
                labels={['Games']}
                datasets={[
                  {
                    label: 'Home',
                    data: [100],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                  {
                    label: 'Ex.',
                    data: [350],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                  },
                ]}
              />
            </SliderGalleryItem>
            <SliderGalleryItem>
              <BarChartView
                labels={['PC']}
                datasets={[
                  {
                    label: 'Home',
                    data: [100],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                  {
                    label: 'Ex.',
                    data: [350],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                  },
                ]}
              />
            </SliderGalleryItem>
            <SliderGalleryItem>
              <BarChartView
                labels={['Drinks']}
                datasets={[
                  {
                    label: 'Home',
                    data: [100],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                  {
                    label: 'Ex.',
                    data: [350],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                  },
                ]}
              />
            </SliderGalleryItem>
            <SliderGalleryItem>
              <BarChartView
                labels={['Other']}
                datasets={[
                  {
                    label: 'Home',
                    data: [100],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                  {
                    label: 'Ex.',
                    data: [350],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                  },
                ]}
              />
            </SliderGalleryItem>
          </SliderGallery>
        </div>
        <div>
          <Button variant="hub" className="rounded-b-none" onClick={() => navigate('/saving-dashboard')}>
            <H1>Create saving plan!</H1>
          </Button>
        </div>
      </div>
    </BasePage>
  )
}
