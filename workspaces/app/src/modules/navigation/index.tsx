import { FaAngleLeft, FaArrowLeft, FaUserCircle } from 'react-icons/fa'
import { H1 } from '../h1'
import Icon from '../icon'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo.svg'

export interface NavigationProps {}

export const Navigation = ({}: NavigationProps) => {
  const navigate = useNavigate()
  return (
    <div className="flex w-full justify-between bg-ui-grey">
      <Icon onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </Icon>
      <H1 variant="medium" className="h-full text-center">
        <div className="h-full p-2">
          <img className="h-full" src={Logo} />
        </div>
      </H1>
      <Icon onClick={() => navigate('/home')}>
        <FaUserCircle />
      </Icon>
    </div>
  )
}

export default Navigation
