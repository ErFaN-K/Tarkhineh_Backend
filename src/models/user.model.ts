import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export default class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phoneNumber!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  displayName?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  birthDate?: Date;

  @BeforeCreate
  @BeforeUpdate
  static setDisplayName(user: User) {
    if (!user.displayName) {
      user.displayName = `${user.firstName} ${user.lastName}`;
    }
  }
}
