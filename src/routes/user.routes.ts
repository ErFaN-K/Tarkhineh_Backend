import { Router } from 'express';
import { createUserHandler } from '@/controllers/user.controller';

// Config Router For User
const router = Router();

// Create User Route
router.post('/', createUserHandler);

export default router;
