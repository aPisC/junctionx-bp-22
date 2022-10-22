import { FaUserCircle } from 'react-icons/fa'
import { H1 } from '../h1'
import Icon from '../icon'
import { useNavigate } from 'react-router-dom'

export interface NavigationProps {}

export const Navigation = ({}: NavigationProps) => {
  const navigate = useNavigate()
  return (
    <div className="flex w-full justify-between bg-ui-grey">
      <Icon onClick={() => navigate('/home')}>
        <FaUserCircle />
      </Icon>
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
