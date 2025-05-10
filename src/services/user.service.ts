import User from '@/models/user.model';
import { CreateUserDTO, UpdateUserDTO } from '@/dto/UserDTO';
import { uploadProfile } from '@/config/profileUpload.config';

export const createUser = async (
  userData: CreateUserDTO
): Promise<User | string> => {
  try {
    const user: User = await User.create({
      phoneNumber: userData.phoneNumber,
      firstName: userData.firstName,
      lastName: userData.lastName,
    });
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) return error.message;
    return 'Unknown error occurred';
  }
};

export const deleteUser = async (
  phoneNumber: string
): Promise<boolean | string> => {
  try {
    const userExists = await User.findOne({ where: { phoneNumber } });
    if (!userExists) return 'User not found';

    const isDeleted = await User.destroy({ where: { phoneNumber } });
    if (isDeleted) return true;

    return false;
  } catch (error: unknown) {
    if (error instanceof Error) return error.message;
    return 'Unknown error occurred';
  }
};
