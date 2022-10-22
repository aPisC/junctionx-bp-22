import { flags } from '../../config/flags'
import Button from '../../modules/button'
import { H1 } from '../../modules/h1'
import Icon from '../../modules/icon'

export interface FlagOptionProps {
  flag: typeof flags[0]
}

export const FlagOption = ({ flag }: FlagOptionProps) => {
  return (
    <H1 variant="medium" className="flex justify-between w-full items-center">
      <img className="aspect-square h-6" src={flag.flag} alt={flag.flag} />
      {flag.country}
    </H1>
  )
}

export default FlagOption
