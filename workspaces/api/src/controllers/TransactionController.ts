import { Route } from 'raven-plugin-koa'
import { Repository, Sequelize } from 'sequelize-typescript'
import { injectable } from 'tsyringe'
import { uuid } from 'uuidv4'
import AccountModel from '../models/AccountModel'
import TransactionModel from '../models/TransactionModel'
import UserModel from '../models/UserModel'
import PPPPredictor from '../services/PPPPredictor'
import { categories } from './CategoriesController'

@injectable()
@Route.Prefix('/transaction')
export default class TransactionController {
  private readonly transactionRepository: Repository<TransactionModel>
  private readonly userRepository: Repository<UserModel>
  private readonly accountRepository: Repository<AccountModel>

  constructor(sequelize: Sequelize) {
    this.transactionRepository = sequelize.getRepository(TransactionModel)
    this.userRepository = sequelize.getRepository(UserModel)
    this.accountRepository = sequelize.getRepository(AccountModel)
  }

  @Route.Get('/transactions/:userId')
  async getPredictions(ctx: any) {
    const userId = ctx.request.params.userId
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (!user) throw new Error('User not found')

    const predictor = user.targetCountry ? new PPPPredictor(user.sourceCountry, user.targetCountry) : null
    const transactions = await this.transactionRepository.findAll({
      order: [['timestamp', 'DESC']],
      where: { user: userId },
    })
    const predictions = transactions.map((tr) => ({
      ...tr.toJSON(),
      portion: predictor?.getPrice(tr.category, 1),
      predicted: predictor?.getPrice(tr.category, tr.amount),
    }))
    return predictions
  }

  @Route.Post('/')
  async create(ctx: any) {
    const body: CreateTransactionRequest = ctx.request.body

    const user = await this.userRepository.findOne({
      where: {
        id: body.userId,
      },
    })

    if (!user) throw new Error('User not found')
    const saveAccount = await this.accountRepository.findOne({ where: { user: body.userId, type: 'save' } })
    const mainAccount = await this.accountRepository.findOne({ where: { user: body.userId, type: 'main' } })

    if (!saveAccount || !mainAccount) throw new Error('Account not found')

    if (user.targetCountry) {
      const predictor = new PPPPredictor(user.sourceCountry, user.targetCountry)
      const predicted = predictor.getPrice(body.category, body.amount)
      if (predicted > body.amount) {
        mainAccount.balance -= predicted
        mainAccount.expense += predicted
        await mainAccount.save()
        await this.transactionRepository.create({
          user: user.id,
          account: mainAccount.id,
          name: body.name,
          category: body.category,
          amount: -body.amount,
          timestamp: new Date(),
          id: uuid(),
        })
        await this.transactionRepository.create({
          user: user.id,
          account: mainAccount.id,
          category: 'saving',
          name: 'Saving money',
          amount: -predicted + body.amount,
          timestamp: new Date(),
          id: uuid(),
        })

        saveAccount.balance += predicted - body.amount
        saveAccount.expense -= predicted - body.amount
        await saveAccount.save()
        await this.transactionRepository.create({
          user: user.id,
          account: saveAccount.id,
          category: 'saving',
          name: 'Saving money',
          amount: predicted - body.amount,
          timestamp: new Date(),
          id: uuid(),
        })

        return this.userRepository.findOne({ include: [this.accountRepository], where: { id: body.userId } })
      } else {
        const fund = Math.min(saveAccount.balance, body.amount - predicted)
        if (fund > 0) {
          saveAccount.balance -= fund
          saveAccount.expense += fund
          await saveAccount.save()
          await this.transactionRepository.create({
            user: user.id,
            account: saveAccount.id,
            name: 'Subside',
            category: 'subside',
            amount: -fund,
            timestamp: new Date(),
            id: uuid(),
          })
          await this.transactionRepository.create({
            user: user.id,
            account: mainAccount.id,
            name: 'Subside',
            category: 'subside',
            amount: fund,
            timestamp: new Date(),
            id: uuid(),
          })
          mainAccount.expense -= fund
        }
      }
    }

    mainAccount.balance -= body.amount
    mainAccount.expense += body.amount
    await mainAccount.save()
    await this.transactionRepository.create({
      user: user.id,
      account: mainAccount.id,
      category: body.category,
      name: body.name,
      amount: -body.amount,
      timestamp: new Date(),
      id: uuid(),
    })

    return this.userRepository.findOne({ include: [this.accountRepository], where: { id: body.userId } })
  }

  @Route.Get('/summary/:userId')
  async summary(ctx: any) {
    const userId = ctx.request.params.userId
    const user = await this.userRepository.findOne({ where: { id: userId } })
    const mainAccount = await this.accountRepository.findOne({ where: { user: userId, type: 'main' } })

    if (!user || !mainAccount) throw new Error('User or account not found')

    const predictor = user.targetCountry ? new PPPPredictor(user.sourceCountry, user.targetCountry) : null
    const transactions = await this.transactionRepository.findAll({
      order: [['timestamp', 'DESC']],
      where: { user: userId },
    })

    const summary: any = {}

    Object.keys(categories).forEach((cat) => {
      const amount = -transactions
        .filter((tr) => tr.category == cat && tr.account == mainAccount.id && tr.amount < 0)
        .reduce((sum, tr) => sum + tr.amount, 0)
      summary[cat] = {
        ...categories[cat],
        amount: amount,
        portion: predictor?.getPrice(cat, 1),
        predicted: predictor?.getPrice(cat, amount),
      }
    })

    const summaryEntries = Object.values(summary).sort((a: any, b: any) => b.amount - a.amount)

    return summaryEntries
  }
}

interface CreateTransactionRequest {
  amount: number
  userId: string
  category: string
  name: string
}
