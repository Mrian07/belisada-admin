export class Profile {
  name: string;  
  email: any;
  phone: number;
  isActive: boolean;
  isTokenActivationUsed: boolean;
  tokenResetPassword:  any;
  isTokenResetPasswordUsed: boolean;
  isSubscribe: boolean;
  role: number;
  isCustomer: boolean;
  isSeller: boolean;
  isCorporate: boolean;
  isAdminStore: boolean;
  isOwnerStore: boolean;
  dateOfBirth: any;
  gender: string;
  mStoreId: number;
  isEmployee: boolean;
  imageAvatar: any;
  constructor() {}
}

export class ChangePassword {
  newPassword: string;  
  oldPassword: string;
  email: string;
  message: string;
  name: string;
  phone: number;
  role: number;
  status: number;
  token: string;
  type: string;
  constructor() {}
}

export class ChangePasswordRequest {
  newPassword: string;  
  oldPassword: string;
  message: string;
  status: number;
  constructor() {}
}

export class Avatar {
  imageAvatar: string;  
  status: number;
  constructor() {}
}