import { Request, Response } from 'express';
import { CreateUserDTO } from '@/dto/UserDTO';
import { createUser, deleteUser } from '@/services/user.service';

// Create User Function
export const createUserHandler = async (
  req: Request<{}, {}, CreateUserDTO>,
  res: Response
): Promise<void> => {
  try {
    const userData = req.body;
    const result = await createUser(userData);

    if (typeof result === 'string') {
      res.status(400).send({
        success: false,
        error: result,
      });
      return;
    }

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('Unknown error occurred');
    }
  }
};

// Delete User Function
export const deleteUserHandler = async (
  req: Request<{}, {}, {}, { phoneNumber: string }>,
  res: Response
): Promise<void> => {
  try {
    const userPhoneNumber = req.query.phoneNumber;
    const result = await deleteUser(userPhoneNumber);

    if (typeof result === 'string') {
      res.status(400).json({
        success: false,
        error: result,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User Deleted Successfully',
    });
  } catch (error) {}
};
