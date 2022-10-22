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
import { FaUtensils, FaSocks } from 'react-icons/fa'
import { GalleryItem } from './GalleryItem'
import Icon from '../../modules/icon'

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
              <div className="p-2 pb-0">
                <TabsHeader>
                  <Tab key="account" value="account">
                    <H1 variant="medium">Account</H1>
                  </Tab>
                  <Tab key="jar" value="jar">
                    <H1 variant="medium">Jar</H1>
                  </Tab>
                </TabsHeader>
              </div>
              <div className="px-2 py-1">
                <TabsBody>
                  <TabsPanel key="account" value="account">
                    <BalanceView title="Account Balance" value={120000} currency="Magyar Forint" />
                  </TabsPanel>
                  <TabsPanel key="jar" value="jar">
                    <BalanceView title="Jar Balance" value={38000} currency="Magyar Forint" />
                  </TabsPanel>
                </TabsBody>
              </div>
            </Tabs>
            <div className="p-2 pt-0">
              <BalanceView title="Monthly Expense" value={100900} currency="Magyar Forint" />
            </div>
            <div className="p-2">
              <div className="flex w-full border-b-2 border-ui-grey-body">
                <H1 variant="large">Categories</H1>
              </div>
            </div>

            <SliderGallery>
              <SliderGalleryItem>
                <GalleryItem
                  icon={<FaUtensils />}
                  label={'Food'}
                  dataset={{
                    borderRadius: 8,
                    label: '',
                    data: [100],
                    barThickness: 10,
                    backgroundColor: '#a8aaac',
                  }}
                />
              </SliderGalleryItem>
              <SliderGalleryItem>
                <GalleryItem
                  icon={<FaSocks />}
                  label={'Food'}
                  dataset={{
                    borderRadius: 8,
                    label: '',
                    data: [100],
                    barThickness: 10,
                    backgroundColor: '#a8aaac',
                  }}
                />
              </SliderGalleryItem>
              <SliderGalleryItem>
                <GalleryItem
                  icon={<FaSocks />}
                  label={'Food'}
                  dataset={{
                    borderRadius: 8,
                    label: '',
                    data: [100],
                    barThickness: 10,
                    backgroundColor: '#a8aaac',
                  }}
                />
              </SliderGalleryItem>
              <SliderGalleryItem>
                <GalleryItem
                  icon={<FaSocks />}
                  label={'Food'}
                  dataset={{
                    borderRadius: 8,
                    label: '',
                    data: [100],
                    barThickness: 10,
                    backgroundColor: '#a8aaac',
                  }}
                />
              </SliderGalleryItem>
              <SliderGalleryItem>
                <GalleryItem
                  icon={<FaSocks />}
                  label={'Food'}
                  dataset={{
                    borderRadius: 8,
                    label: '',
                    data: [100],
                    barThickness: 10,
                    backgroundColor: '#a8aaac',
                  }}
                />
              </SliderGalleryItem>
              <SliderGalleryItem>
                <GalleryItem
                  icon={<FaSocks />}
                  label={'Food'}
                  dataset={{
                    borderRadius: 8,
                    label: '',
                    data: [100],
                    barThickness: 10,
                    backgroundColor: '#a8aaac',
                  }}
                />
              </SliderGalleryItem>
            </SliderGallery>
            <div className="p-2">
              <div className="flex w-full border-b-2 border-ui-grey-body">
                <H1 variant="large">Transactions</H1>
              </div>
            </div>
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
          <Button variant="hub" className="rounded-none" onClick={() => navigate('/hub')}>
            <H1 variant="large">Begin Your journey!</H1>
          </Button>
        </div>
      </div>
    </BasePage>
  )
}
