import { Column, Model, Table } from 'sequelize-typescript'

@Table
export default class UserModel extends Model {
  @Column
  declare id: string

  @Column
  declare name: string
}
