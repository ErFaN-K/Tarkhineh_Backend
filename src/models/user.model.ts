import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
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
    allowNull: true,
    unique: true,
  })
  email?: string | null;

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
  displayName?: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  birthDate?: Date | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  userProfile?: string | null;

  @Column({
    type: DataType.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user',
  })
  userRole!: 'admin' | 'user';

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isBanned!: boolean;

  @BeforeCreate
  static setDisplayName(user: User) {
    if (user.firstName && user.lastName) {
      user.displayName = `${user.firstName} ${user.lastName}`;
    } else {
      user.displayName = null;
    }
  }
}
