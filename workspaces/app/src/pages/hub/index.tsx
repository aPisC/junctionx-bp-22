import Button from '../../modules/button'
import { H1 } from '../../modules/h1'
import BasePage from '../base'

export interface HubPageProps {}

export default function HubPage({}: HubPageProps) {
  return (
    <BasePage>
      <div className="flex flex-col gap-2 p-2 w-full">
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
    </BasePage>
  )
}
