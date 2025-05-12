import { Router } from 'express';
import {
  createUserHandler,
  deleteUserHandler,
  getUsersHandler,
  getUserHandler,
  updateUserHandler,
} from '@/controllers/user.controller';

import { createUserSchema, updateUserSchema } from '@/schemas/user.schema';
import { createUserValidate } from '@/middlewares/validations/createUserValidation.middleware';
import { updateUserValidate } from '@/middlewares/validations/updateUserValidation.middleware';

import profileUpload from '@/config/profileUpload.config';

// Config Router For User
const router = Router();

// Create User Route
router.post('/', createUserValidate(createUserSchema), createUserHandler);

// Update User
router.patch(
  '/:phoneNumber',
  profileUpload,
  updateUserValidate(updateUserSchema),
  updateUserHandler
);

// Delete User Route
router.delete('/:phoneNumber', deleteUserHandler);

// Get Users
router.get('/', getUsersHandler);

// Get User
router.get('/:phoneNumber', getUserHandler);

export default router;
