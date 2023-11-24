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
  mail: string;
  password: string;
}

export class RefreshTokenRequest {
  tokenExpired: string;
  tokenRefresh: string;
  userId: number;
}
