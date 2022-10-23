import axios from 'axios'
import Scrollbars from 'react-custom-scrollbars-2'
import { FaCalendar, FaQuestion, FaUtensils } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../config/backendUrl'
import Button from '../../modules/button'
import { H1 } from '../../modules/h1'
import Icon from '../../modules/icon'
import Navigation from '../../modules/navigation'
import SliderGallery, { SliderGalleryItem } from '../../modules/sliderGallery'
import { round } from '../../utils/round'
import { useSpinneredRequest } from '../../utils/useSpinneredRequest'
import BasePage from '../base'
import { BarIconMap } from '../comparisonDashboard'
import { InfoBox } from '../comparisonDashboard/InfoBox'
import PieChart from '../comparisonDashboard/PieChart'
import SliderItem from '../comparisonDashboard/SliderItem'

export interface SavingDashboardPageProps {}

export default function SavingDashboardPage({}: SavingDashboardPageProps) {
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
                  <FaCalendar className="text-5xl text-wise-navy-blue" />
                </Icon>
              }
              title="Start spending like a local!"
            />
            <div className="flex flex-col w-full justify-center">
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
                {summaryRequest.data?.map((sum: any, index: number) => {
                  const data = [
                    {
                      label: 'Home',
                      data: [sum.amount],
                      barThickness: 10,
                      borderRadius: 8,
                      backgroundColor: '#37517e',
                      stack: 'stack0',
                    },
                  ]
                  if (sum.amount < sum.predicted) {
                    data.push({
                      label: 'Home',
                      data: [Math.abs(sum.amount - sum.predicted)],
                      barThickness: 10,
                      borderRadius: 8,
                      backgroundColor: '#A8AAAC',
                      stack: `${sum.amount > sum.predicted ? 'stack1' : 'stack0'}`,
                    })
                    data.push({
                      label: 'Ex.',
                      data: [sum.predicted],
                      barThickness: 10,
                      borderRadius: 8,
                      backgroundColor: '#00b9ff',
                      stack: 'stack1',
                    })
                  } else {
                    data.push({
                      label: 'Ex.',
                      data: [sum.predicted],
                      barThickness: 10,
                      borderRadius: 8,
                      backgroundColor: '#00b9ff',
                      stack: 'stack1',
                    })
                    data.push({
                      label: 'Home',
                      data: [Math.abs(sum.amount - sum.predicted)],
                      barThickness: 10,
                      borderRadius: 8,
                      backgroundColor: '#A8AAAC',
                      stack: `${sum.amount > sum.predicted ? 'stack1' : 'stack0'}`,
                    })
                  }

                  return (
                    <SliderGalleryItem key={index}>
                      <SliderItem
                        sourceCountry={userRequest.data?.sourceCountry}
                        targetCountry={userRequest.data?.targetCountry}
                        transactions={[]}
                        hideModal
                        unit="%"
                        value={round((sum.portion - 1) * 100)}
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
          <Button variant="hub" className="rounded-none" onClick={() => navigate('/saving-home')}>
            <H1>Start</H1>
          </Button>
        </div>
      </div>
    </BasePage>
  )
}
