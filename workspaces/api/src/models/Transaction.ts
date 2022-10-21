import { Column, ForeignKey, Model } from 'sequelize-typescript'
import AccountModel from './Account'

export default class TransactionModel extends Model {
  @Column
  declare amount: number

  @Column
  declare category: string

  @ForeignKey(() => AccountModel)
  declare account: AccountModel
}
