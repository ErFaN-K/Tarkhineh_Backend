import User from '@/models/user.model';
import ResponseHandler from '@/types/ResponseHandler';
import { CreateUserDTO, UpdateUserDTO } from '@/dto/UserDTO';
import handleError from '@/utils/serviceHandleError';

export const createUser = async (
  userData: CreateUserDTO
): Promise<ResponseHandler> => {
  try {
    const userExists = await User.findOne({ where: { phoneNumber: userData.phoneNumber } }) 
    if(userExists) return {
      success: true,
      statusCode: 400,
      message: `User With phone number: ${userData.phoneNumber} is exists.`,
    }
    const user = await User.create({
      phoneNumber: userData.phoneNumber,
      firstName: userData.firstName,
      lastName: userData.lastName,
    });

    return {
      success: true,
      statusCode: 201,
      data: user,
      message: 'User created successfully.',
    };
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const deleteUser = async (
  phoneNumber: string
): Promise<ResponseHandler> => {
  try {
    const userExists = await User.findOne({ where: { phoneNumber } });

    if (!userExists) {
      return {
        success: false,
        statusCode: 404,
        message: `User with phone number ${phoneNumber} not found.`,
      };
    }

    const isDeleted = await User.destroy({ where: { phoneNumber } });

    if (isDeleted > 0) {
      return {
        success: true,
        statusCode: 200,
        message: `User with phone number ${phoneNumber} deleted successfully.`,
      };
    }

    return {
      success: false,
      statusCode: 404,
      message: `No user was deleted with phone number ${phoneNumber}.`,
    };
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const getUsers = async (): Promise<ResponseHandler> => {
  try {
    const users = await User.findAll();

    return {
      success: true,
      statusCode: 200,
      message: 'Users fetched successfully.',
      data: users,
    };
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const getUser = async (
  phoneNumber: string
): Promise<ResponseHandler> => {
  try {
    const user = await User.findOne({ where: { phoneNumber } });

    if (user) {
      return {
        success: true,
        statusCode: 200,
        message: 'User fetched successfully.',
        data: user,
      };
    }

    return {
      success: false,
      statusCode: 404,
      message: `User with phone number ${phoneNumber} not found.`,
    };
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const updateUser = async (
  phoneNumber: string,
  userData: UpdateUserDTO
): Promise<ResponseHandler> => {
  try {
    const user = await User.findOne({ where: { phoneNumber } });

    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: `User with phone number ${phoneNumber} not found.`,
      };
    }

    const updatedUser = await user.update(userData);

    return {
      success: true,
      statusCode: 200,
      message: 'User updated successfully.',
      data: updatedUser,
    };
  } catch (error: unknown) {
    return handleError(error);
  }
};
