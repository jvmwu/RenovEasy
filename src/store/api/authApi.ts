import { baseApi } from './baseApi';
import { LoginCredentials, RegisterData, VerificationCodeRequest } from '@/types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 发送验证码
    sendVerificationCode: builder.mutation<
      { success: boolean; message: string },
      VerificationCodeRequest
    >({
      query: (data) => ({
        url: '/auth/send-code',
        method: 'POST',
        body: data,
      }),
    }),

    // 验证验证码
    verifyCode: builder.mutation<
      { valid: boolean; message: string },
      { phone: string; code: string; type: string }
    >({
      query: (data) => ({
        url: '/auth/verify-code',
        method: 'POST',
        body: data,
      }),
    }),

    // 用户登录
    login: builder.mutation<
      {
        token: string;
        refreshToken: string;
        user: {
          id: string;
          phone: string;
          userType: 'user' | 'worker';
        };
      },
      LoginCredentials
    >({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    // 用户注册
    register: builder.mutation<
      {
        token: string;
        refreshToken: string;
        user: {
          id: string;
          phone: string;
          userType: 'user' | 'worker';
        };
      },
      RegisterData
    >({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),

    // 刷新 token
    refreshToken: builder.mutation<
      { token: string; refreshToken: string },
      { refreshToken: string }
    >({
      query: (data) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: data,
      }),
    }),

    // 登出
    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'User', 'Worker', 'Order'],
    }),
  }),
});

export const {
  useSendVerificationCodeMutation,
  useVerifyCodeMutation,
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi;