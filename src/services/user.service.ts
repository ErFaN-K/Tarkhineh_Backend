import User from '@/models/user.model';
import ResponseHandler from '@/types/ResponseHandler';
import { CreateUserDTO, UpdateUserDTO } from '@/dto/user.dto';
import handleError from '@/utils/serviceHandleError';
import { mapUser, mapUsers } from '@/utils/mapUserResponse';

export const createUser = async (
  userData: CreateUserDTO
): Promise<ResponseHandler> => {
  try {
    const userExists = await User.findOne({
      where: { phoneNumber: userData.phoneNumber },
    });
    if (userExists) {
      if (userExists.isBanned) {
        return {
          success: false,
          statusCode: 400,
          message: `User with phone number: ${userData.phoneNumber} already banned.`,
        };
      }
      return {
        success: false,
        statusCode: 400,
        message: `User with phone number: ${userData.phoneNumber} already exists.`,
      };
    }
    const user = await User.create({
      phoneNumber: userData.phoneNumber,
      firstName: userData.firstName,
      lastName: userData.lastName,
    });

    const userDataResponse = mapUser(user);

    return {
      success: true,
      statusCode: 201,
      data: userDataResponse,
      message: 'User created successfully.',
    };
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const banUser = async (
  phoneNumber: string
): Promise<ResponseHandler> => {
  try {
    const userExists = await User.findOne({ where: { phoneNumber } });

    if (!userExists)
      return {
        success: false,
        statusCode: 404,
        message: `User with phone number ${phoneNumber} not found.`,
      };

    if (userExists.isBanned)
      return {
        success: false,
        statusCode: 400,
        message: `User with phone number: ${userExists.phoneNumber} already banned.`,
      };

    await userExists.update({
      isBanned: true,
    });
    return {
      success: true,
      statusCode: 200,
      message: `User with phone number ${phoneNumber} banned successfully.`,
    };
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const getUsers = async (): Promise<ResponseHandler> => {
  try {
    const users = await User.findAll();

    const usersDataResponse = mapUsers(users);

    return {
      success: true,
      statusCode: 200,
      message: 'Users fetched successfully.',
      data: usersDataResponse,
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
      const userDataResponse = mapUser(user);
      return {
        success: true,
        statusCode: 200,
        message: 'User fetched successfully.',
        data: userDataResponse,
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
    const userDataResponse = mapUser(updatedUser);

    return {
      success: true,
      statusCode: 200,
      message: 'User updated successfully.',
      data: userDataResponse,
    };
  } catch (error: unknown) {
    return handleError(error);
  }
};
