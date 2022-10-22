import axios from 'axios'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../config/backendUrl'
import Button from '../../modules/button'
import { H1 } from '../../modules/h1'
import Navigation from '../../modules/navigation'
import SliderGallery, { SliderGalleryItem } from '../../modules/sliderGallery'
import Tabs, { Tab, TabsBody, TabsHeader, TabsPanel } from '../../modules/tabs'
import { useSpinnerOverlay } from '../../utils/SipnnerOverlay/useSpinnerOverlay'
import { useRequest } from '../../utils/useRequest'
import BasePage from '../base'
import BalanceView from './BalanceView'
import { BarChartView } from './BarChartView'
import TransactionItem from './TransactionItem'

export interface HomePageProps {}

export default function HomePage({}: HomePageProps) {
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

  const transactionsRequest = useRequest(
    () =>
      axios(`${BACKEND_URL}/api/transaction/transactions/${localStorage.getItem('token')}`)
        .then((d) => d.data)
        .catch((e) => {
          localStorage.removeItem('token')
          navigate('/')
        }),
    []
  )

  useSpinnerOverlay(userRequest.isRunning)
  useSpinnerOverlay(transactionsRequest.isRunning)

  if (userRequest.isRunning) return null

  const user: any = userRequest.data
  console.log(user)
  const mainAccount = user.accounts.find((a: any) => a.type == 'main')
  const saveAccount = user.accounts.find((a: any) => a.type == 'save')

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
                  <BalanceView title="Account Balance" value={mainAccount.balance} currency="Magyar Forint" />
                </TabsPanel>
                <TabsPanel key="jar" value="jar">
                  <BalanceView title="Jar Balance" value={saveAccount.balance} currency="Magyar Forint" />
                </TabsPanel>
              </TabsBody>
            </Tabs>
            <div className="bg-wise-navy-dark p-2">
              <BalanceView title="Monthly Expense" value={mainAccount.expense} currency="Magyar Forint" />
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
              {transactionsRequest.data
                ?.filter((tr: any) => tr.amount < 0)
                .map((tr: any) => (
                  <TransactionItem key={tr.id} shop={tr.name} expense={-tr.amount} />
                ))}
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
