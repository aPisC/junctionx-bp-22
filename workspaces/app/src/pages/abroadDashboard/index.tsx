import axios from 'axios'
import Scrollbars from 'react-custom-scrollbars-2'
import { FaArchive, FaUtensils } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../config/backendUrl'
import Button from '../../modules/button'
import { H1 } from '../../modules/h1'
import Icon from '../../modules/icon'
import Modal, { ModalBody, ModalHandler } from '../../modules/modal'
import Navigation from '../../modules/navigation'
import SliderGallery, { SliderGalleryItem } from '../../modules/sliderGallery'
import { useSpinnerOverlay } from '../../utils/SipnnerOverlay/useSpinnerOverlay'
import { useRequest } from '../../utils/useRequest'
import { useSpinneredRequest } from '../../utils/useSpinneredRequest'
import BasePage from '../base'
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
                {Array.from(Array(7)).map((item, index) => {
                  const home = Math.floor(Math.random() * 200)
                  const abroad = Math.floor(Math.random() * 200)

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
                      backgroundColor: '#00b9ff',
                      stack: `${home > abroad ? 'stack1' : 'stack0'}`,
                    })
                    data.push({
                      label: 'Ex.',
                      data: [abroad],
                      barThickness: 10,
                      borderRadius: 8,
                      backgroundColor: '#A8AAAC',
                      stack: 'stack1',
                    })
                  } else {
                    data.push({
                      label: 'Ex.',
                      data: [abroad],
                      barThickness: 10,
                      borderRadius: 8,
                      backgroundColor: '#A8AAAC',
                      stack: 'stack1',
                    })
                    data.push({
                      label: 'Home',
                      data: [Math.abs(home - abroad)],
                      barThickness: 10,
                      borderRadius: 8,
                      backgroundColor: '#00b9ff',
                      stack: `${home > abroad ? 'stack1' : 'stack0'}`,
                    })
                  }

                  return (
                    <SliderGalleryItem key={index}>
                      <SliderItem value={200} unit="km" icon={<FaUtensils />} labels={['Food']} datasets={data} />
                    </SliderGalleryItem>
                  )
                })}
              </SliderGallery>
            </div>
          </Scrollbars>
        </div>
        <div>
          <Modal rounded blur>
            <ModalHandler>
              <Button variant="hub" className="rounded-none" onClick={() => navigate('/saving-home')}>
                <H1>What's next?</H1>
              </Button>
            </ModalHandler>
            <ModalBody title="Recommendation">
              <div className="h-full w-full p-4">
                <div className="flex flex-col w-full h-[50%] items-center justify-center">
                  <div className="text-center pb-2">Mitigate your expenses by using up Your saving Jar!</div>
                  <Button variant="primary" rounded className="bg-wise-navy-blue text-white">
                    Mitigate expenses!
                  </Button>
                </div>
                <div className="flex flex-col w-full h-[50%] items-center justify-center">
                  <div className="text-center pb-2">
                    Accumulate savings by artifically adjusting prices to your home country!
                  </div>
                  <Button variant="primary" rounded className="bg-wise-navy-blue text-white">
                    Create a Jar!
                  </Button>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </BasePage>
  )
}
