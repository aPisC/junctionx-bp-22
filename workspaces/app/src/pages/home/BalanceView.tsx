import { H1 } from '../../modules/h1'
import { BalanceViewStyle } from '../../styles/balanceView/BalanceView'
import { objectsToString } from '../../utils/Utils'

export interface BalanceViewProps {
  title: string
  value: number
  currency: string
}

export const BalanceView = ({ title, value, currency }: BalanceViewProps) => {
  return (
    <div className={objectsToString(BalanceViewStyle.container)}>
      <div className={objectsToString(BalanceViewStyle.item)}>
        <H1 variant="medium-transparent">{title}</H1>
      </div>
      <div className={objectsToString(BalanceViewStyle.item)}>
        <H1 variant="base-white">{value}</H1>
      </div>
      <div className={objectsToString(BalanceViewStyle.item)}>
        <H1 variant="medium-transparent">{currency}</H1>
      </div>
    </div>
  )
}

export default BalanceView
