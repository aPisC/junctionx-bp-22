import axios from 'axios'
import React, { useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useNavigate } from 'react-router-dom'
import { FlagsRequest } from '../../cache/flagRequest'
import { BACKEND_URL } from '../../config/backendUrl'
import Button from '../../modules/button'
import { H1 } from '../../modules/h1'
import Modal, { ModalBody, ModalHandler } from '../../modules/modal'
import Navigation from '../../modules/navigation'
import Tabs, { TabsHeader, Tab, TabsBody, TabsPanel } from '../../modules/tabs'
import { useRequest } from '../../utils/useRequest'
import { useSpinneredRequest } from '../../utils/useSpinneredRequest'
import { useTriggeredRequest } from '../../utils/useTriggeredRequest'
import BasePage from '../base'
import BalanceView from '../home/BalanceView'
import TransactionItem from '../home/TransactionItem'
import { LineChartView } from '../savingHome/LineChartView'

export interface AbroadHomePageProps {}

export default function AbroadHomePage({}: AbroadHomePageProps) {
  const [trigger, setTrigger] = useState(false)
  const navigate = useNavigate()
  const userRequest = useSpinneredRequest(
    () =>
      axios(`${BACKEND_URL}/api/user/${localStorage.getItem('token')}`)
        .then((d) => d.data)
        .catch((e) => {
          localStorage.removeItem('token')
          navigate('/')
        }),
    [trigger]
  )

  const transactionsRequest = useSpinneredRequest(
    () =>
      axios(`${BACKEND_URL}/api/transaction/transactions/${localStorage.getItem('token')}`)
        .then((d) => d.data)
        .catch((e) => {
          localStorage.removeItem('token')
          navigate('/')
        }),
    [trigger]
  )
  const flagsRequest = useRequest(() => FlagsRequest, [])

  if (userRequest.isRunning || transactionsRequest.isRunning) return null
  const user: any = userRequest.data
  const mainAccount = user.accounts.find((a: any) => a.type == 'main')
  const saveAccount = user.accounts.find((a: any) => a.type == 'save')
  const transactions = transactionsRequest.data
  console.log(flagsRequest)
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
                {transactions
                  ?.filter((tr: any) => tr.amount > 0 && tr.accout === saveAccount.id)
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
            <div className="w-full flex justify-center p-4">
              <Modal blur rounded>
                <ModalHandler>
                  <Button variant="primary">Imitate shopping</Button>
                </ModalHandler>
                <ModalBody title="Imaginary shopping">
                  {shoppingList.map((item, index) => (
                    <div className="px-2">
                      <div
                        onClick={() =>
                          axios
                            .post(`${BACKEND_URL}/api/transaction`, {
                              amount: item.price,
                              userId: user.id,
                              category: item.category,
                            })
                            .then(() => {
                              setTrigger(!trigger)
                            })
                        }
                        key={index}
                        className="flex w-full justify-between px-4 py-2 border-b border-dark-grey"
                      >
                        <div>{item.title}</div>
                        <div>
                          {item.price * (flagsRequest.data?.find((x) => x.id === user.sourceCountry)?.exchange ?? 1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </ModalBody>
              </Modal>
            </div>
          </Scrollbars>
        </div>
      </div>
    </BasePage>
  )
}

const shoppingList = [
  {
    title: 'Board games',
    price: 30,
    category: 'leisure',
  },
  {
    title: 'Laptop',
    price: 250,
    category: 'it-tech',
  },
  {
    title: 'Catfood',
    price: 10,
    category: 'food-non-alc',
  },
  {
    title: 'Groceries',
    price: 43,
    category: 'food-non-alc',
  },
  {
    title: 'Travel charge',
    price: 20,
    category: 'transport',
  },
  {
    title: 'Restaurant + tip',
    price: 30,
    category: 'food-non-alc',
  },
  {
    title: 'Nurse outfit',
    price: 50,
    category: 'clothing',
  },
]
