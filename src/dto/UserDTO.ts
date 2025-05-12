export interface CreateUserDTO {
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  displayName?: string;
  birthDate?: Date;
  userProfile?: string;
  userRole?: string;
}
