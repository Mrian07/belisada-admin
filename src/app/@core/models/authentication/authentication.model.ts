export class Token {
  token: string;
  message: string;
  status: string;

  constructor() {}
}

export class Login {
  email: any;
  password: any;
  status: number;
  name: string;
  role: number;
  phone: any;
  token: string;
  message: string;
}

export class ForgotPassword {
  email: any;
  type: string;
  status: number;
  message: string;
}

export class ResetPassword {
  key: any;
  newPassword: any;
  status: number;
  message: string;
  }
