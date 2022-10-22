import { BACKEND_URL } from '../../config/backendUrl'

export interface FlagOptionProps {
  flag: any
}

export const FlagOption = ({ flag }: FlagOptionProps) => {
  return (
    <div className="px-2">
      <div className="flex w-full justify-between px-4 items-center border-b border-dark-grey">
        <div className="flex w-full">
          <img className="aspect-square h-6" src={`${BACKEND_URL}/${flag?.image}`} alt={flag.country} />
        </div>
        <div className="flex">{flag.country}</div>
      </div>
    </div>
  )
}

export default FlagOption
