import { Sequelize } from 'sequelize-typescript';
import User from '@/models/user.model';

const db = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    dialect: 'mysql',
    logging: false,
    models: [User],
  }
);

export default db;
