import { FaArchive, FaBalanceScale, FaCalendar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Button from '../../modules/button'
import Icon from '../../modules/icon'
import Navigation from '../../modules/navigation'
import BasePage from '../base'
import { InfoBox } from '../comparisonDashboard/InfoBox'

export interface HubPageProps {}

export default function HubPage({}: HubPageProps) {
  const navigate = useNavigate()
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
          </div>
        </div>
      </div>
    </BasePage>
  )
}
