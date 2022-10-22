import { H1 } from '../../modules/h1'
import { BalanceViewStyle } from '../../styles/balanceView/BalanceView'
import { objectsToString } from '../../utils/Utils'

export interface BalanceViewProps {
  title: string
  value: number
  currency: string
  variant?: keyof typeof BalanceViewStyle.variants
}

export const BalanceView = ({ title, value, currency, variant = 'base' }: BalanceViewProps) => {
  return (
    <div className={objectsToString(BalanceViewStyle.container)}>
      <div className={objectsToString(BalanceViewStyle.item)}>
        <H1 className={objectsToString(BalanceViewStyle.variants[variant].default)}>{title}</H1>
      </div>
      <div className={objectsToString(BalanceViewStyle.item)}>
        <H1 className={objectsToString(BalanceViewStyle.variants[variant].value)}>{value}</H1>
      </div>
      <div className={objectsToString(BalanceViewStyle.item)}>
        <div className={objectsToString(BalanceViewStyle.variants[variant].default)}>{currency}</div>
      </div>
    </div>
  )
}

export default BalanceView
