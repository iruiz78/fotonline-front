export class AuthRequest {
  email: string;
  password: string;
  provider: number;
  fullName: string;
}

export class AuthResponse {
  token: string;
  tokenRefresh: string;
  expiredDate: Date;
  email: string;
}

export class SendCodeResetPassword {
  email: string;
}

export class ValidateCodeResetPassword {
  email: string;
  code: string;
}

export class ResetPassword {
  email: string;
  password: string;
}

export class RefreshTokenRequest {
  tokenExpired: string;
  tokenRefresh: string;
  email: string;
}

export class UserLogged {
  email: string;
  expiredDate: Date;
  token: string;
  tokenRefresh: string;
}
