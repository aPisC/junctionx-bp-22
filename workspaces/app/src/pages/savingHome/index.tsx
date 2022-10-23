import { Scrollbars } from 'react-custom-scrollbars-2'
import { useNavigate } from 'react-router-dom'
import { H1 } from '../../modules/h1'
import Navigation from '../../modules/navigation'
import BasePage from '../base'
import BalanceView from '../home/BalanceView'
import TransactionItem from '../home/TransactionItem'
import { LineChartView } from './LineChartView'

interface SavingHomePageProps {}

export default function SavingHomePage({}: SavingHomePageProps) {
  const navigate = useNavigate()
  return (
    <BasePage>
      <div className="h-full flex flex-col">
        <Navigation />
        <div className="flex-grow overflow-hidden">
          <Scrollbars>
            <div className="flex flex-col">
              <div className="p-2 rounded-lg">
                <BalanceView currency="Magyar forint" title="Jar account" value={120000} />
              </div>
              <div className="py-2 h-[15rem] overflow-hidden">
                <Scrollbars>
                  <div className="flex flex-col gap-2">
                    <TransactionItem currency="HUF" shop="Spar megacorp." expense={38000} />
                    <TransactionItem currency="HUF" shop="Spar megacorp." expense={38000} />
                    <TransactionItem currency="HUF" shop="Spar megacorp." expense={38000} />
                    <TransactionItem currency="HUF" shop="Spar megacorp." expense={38000} />
                    <TransactionItem currency="HUF" shop="Spar megacorp." expense={38000} />
                    <TransactionItem currency="HUF" shop="Spar megacorp." expense={38000} />
                    <TransactionItem currency="HUF" shop="Spar megacorp." expense={38000} />
                    <TransactionItem currency="HUF" shop="Spar megacorp." expense={38000} />
                    <TransactionItem currency="HUF" shop="Spar megacorp." expense={38000} />
                  </div>
                </Scrollbars>
              </div>
            </div>
            <div>
              <H1>Savings</H1>
              <LineChartView />
            </div>
          </Scrollbars>
        </div>
      </div>
    </BasePage>
  )
}
