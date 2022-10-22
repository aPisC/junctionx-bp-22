import { Column, Model, Table } from 'sequelize-typescript'

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
}
