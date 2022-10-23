import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import AccountModel from './AccountModel'
import UserModel from './UserModel'

@Table({
  createdAt: false,
  updatedAt: false,
})
export default class TransactionModel extends Model {
  @Column({
    autoIncrement: false,
    primaryKey: true,
  })
  declare id: string

  @Column
  declare amount: number

  @Column
  declare baseAmount: number

  @Column
  declare basePredicted: number

  @Column
  declare category: string

  @Column
  declare name: string

  @Column
  declare timestamp: Date

  @ForeignKey(() => UserModel)
  @Column
  declare user: string

  @ForeignKey(() => AccountModel)
  @Column
  declare account: string
}
