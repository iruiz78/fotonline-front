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
