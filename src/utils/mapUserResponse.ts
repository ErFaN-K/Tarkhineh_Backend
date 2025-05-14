import User from '@/models/user.model'
import { GetUserResponseDTO } from '@/dto/user.dto'

export const mapUser = (user: User): GetUserResponseDTO => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    displayName: user.displayName,
    birthDate: user.birthDate,
    userProfile: user.userProfile,
    userRole: user.userRole,
    isBanned: user.isBanned,
  }
}

export const mapUsers = (users: User[]): GetUserResponseDTO[] => {
  return users.map((user) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    displayName: user.displayName,
    birthDate: user.birthDate,
    userProfile: user.userProfile,
    userRole: user.userRole,
    isBanned: user.isBanned,
  }))
}
