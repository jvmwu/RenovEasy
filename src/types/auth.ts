// 认证相关类型定义 - 符合API约束规范

/**
 * 登录请求参数
 */
export interface LoginRequest {
  phone: string;
  password: string;
  userType?: 'user' | 'worker';
}

/**
 * 登录响应数据
 */
export interface LoginResponse {
  user: AuthUser;
  token: string;
  refreshToken: string;
}

/**
 * 注册请求参数
 */
export interface RegisterRequest {
  phone: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
  userType: 'user' | 'worker';
  name?: string;
  avatar?: string;
}

/**
 * 注册响应数据
 */
export interface RegisterResponse {
  user: AuthUser;
  token: string;
  refreshToken: string;
}

/**
 * 验证码请求参数
 */
export interface VerificationCodeRequest {
  phone: string;
  type: 'login' | 'register' | 'reset';
}

/**
 * 验证码响应数据
 */
export interface VerificationCodeResponse {
  success: boolean;
  message: string;
  expireTime?: number; // 过期时间戳
}

/**
 * 刷新Token请求参数
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * 刷新Token响应数据
 */
export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

/**
 * 认证用户基础信息
 */
export interface AuthUser {
  id: string;
  phone: string;
  name?: string;
  avatar?: string;
  userType: 'user' | 'worker';
  status: 'active' | 'inactive' | 'banned';
  createdAt: string;
  updatedAt: string;
}

/**
 * 认证状态
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}
