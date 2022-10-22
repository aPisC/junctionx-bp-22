import Button from '../../modules/button'
import { H1 } from '../../modules/h1'
import Navigation from '../../modules/navigation'
import SliderGallery, { SliderGalleryItem } from '../../modules/sliderGallery'
import Tabs, { TabsHeader, Tab, TabsBody, TabsPanel } from '../../modules/tabs'
import { Scrollbars } from 'react-custom-scrollbars-2'
import BasePage from '../base'
import BalanceView from './BalanceView'
import { BarChartView } from './BarChartView'
import TransactionItem from './TransactionItem'
import { useNavigate } from 'react-router-dom'

export interface HomePageProps {}

export default function HomePage({}: HomePageProps) {
  const navigate = useNavigate()
  return (
    <BasePage>
      <div className="h-full flex flex-col">
        <Navigation />
        <div className="flex-grow overflow-hidden">
          <Scrollbars>
            <Tabs value="account">
              <TabsHeader>
                <Tab key="account" value="account">
                  <H1 variant="medium">Account</H1>
                </Tab>
                <Tab key="jar" value="jar">
                  <H1 variant="medium">Jar</H1>
                </Tab>
              </TabsHeader>
              <TabsBody>
                <TabsPanel key="account" value="account">
                  <BalanceView title="Account Balance" value={120000} currency="Magyar Forint" />
                </TabsPanel>
                <TabsPanel key="jar" value="jar">
                  <BalanceView title="Jar Balance" value={38000} currency="Magyar Forint" />
                </TabsPanel>
              </TabsBody>
            </Tabs>
            <div className="bg-wise-navy-dark p-2">
              <BalanceView title="Monthly Expense" value={100900} currency="Magyar Forint" />
            </div>
            <div className="flex w-full justify-center">
              <H1 className="text-xl">Categories</H1>
            </div>
            <SliderGallery>
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
            <div className="p-2 flex flex-col gap-2">
              <TransactionItem shop="Spar megacorp." expense={38000} />
              <TransactionItem shop="Spar megacorp." expense={38000} />
              <TransactionItem shop="Spar megacorp." expense={38000} />
              <TransactionItem shop="Spar megacorp." expense={38000} />
              <TransactionItem shop="Spar megacorp." expense={38000} />
              <TransactionItem shop="Spar megacorp." expense={38000} />
            </div>
          </Scrollbars>
        </div>
        <div>
          <Button variant="hub" className="rounded-b-none" onClick={() => navigate('/hub')}>
            <H1>Go to hub!</H1>
          </Button>
        </div>
      </div>
    </BasePage>
  )
}
