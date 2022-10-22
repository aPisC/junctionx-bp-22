import { FaRegSmileBeam } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Button from '../../modules/button'
import Card, { BaseCard, ExpandedCard } from '../../modules/card'
import Icon from '../../modules/icon'
import Navigation from '../../modules/navigation'
import SliderGallery, { SliderGalleryItem } from '../../modules/sliderGallery'
import BasePage from '../base'
import { ComparisonDashboardPopup } from '../comparisonDashboard/ComparisonDashboardPopup'
import { MultiSeriesPieChartView } from '../comparisonDashboard/MultiSeriesPieChartView'
import { PricePairItem } from '../comparisonDashboard/PricePairItem'
import { BarChartView } from '../home/BarChartView'

export interface SavingDashboardPageProps {}

export default function SavingDashboardPage({}: SavingDashboardPageProps) {
  const navigate = useNavigate()
  return (
    <BasePage>
      <div className="h-full flex flex-col">
        <Navigation />
        <div className="flex flex-grow overflow-hidden items-start">
          <div className="flex flex-col w-full justify-center">
            <MultiSeriesPieChartView />
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
                    <div className="w-full text-center">5%</div>
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

                <div className="w-full text-center">5%</div>
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
                <div className="w-full text-center">5%</div>
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
                <div className="w-full text-center">5%</div>
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
                <div className="w-full text-center">5%</div>
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
                <div className="w-full text-center">5%</div>
              </SliderGalleryItem>
            </SliderGallery>
          </div>
        </div>
        <div>
          <Button variant="hub" className="rounded-b-none" onClick={() => navigate('/saving-home')}>
            Start
          </Button>
        </div>
      </div>
    </BasePage>
  )
}
