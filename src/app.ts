import express from 'express';
import { checkDbConnection } from './utils/checkDbConnection';
import userRoute from '@/routes/user.routes';

const app = express();

app.use(express.json());

const initializeApp = async (): Promise<void> => {
  try {
    await checkDbConnection();
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
};

initializeApp();

// Config Router

// User Routes
app.use('/api/user', userRoute);

export default app;
