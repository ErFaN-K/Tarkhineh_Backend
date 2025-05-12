import path from 'path';
import express from 'express';
import { checkDbConnection } from './utils/checkDbConnection';
import userRoute from '@/routes/user.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

const initializeApp = async (): Promise<void> => {
  try {
    await checkDbConnection();
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error('Database connection failed', error);
    console.error('Unknown error occurred');
    process.exit(1);
  }
};

initializeApp();

// Config Router
// User Routes
app.use('/api/user', userRoute);

export default app;
