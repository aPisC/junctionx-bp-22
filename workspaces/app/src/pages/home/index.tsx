import axios from 'axios'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { FaSocks, FaUtensils } from 'react-icons/fa'
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
import { GalleryItem } from './GalleryItem'
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
              {transactionsRequest.data
                ?.filter((tr: any) => tr.amount < 0)
                .map((tr: any) => (
                  <TransactionItem key={tr.id} shop={tr.name} expense={-tr.amount} />
                ))}
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
