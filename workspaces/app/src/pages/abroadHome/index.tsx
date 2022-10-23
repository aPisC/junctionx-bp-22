import axios from 'axios'
import { useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useNavigate } from 'react-router-dom'
import { FlagsRequest } from '../../cache/flagRequest'
import { BACKEND_URL } from '../../config/backendUrl'
import Button from '../../modules/button'
import { H1 } from '../../modules/h1'
import Modal, { ModalBody, ModalCloseContainer, ModalHandler } from '../../modules/modal'
import Navigation from '../../modules/navigation'
import Tabs, { Tab, TabsBody, TabsHeader, TabsPanel } from '../../modules/tabs'
import { useComponentTracing } from '../../tracer'
import { round } from '../../utils/round'
import { useRequest } from '../../utils/useRequest'
import { useSpinneredRequest } from '../../utils/useSpinneredRequest'
import BasePage from '../base'
import BalanceView from '../home/BalanceView'
import TransactionItem from '../home/TransactionItem'
import { LineChartView } from '../savingHome/LineChartView'

export interface AbroadHomePageProps {}

export default function AbroadHomePage({}: AbroadHomePageProps) {
  useComponentTracing('abroad-home')
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
            <div className="p-2 flex flex-col gap-2 h-full max-h-[10rem] overflow-hidden">
              <Scrollbars>
                {transactions
                  ?.filter((tr: any) => tr.account === saveAccount.id)
                  .map((tr: any, index: any) => (
                    <Modal key={index} blur rounded>
                      <ModalHandler>
                        <div className="cursor-pointer">
                          <TransactionItem
                            currency={mainAccount.currency}
                            key={tr.id}
                            shop={tr.name}
                            expense={tr.amount}
                          />
                        </div>
                      </ModalHandler>
                      <ModalBody title="History details">
                        <div className=" p-4">
                          <div className="w-full text-center">
                            <H1 variant="medium">{tr.name}</H1>
                          </div>
                          <div className="flex w-full justify-between">
                            <div className="text-ui-grey-body">Original price</div>
                            <div className="">{`${round(tr.baseAmount)} ${mainAccount.currency}`}</div>
                          </div>
                          <div className="flex w-full justify-between">
                            <div className="text-ui-grey-body">Corrected price</div>
                            <div className="">{`${round(tr.basePredicted)} ${mainAccount.currency}`}</div>
                          </div>
                          <div className="flex w-full justify-between">
                            <div className="text-ui-grey-body">Jar balance change</div>
                            <div className="">{`${round(tr.basePredicted - tr.baseAmount)} ${
                              mainAccount.currency
                            }`}</div>
                          </div>
                        </div>
                      </ModalBody>
                    </Modal>
                  ))}
              </Scrollbars>
            </div>
            <div className="px-2">
              <div className="flex w-full border-b-2 border-ui-grey-body">
                <H1 variant="large">Accumulating</H1>
              </div>
            </div>
            <LineChartView />
            <div className="w-full gap-2 flex justify-center p-4">
              <Modal blur rounded>
                <ModalHandler>
                  <Button rounded variant="primary">
                    Imitate shopping
                  </Button>
                </ModalHandler>
                <ModalBody title="Imaginary shopping">
                  {shoppingList.map((item, index) => (
                    <div key={index} className="px-2">
                      <div
                        onClick={() =>
                          axios
                            .post(`${BACKEND_URL}/api/transaction`, {
                              amount:
                                item.price *
                                (flagsRequest.data?.find((x) => x.id === user.sourceCountry)?.exchange ?? 1),
                              userId: user.id,
                              category: item.category,
                              name: item.title,
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
                          {`${item.price * (flagsRequest.data?.find((x) => x.id === user.sourceCountry)?.exchange ?? 1)}
                          ${' '}${mainAccount.currency}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </ModalBody>
              </Modal>
              <Modal rounded blur>
                <ModalHandler>
                  <Button rounded variant="primary">
                    Recreate Account
                  </Button>
                </ModalHandler>
                <ModalBody title="">
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-full h-[50%] flex text-center">
                      You are about to delete this account! Are you sure?
                    </div>
                    <div className="w-full flex gap-2 justify-evenly">
                      <Button
                        variant="primary"
                        rounded
                        onClick={() => {
                          localStorage.clear()
                          setTrigger(!trigger)
                        }}
                      >
                        Yes
                      </Button>
                      <ModalCloseContainer>
                        <Button variant="primary" rounded>
                          No
                        </Button>
                      </ModalCloseContainer>
                    </div>
                  </div>
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
