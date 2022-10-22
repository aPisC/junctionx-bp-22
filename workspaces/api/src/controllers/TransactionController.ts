import { Route } from 'raven-plugin-koa'
import { Repository, Sequelize } from 'sequelize-typescript'
import { injectable } from 'tsyringe'
import { uuid } from 'uuidv4'
import AccountModel from '../models/AccountModel'
import TransactionModel from '../models/TransactionModel'
import UserModel from '../models/UserModel'
import PPPPredictor from '../services/PPPPredictor'

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
  async getTransactions(ctx: any) {
    const userId = ctx.request.params.userId
    const transactions = await this.transactionRepository.findAll({ where: { user: userId } })
    return transactions
  }

  @Route.Get('/predictions/:userId')
  async getPredictions(ctx: any) {
    const userId = ctx.request.params.userId
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (!user) throw new Error('User not found')
    if (!user.targetCountry) throw new Error('No target country selected')

    const predictor = new PPPPredictor(user.sourceCountry, user.targetCountry)
    const transactions = await this.transactionRepository.findAll({ where: { user: userId } })
    const predictions = transactions.map((tr) => ({
      ...tr.toJSON(),
      amount: predictor.getPrice(tr.category, tr.amount),
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
          category: body.category,
          amount: -body.amount,
          timestamp: new Date(),
          id: uuid(),
        })
        await this.transactionRepository.create({
          user: user.id,
          account: mainAccount.id,
          category: 'saving',
          amount: -predicted + body.amount,
          timestamp: new Date(),
          id: uuid(),
        })

        saveAccount.balance += predicted - body.amount
        saveAccount.expense -= predicted - body.amount
        await saveAccount.save()
        await this.transactionRepository.create({
          user: user.id,
          account: mainAccount.id,
          category: 'saving',
          amount: predicted - body.amount,
          timestamp: new Date(),
          id: uuid(),
        })

        return this.userRepository.findOne({ include: [this.accountRepository], where: { id: body.userId } })
      }
    }

    mainAccount.balance -= body.amount
    mainAccount.expense += body.amount
    await mainAccount.save()
    await this.transactionRepository.create({
      user: user.id,
      account: mainAccount.id,
      category: body.category,
      amount: -body.amount,
      timestamp: new Date(),
      id: uuid(),
    })

    return this.userRepository.findOne({ include: [this.accountRepository], where: { id: body.userId } })
  }
}

interface CreateTransactionRequest {
  amount: number
  userId: string
  category: string
}
