export class AuthRequest {
  mail: string;
  password: string;
  provider: number;
  fullName: string;
}

export class AuthResponse {
  token: string;
  tokenRefresh: string;
  expiredDate: Date;
  mail: string;
}

export class SendCodeResetPassword {
  mail: string;
}

export class ValidateCodeResetPassword {
  mail: string;
  code: string;
}

export class ResetPassword {
  userId: number;
  password: string;
}
