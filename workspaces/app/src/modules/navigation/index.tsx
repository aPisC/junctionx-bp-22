import { FaHouseUser } from 'react-icons/fa'
import { H1 } from '../h1'
import Icon from '../icon'

export interface NavigationProps {}

export const Navigation = ({}: NavigationProps) => {
  return (
    <div className="flex w-full justify-between">
      <a href="/home">
        <Icon>
          <FaHouseUser />
        </Icon>
      </a>
      <H1 variant="medium" className="h-full text-center">
        Username
      </H1>
      <H1 variant="medium" className="h-full text-center">
        WISE
      </H1>
    </div>
  )
}

export default Navigation
