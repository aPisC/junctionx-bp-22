import { Route } from 'raven-plugin-koa'
import { Repository, Sequelize } from 'sequelize-typescript'
import { injectable } from 'tsyringe'
import { uuid as uuidv4 } from 'uuidv4'
import { initialTransactions } from '../config/initialTransactions'
import AccountModel from '../models/AccountModel'
import TransactionModel from '../models/TransactionModel'
import UserModel from '../models/UserModel'

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
  async create() {
    const user = await this.userRepository.create({ id: uuidv4(), name: 'John Doe' })

    const mainAccount = await this.accountRepository.create({
      id: uuidv4(),
      user: user.id,
      balance: 0,
      type: 'main',
    })
    await this.accountRepository.create({
      id: uuidv4(),
      user: user.id,
      balance: 0,
      type: 'savings',
    })

    for (const tr of initialTransactions) {
      const tri = await this.transactionRepository.create({
        ...tr,
        id: uuidv4(),
        account: mainAccount.id,
        user: user.id,
      })

      console.log(tri.toJSON())
    }

    return user
  }

  @Route.Get('/:id')
  async getUser(ctx: any) {
    const userId = ctx.request.params.id
    const user = await this.userRepository.findOne({ where: { id: userId } })
    return user
  }
}
