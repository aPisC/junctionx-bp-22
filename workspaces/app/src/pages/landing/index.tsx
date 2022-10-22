import Button from '../../modules/button'
import { FlagSelector } from '../../modules/flagSelector'
import { H1 } from '../../modules/h1'

export interface LandingPageProps {}

export default function LandingPage({}: LandingPageProps) {
  return (
    <div className="p-4 w-full h-full flex flex-col justify-evenly items-center">
      <H1>Home Country</H1>
      <FlagSelector />
      <a href="/home">
        <Button rounded>Continue</Button>
      </a>
    </div>
  )
}
