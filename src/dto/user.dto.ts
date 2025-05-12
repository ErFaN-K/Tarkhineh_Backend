export interface GetUserResponseDTO {
  firstName: string;
  lastName: string;
  email: string | null | undefined;
  phoneNumber: string;
  displayName: string | null | undefined;
  birthDate: Date | null | undefined;
  userProfile: string | null | undefined;
  userRole: string;
  isBanned: boolean;
}
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
  isBanned?: boolean;
}
