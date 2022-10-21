import { Route } from 'raven-plugin-koa'
import { Repository, Sequelize } from 'sequelize-typescript'
import { injectable } from 'tsyringe'
import AccountModel from '../models/Account'
import TransactionModel from '../models/Transaction'
import UserModel from '../models/User'

@injectable()
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
  async create() {
    const user = await this.userRepository.create({})

    const mainAccount = await this.accountRepository.create({ user: user, balance: 0, type: 'main' })
    const savingsAccount = await this.accountRepository.create({ user: user, balance: 0, type: 'savings' })

    await this.transactionRepository.create({
      account: savingsAccount,
      user: user,
    })

    return user
  }
}
