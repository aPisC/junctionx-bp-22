import axios from 'axios'
import { Scrollbars } from 'react-custom-scrollbars-2'
import {
  FaBalanceScale,
  FaBath,
  FaBrain,
  FaBus,
  FaDice,
  FaLaptop,
  FaPills,
  FaQuestion,
  FaSocks,
  FaUtensils,
  FaWineGlass,
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../config/backendUrl'
import Button from '../../modules/button'
import { H1 } from '../../modules/h1'
import Icon from '../../modules/icon'
import Navigation from '../../modules/navigation'
import SliderGallery, { SliderGalleryItem } from '../../modules/sliderGallery'
import { useSpinneredRequest } from '../../utils/useSpinneredRequest'
import BasePage from '../base'
import { InfoBox } from './InfoBox'
import PieChart from './PieChart'
import SliderItem from './SliderItem'

type Props = {}

export default function ComparisonDashboardPage({}: Props) {
  const navigate = useNavigate()
  const userRequest = useSpinneredRequest(
    () =>
      axios(`${BACKEND_URL}/api/user/${localStorage.getItem('token')}`)
        .then((d) => d.data)
        .catch((e) => {
          localStorage.removeItem('token')
          navigate('/')
        }),
    []
  )

  const summaryRequest = useSpinneredRequest(
    () =>
      axios(`${BACKEND_URL}/api/transaction/summary/${localStorage.getItem('token')}`)
        .then((d) => d.data)
        .catch((e) => {
          localStorage.removeItem('token')
          navigate('/')
        }),
    []
  )

  const transactionsRequest = useSpinneredRequest(
    () =>
      axios(`${BACKEND_URL}/api/transaction/transactions/${localStorage.getItem('token')}`)
        .then((d) => d.data)
        .catch((e) => {
          localStorage.removeItem('token')
          navigate('/')
        }),
    []
  )

  if (userRequest.isRunning || summaryRequest.isRunning) return null

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
                  <FaBalanceScale className="text-5xl text-wise-navy-blue" />
                </Icon>
              }
              title="Compare your living expenses!"
            />
            <PieChart
              currency={user.accounts[0].currency}
              homeAmount={Object.keys(summaryRequest.data || {}).reduce(
                (sum, key) => sum + summaryRequest.data[key].amount,
                0
              )}
              targetAmount={Object.keys(summaryRequest.data || {}).reduce(
                (sum, key) => sum + (summaryRequest.data[key].predicted || 0),
                0
              )}
              homeCountry={user.sourceCountry}
              targetCountry={user.targetCountry}
            />
            <div className="p-2">
              <div className="flex w-full border-b-2 border-ui-grey-body">
                <H1 variant="large">Categories</H1>
              </div>
            </div>
            <SliderGallery>
              {summaryRequest.data?.map((sum: any, index: number) => (
                <SliderGalleryItem key={index}>
                  <SliderItem
                    hideModal={false}
                    unit=""
                    value={Math.abs(Math.round(sum.amount - sum.predicted))}
                    icon={BarIconMap[sum.id] || <FaQuestion />}
                    labels={['Food']}
                    currency={userRequest.data?.accounts[0].currency}
                    transactions={transactionsRequest.data?.filter((tr: any) => tr.category == sum.id) || []}
                    sourceCountry={userRequest.data?.sourceCountry}
                    targetCountry={userRequest.data?.targetCountry}
                    datasets={[
                      {
                        label: 'Home',
                        data: [sum.amount],
                        barThickness: 10,
                        borderRadius: 8,
                        backgroundColor: '#37517e',
                      },
                      {
                        label: 'Ex.',
                        data: [sum.predicted],
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
            <H1 variant="medium">Spend like a local!</H1>
          </Button>
        </div>
      </div>
    </BasePage>
  )
}

const BarIconMap: { [key: string]: JSX.Element } = {
  'food-non-alc': <FaUtensils />,
  clothing: <FaSocks />,
  health: <FaPills />,
  'alc-tobaco': <FaWineGlass />,
  education: <FaBrain />,
  'util-bills': <FaBath />,
  'it-tech': <FaLaptop />,
  leisure: <FaDice />,
  transport: <FaBus />,
}
