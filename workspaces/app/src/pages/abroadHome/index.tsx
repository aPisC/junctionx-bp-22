import axios from 'axios'
import React from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../config/backendUrl'
import { H1 } from '../../modules/h1'
import Navigation from '../../modules/navigation'
import Tabs, { TabsHeader, Tab, TabsBody, TabsPanel } from '../../modules/tabs'
import { useSpinneredRequest } from '../../utils/useSpinneredRequest'
import BasePage from '../base'
import BalanceView from '../home/BalanceView'
import TransactionItem from '../home/TransactionItem'
import { LineChartView } from '../savingHome/LineChartView'

export interface AbroadHomePageProps {}

export default function AbroadHomePage({}: AbroadHomePageProps) {
  const navigate = useNavigate()
  const userRequest = useSpinneredRequest(
    () =>
      axios(`${BACKEND_URL}/api/user/${localStorage.getItem('token')}`)
        .then((d) => d.data)
        .catch((e) => {
          localStorage.removeItem('token')
          navigate('/')
        }),
    []
  )

  const transactionsRequest = useSpinneredRequest(
    () =>
      axios(`${BACKEND_URL}/api/transaction/transactions/${localStorage.getItem('token')}`)
        .then((d) => d.data)
        .catch((e) => {
          localStorage.removeItem('token')
          navigate('/')
        }),
    []
  )

  if (userRequest.isRunning || transactionsRequest.isRunning) return null

  const user: any = userRequest.data
  const mainAccount = user.accounts.find((a: any) => a.type == 'main')
  const saveAccount = user.accounts.find((a: any) => a.type == 'save')
  return (
    <BasePage>
      <div className="h-full flex flex-col">
        <Navigation />
        <div className="flex-grow overflow-hidden">
          <Scrollbars>
            <Tabs value="jar">
              <div className="p-2 pb-0">
                <TabsHeader>
                  <Tab key="account" value="account">
                    <H1 variant="medium">Account</H1>
                  </Tab>
                  <Tab key="jar" value="jar">
                    <H1 variant="medium">Jar</H1>
                  </Tab>
                </TabsHeader>
              </div>
              <div className="px-2 py-1">
                <TabsBody>
                  <TabsPanel key="account" value="account">
                    <BalanceView title="Account Balance" value={mainAccount.balance} currency={mainAccount.currency} />
                  </TabsPanel>
                  <TabsPanel key="jar" value="jar">
                    <BalanceView title="Jar Balance" value={saveAccount.balance} currency={saveAccount.currency} />
                  </TabsPanel>
                </TabsBody>
              </div>
            </Tabs>
            <div className="p-2">
              <div className="flex w-full border-b-2 border-ui-grey-body">
                <H1 variant="large">Jar History</H1>
              </div>
            </div>
            <div className="p-2 flex flex-col gap-2 h-full max-h-[10em] overflow-hidden">
              <Scrollbars>
                {transactionsRequest.data
                  ?.filter((tr: any) => tr.amount < 0)
                  .map((tr: any) => (
                    <TransactionItem currency={mainAccount.currency} key={tr.id} shop={tr.name} expense={-tr.amount} />
                  ))}
              </Scrollbars>
            </div>
            <div className="px-2">
              <div className="flex w-full border-b-2 border-ui-grey-body">
                <H1 variant="large">Accumulating</H1>
              </div>
            </div>
            <LineChartView />
          </Scrollbars>
        </div>
      </div>
    </BasePage>
  )
}
