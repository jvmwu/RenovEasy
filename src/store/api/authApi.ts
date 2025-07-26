import { baseApi } from './baseApi';
import { 
  AuthUser,
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse,
  VerificationCodeRequest,
  VerificationCodeResponse,
  RefreshTokenRequest,
  RefreshTokenResponse 
} from '@/types/auth';

// 认证相关 API - 符合API约束规范
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 发送验证码
    sendVerificationCode: builder.mutation<
      VerificationCodeResponse,
      VerificationCodeRequest
    >({
      query: (data) => ({
        url: '/auth/send-code',
        method: 'POST',
        body: data,
      }),
      // 乐观更新：立即显示发送状态
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          // 错误处理已在baseQuery中统一处理
        }
      },
    }),

    // 验证验证码
    verifyCode: builder.mutation<
      { valid: boolean; message: string },
      { phone: string; code: string; type: 'login' | 'register' | 'reset' }
    >({
      query: (data) => ({
        url: '/auth/verify-code',
        method: 'POST',
        body: data,
      }),
    }),

    // 用户登录
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
      // 登录成功后更新用户信息缓存
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // 可以在这里预加载用户信息
          if (data.user) {
            dispatch(
              authApi.util.upsertQueryData('getCurrentUser', undefined, data.user)
            );
          }
        } catch (error) {
          // 错误处理
        }
      },
    }),

    // 用户注册
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),

    // 刷新 token
    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
      query: (data) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: data,
      }),
    }),

    // 获取当前用户信息
    getCurrentUser: builder.query<AuthUser, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      providesTags: ['Auth', 'User'],
      // 缓存5分钟
      keepUnusedDataFor: 300,
    }),

    // 登出
    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'User', 'Worker', 'Order', 'Message'],
      // 登出时清除所有缓存
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          // 清除所有API缓存
          dispatch(baseApi.util.resetApiState());
        } catch (error) {
          // 即使登出失败也清除本地缓存
          dispatch(baseApi.util.resetApiState());
        }
      },
    }),

    // 修改密码
    changePassword: builder.mutation<
      { success: boolean; message: string },
      { oldPassword: string; newPassword: string }
    >({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
    }),

    // 重置密码
    resetPassword: builder.mutation<
      { success: boolean; message: string },
      { phone: string; code: string; newPassword: string }
    >({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

// 导出 hooks - 符合API约束的命名规范
export const {
  useSendVerificationCodeMutation,
  useVerifyCodeMutation,
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
} = authApi;
