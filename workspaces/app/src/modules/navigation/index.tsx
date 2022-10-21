import { FaHouseUser } from 'react-icons/fa'
import { H1 } from '../h1'
import Icon from '../icon'

export interface NavigationProps {}

export const Navigation = ({}: NavigationProps) => {
  return (
    <div className="flex w-full justify-between">
      <Icon>
        <FaHouseUser />
      </Icon>
      <H1 className="h-full text-center text-xl">Username</H1>
      <H1 className="h-full text-center text-xl">WISE</H1>
    </div>
  )
}

export default Navigation
