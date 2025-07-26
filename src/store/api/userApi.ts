import { baseApi } from './baseApi';
import { UserProfile, UpdateUserProfileData } from '@/types';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 获取用户资料
    getUserProfile: builder.query<UserProfile, void>({
      query: () => '/user/profile',
      providesTags: ['User'],
    }),

    // 更新用户资料
    updateUserProfile: builder.mutation<
      UserProfile,
      UpdateUserProfileData
    >({
      query: (data) => ({
        url: '/user/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // 上传头像
    uploadAvatar: builder.mutation<
      { avatarUrl: string },
      FormData
    >({
      query: (formData) => ({
        url: '/user/avatar',
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['User'],
    }),

    // 获取用户订单
    getUserOrders: builder.query<
      {
        orders: any[];
        total: number;
        page: number;
        limit: number;
      },
      {
        page?: number;
        limit?: number;
        status?: string;
      }
    >({
      query: (params) => ({
        url: '/user/orders',
        params,
      }),
      providesTags: ['Order'],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUploadAvatarMutation,
  useGetUserOrdersQuery,
} = userApi;
