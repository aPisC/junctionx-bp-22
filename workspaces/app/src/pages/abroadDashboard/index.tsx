import axios from 'axios'
import Scrollbars from 'react-custom-scrollbars-2'
import { FaArchive, FaQuestion } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../config/backendUrl'
import Button from '../../modules/button'
import { H1 } from '../../modules/h1'
import Icon from '../../modules/icon'
import Navigation from '../../modules/navigation'
import SliderGallery, { SliderGalleryItem } from '../../modules/sliderGallery'
import { round } from '../../utils/round'
import { useSpinnerOverlay } from '../../utils/SipnnerOverlay/useSpinnerOverlay'
import { useRequest } from '../../utils/useRequest'
import { useSpinneredRequest } from '../../utils/useSpinneredRequest'
import BasePage from '../base'
import { BarIconMap } from '../comparisonDashboard'
import { InfoBox } from '../comparisonDashboard/InfoBox'
import PieChart from '../comparisonDashboard/PieChart'
import SliderItem from '../comparisonDashboard/SliderItem'

export interface AbroadDashboardPageProps {}

export default function AbroadDashboardPage({}: AbroadDashboardPageProps) {
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

  if (userRequest.isRunning) return null

  const user: any = userRequest.data

  return (
    <BasePage>
      <div className="h-full flex flex-col">
        <Navigation />
        <div className="flex flex-grow overflow-hidden items-start">
          <Scrollbars>
            <InfoBox
              icon={
                <Icon>
                  <FaArchive className="text-5xl text-wise-navy-blue" />
                </Icon>
              }
              title="Arrived in the country!"
            />
            <div className="flex flex-col w-full justify-center">
              <PieChart
                currency={user.accounts[0].currency}
                homeCountry={user.sourceCountry}
                targetCountry={user.targetCountry}
                homeAmount={Object.keys(summaryRequest.data || {}).reduce(
                  (sum, key) => sum + summaryRequest.data[key].amount,
                  0
                )}
                targetAmount={Object.keys(summaryRequest.data || {}).reduce(
                  (sum, key) => sum + (summaryRequest.data[key].predicted || 0),
                  0
                )}
              />
              <SliderGallery>
                {summaryRequest.data?.map((sum: any, index: number) => {
                  const home = sum.amount
                  const abroad = sum.predicted
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
                      backgroundColor: '#A8AAAC',
                      stack: `${home > abroad ? 'stack1' : 'stack0'}`,
                    })
                    data.push({
                      label: 'Ex.',
                      data: [abroad],
                      barThickness: 10,
                      borderRadius: 8,
                      backgroundColor: '#00b9ff',
                      stack: 'stack1',
                    })
                  } else {
                    data.push({
                      label: 'Ex.',
                      data: [abroad],
                      barThickness: 10,
                      borderRadius: 8,
                      backgroundColor: '#00b9ff',
                      stack: 'stack1',
                    })
                    data.push({
                      label: 'Home',
                      data: [Math.abs(home - abroad)],
                      barThickness: 10,
                      borderRadius: 8,
                      backgroundColor: '#A8AAAC',
                      stack: `${home > abroad ? 'stack1' : 'stack0'}`,
                    })
                  }

                  return (
                    <SliderGalleryItem key={index}>
                      <SliderItem
                        sourceCountry={userRequest.data?.sourceCountry}
                        targetCountry={userRequest.data?.targetCountry}
                        transactions={[]}
                        hideModal={true}
                        value={round((sum.portion - 1) * 100)}
                        unit="%"
                        icon={BarIconMap[sum.id] || <FaQuestion />}
                        labels={['Food']}
                        datasets={data}
                      />
                    </SliderGalleryItem>
                  )
                })}
              </SliderGallery>
            </div>
          </Scrollbars>
        </div>
        <div>
          <Button
            variant="hub"
            className="rounded-none"
            onClick={() => {
              navigate('/abroad-home')
            }}
          >
            <H1>Start saving</H1>
          </Button>
        </div>
      </div>
    </BasePage>
  )
}
