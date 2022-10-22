import Button from '../../modules/button'
import { H1 } from '../../modules/h1'
import Navigation from '../../modules/navigation'
import BasePage from '../base'
import { useNavigate } from 'react-router-dom'

export interface HubPageProps {}

export default function HubPage({}: HubPageProps) {
  const navigate = useNavigate()
  return (
    <BasePage>
      <div className="h-full flex flex-col">
        <Navigation />
        <div className="flex-grow overflow-hidden">
          <div className="flex flex-col gap-2 p-2">
            <Button variant="hub" onClick={() => navigate('/comparison-selector')}>
              <H1>Compare</H1>
            </Button>
            <Button variant="hub" onClick={() => navigate('/saving-selection')}>
              <H1>Plan</H1>
            </Button>
            <Button variant="hub">
              <H1>Move</H1>
            </Button>
          </div>
        </div>
      </div>
    </BasePage>
  )
}
