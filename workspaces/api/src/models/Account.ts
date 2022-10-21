import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import UserModel from './User'

@Table
export default class AccountModel extends Model {
  @Column
  declare name: string

  @Column
  declare type: string

  @Column
  declare balance: number

  @ForeignKey(() => UserModel)
  declare user: UserModel
}
