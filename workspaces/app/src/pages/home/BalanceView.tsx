import { H1 } from '../../modules/h1'
import { BalanceViewStyle } from '../../styles/balanceView/BalanceView'
import { round } from '../../utils/round'
import { commify, objectsToString } from '../../utils/Utils'

export interface BalanceViewProps {
  title: string
  value: number
  currency: string
}

export const BalanceView = ({ title, value, currency }: BalanceViewProps) => {
  return (
    <div className={objectsToString(BalanceViewStyle.container)}>
      <div className={objectsToString(BalanceViewStyle.item)}>
        <H1 variant="medium-black" className="pb-0">
          {title}
        </H1>
      </div>
      <div className={objectsToString(BalanceViewStyle.item)}>
        <H1 variant="base" className="pt-0">
          {commify(round(value))} {currency}
        </H1>
      </div>
    </div>
  )
}

export default BalanceView
