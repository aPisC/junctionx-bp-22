import Button from '../../modules/button'
import { H1 } from '../../modules/h1'
import Navigation from '../../modules/navigation'
import BasePage from '../base'

export interface HubPageProps {}

export default function HubPage({}: HubPageProps) {
  return (
    <BasePage>
      <div className="h-full flex flex-col">
        <Navigation />
        <div className="flex-grow overflow-hidden">
          <div className="flex flex-col gap-2 p-2">
            <Button variant="hub">
              <H1>Compare</H1>
            </Button>
            <Button variant="hub">
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
