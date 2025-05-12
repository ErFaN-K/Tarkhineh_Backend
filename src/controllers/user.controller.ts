import { Request, Response } from 'express';
import { CreateUserDTO, UpdateUserDTO } from '@/dto/user.dto';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '@/services/user.service';
import handleError from '@/utils/controllerHandleError';

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserDTO>,
  res: Response
): Promise<void> => {
  try {
    const result = await createUser(req.body);
    res.status(result.statusCode).json(result);
  } catch (error: unknown) {
    handleError(res, error);
  }
};

export const deleteUserHandler = async (
  req: Request<{ phoneNumber: string }>,
  res: Response
): Promise<void> => {
  try {
    const result = await deleteUser(req.params.phoneNumber);
    res.status(result.statusCode).json(result);
  } catch (error: unknown) {
    handleError(res, error);
  }
};

export const getUsersHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getUsers();
    res.status(result.statusCode).json(result);
  } catch (error: unknown) {
    handleError(res, error);
  }
};

export const getUserHandler = async (
  req: Request<{ phoneNumber: string }>,
  res: Response
): Promise<void> => {
  try {
    const result = await getUser(req.params.phoneNumber);
    res.status(result.statusCode).json(result);
  } catch (error: unknown) {
    handleError(res, error);
  }
};

export const updateUserHandler = async (
  req: Request<{ phoneNumber: string }, {}, UpdateUserDTO>,
  res: Response
): Promise<void> => {
  try {
    if (req.file) {
      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/profiles/${req.file.filename}`;
      req.body.userProfile = fileUrl;
    }

    const result = await updateUser(req.params.phoneNumber, req.body);
    res.status(result.statusCode).json(result);
  } catch (error: unknown) {
    handleError(res, error);
  }
};
