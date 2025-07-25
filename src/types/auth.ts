// 认证相关类型定义

export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface RegisterData {
  phone: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
  userType: 'user' | 'worker';
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  userType: 'user' | 'worker' | null;
  userId: string | null;
}

export interface VerificationCodeRequest {
  phone: string;
  type: 'register' | 'login' | 'reset_password';
}