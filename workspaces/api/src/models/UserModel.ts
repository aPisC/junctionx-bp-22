import { Column, HasMany, Model, Table } from 'sequelize-typescript'
import AccountModel from './AccountModel'

@Table({
  createdAt: false,
  updatedAt: false,
})
export default class UserModel extends Model {
  @Column({
    autoIncrement: false,
    primaryKey: true,
  })
  declare id: string

  @Column
  declare name: string

  @HasMany(() => AccountModel)
  declare accounts: AccountModel[]
}
