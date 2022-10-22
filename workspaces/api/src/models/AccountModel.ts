import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import UserModel from './UserModel'

@Table({
  createdAt: false,
  updatedAt: false,
})
export default class AccountModel extends Model {
  @Column({
    autoIncrement: false,
    primaryKey: true,
  })
  declare id: string

  @Column
  declare name: string

  @Column
  declare type: string

  @Column
  declare balance: number

  @ForeignKey(() => UserModel)
  declare user: UserModel
}
