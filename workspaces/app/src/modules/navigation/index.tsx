import { FaArrowLeft, FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { H1 } from '../h1'
import Icon from '../icon'
import Logo from './Logo.svg'

export interface NavigationProps {}

export const Navigation = ({}: NavigationProps) => {
  const navigate = useNavigate()
  return (
    <div className="flex w-full justify-between bg-ui-grey">
      <Icon onClick={() => navigate(-1)}>
        <FaArrowLeft className="cursor-pointer" />
      </Icon>
      <H1 variant="medium" className="h-full flex-1 text-center">
        <div className="h-full p-2">
          <img className="h-full" src={Logo} />
        </div>
      </H1>
      <Icon onClick={() => navigate('/home')}>
        <FaUserCircle className="cursor-pointer" />
      </Icon>
    </div>
  )
}

export default Navigation
