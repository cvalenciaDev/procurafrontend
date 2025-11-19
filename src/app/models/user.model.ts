interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone?: string;
  primaryType: 'COMPANY' | 'PROVIDER';
  isVerified: boolean;
  isActive: boolean;
  hasCompanyProfile: boolean;
  hasProviderProfile: boolean;
  companyId?: number;
  providerId?: number;
  createdAt: string;
}

 interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

 interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

export type { User, ApiResponse, AuthResponse };