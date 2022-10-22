import { Route } from 'raven-plugin-koa'
import { Repository, Sequelize } from 'sequelize-typescript'
import { injectable } from 'tsyringe'
import TransactionModel from '../models/TransactionModel'

@injectable()
@Route.Prefix('/transaction')
export default class TransactionController {
  private readonly transactionRepository: Repository<TransactionModel>

  constructor(sequelize: Sequelize) {
    this.transactionRepository = sequelize.getRepository(TransactionModel)
  }

  @Route.Get('/transactions/:userId')
  async getTransactions(ctx: any) {
    const userId = ctx.request.params.userId
    const transactions = await this.transactionRepository.findAll({ where: { user: userId } })
    return transactions
  }
}
