import { Router } from 'express';
import { createUserHandler, deleteUserHandler } from '@/controllers/user.controller';

// Config Router For User
const router = Router();

// Create User Route
router.post('/', createUserHandler);
router.delete('/', deleteUserHandler)

export default router;
