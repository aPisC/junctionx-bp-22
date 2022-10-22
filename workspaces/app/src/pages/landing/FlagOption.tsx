import { H1 } from '../../modules/h1'

export interface FlagOptionProps {
  flag: any
}

export const FlagOption = ({ flag }: FlagOptionProps) => {
  return (
    <H1 variant="medium" className="flex justify-between w-full items-center">
      <img className="aspect-square h-6" src={flag.image} alt={flag.country} />
      {flag.country}
    </H1>
  )
}

export default FlagOption
