import axios from 'axios'
import { FaArchive, FaBalanceScale, FaCalendar, FaRedo } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../config/backendUrl'
import Button from '../../modules/button'
import Icon from '../../modules/icon'
import Navigation from '../../modules/navigation'
import { useComponentTracing } from '../../tracer'
import { useSpinneredRequest } from '../../utils/useSpinneredRequest'
import BasePage from '../base'
import { InfoBox } from '../comparisonDashboard/InfoBox'

export interface HubPageProps {}

export default function HubPage({}: HubPageProps) {
  useComponentTracing('hub')

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
  return (
    <BasePage>
      <div className="h-full flex flex-col">
        <Navigation />
        <div className="flex-grow overflow-hidden">
          <div className="flex flex-col gap-2 w-full h-full items-stretch px-4 justify-center">
            <Button variant="none" onClick={() => navigate('/comparison-selector')}>
              <InfoBox
                icon={
                  <Icon>
                    <FaBalanceScale className="text-5xl text-wise-navy-blue" />
                  </Icon>
                }
                title="Compare your living expenses!"
              />
            </Button>
            <Button variant="none" onClick={() => navigate('/saving-selection')}>
              <InfoBox
                icon={
                  <Icon>
                    <FaCalendar className="text-5xl text-wise-navy-blue" />
                  </Icon>
                }
                title="Start spending like a local!"
              />
            </Button>
            <Button variant="none" onClick={() => navigate('/abroad-selection')}>
              <InfoBox
                icon={
                  <Icon>
                    <FaArchive className="text-5xl text-wise-navy-blue" />
                  </Icon>
                }
                title="Arrived in the country!"
              />
            </Button>
            {userRequest.data?.targetCountry ? (
              <Button
                variant="none"
                onClick={async () => {
                  await axios
                    .post(`${BACKEND_URL}/api/user/setTarget/null/${userRequest.data.id}`)
                    .then(() => navigate('/comparison-selector'))
                }}
              >
                <InfoBox
                  icon={
                    <Icon>
                      <FaRedo className="text-5xl text-wise-navy-blue" />
                    </Icon>
                  }
                  title="Change country"
                />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </BasePage>
  )
}
