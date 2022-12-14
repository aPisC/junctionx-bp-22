import { Route } from 'raven-plugin-koa'
import { Repository, Sequelize } from 'sequelize-typescript'
import { injectable } from 'tsyringe'
import { uuid as uuidv4 } from 'uuidv4'
import { initialTransactions } from '../config/initialTransactions'
import AccountModel from '../models/AccountModel'
import TransactionModel from '../models/TransactionModel'
import UserModel from '../models/UserModel'
import { countries } from './CountriesController'

@injectable()
@Route.Prefix('/user')
export default class UserController {
  private readonly userRepository: Repository<UserModel>
  private readonly accountRepository: Repository<AccountModel>
  private readonly transactionRepository: Repository<TransactionModel>

  constructor(sequelize: Sequelize) {
    this.userRepository = sequelize.getRepository(UserModel)
    this.accountRepository = sequelize.getRepository(AccountModel)
    this.transactionRepository = sequelize.getRepository(TransactionModel)
  }

  @Route.Post('/create')
  async create(ctx: any) {
    const body: IUserCreateRequest = ctx.request.body

    const currency = countries[body.country]?.currency
    const exchange = countries[body.country]?.exchange
    if (!currency) throw new Error('Unable to resolve country')

    const user = await this.userRepository.create({
      ...body,
      id: uuidv4(),
      name: 'John Doe',
      sourceCountry: body.country,
    })

    const mainAccount = await this.accountRepository.create({
      id: uuidv4(),
      name: 'Base',
      currency: currency,
      expense: -initialTransactions.reduce((sum, tr) => sum + tr.amount, 0) * exchange,
      user: user.id,
      balance: 1000 * exchange,
      type: 'main',
    })
    await this.accountRepository.create({
      id: uuidv4(),
      name: 'Jar',
      currency: currency,
      user: user.id,
      expense: 0,
      balance: 120 * exchange,
      type: 'save',
    })

    for (const tr of initialTransactions) {
      await this.transactionRepository.create({
        ...tr,
        amount: tr.amount * exchange,
        id: uuidv4(),
        account: mainAccount.id,
        user: user.id,
      })
    }

    return this.userRepository.findOne({ include: [this.accountRepository], where: { id: user.id } })
  }

  @Route.Get('/:id')
  async getUser(ctx: any) {
    const userId = ctx.request.params.id
    const user = await this.userRepository.findOne({ include: [this.accountRepository], where: { id: userId } })
    return user
  }

  @Route.Post('/setTarget/:country/:userId')
  async setTarget(ctx: any) {
    const { userId, country } = ctx.request.params

    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) throw new Error('User not found')
    if (!countries[country] && country != 'null') throw new Error('Country not found')

    user.targetCountry = country == 'null' ? null : country
    await user.save()

    return user
  }
}

interface IUserCreateRequest {
  country: string
}
