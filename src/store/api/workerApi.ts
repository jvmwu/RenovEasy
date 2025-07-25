import { baseApi } from './baseApi';
import { WorkerProfile, UpdateWorkerProfileData } from '@/types';

export const workerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 获取装修工资料
    getWorkerProfile: builder.query<WorkerProfile, void>({
      query: () => '/worker/profile',
      providesTags: ['Worker'],
    }),

    // 更新装修工资料
    updateWorkerProfile: builder.mutation<
      WorkerProfile,
      UpdateWorkerProfileData
    >({
      query: (data) => ({
        url: '/worker/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Worker'],
    }),

    // 获取附近装修工列表
    getNearbyWorkers: builder.query<
      {
        workers: WorkerProfile[];
        total: number;
        page: number;
        limit: number;
      },
      {
        latitude: number;
        longitude: number;
        radius?: number;
        skills?: string[];
        minRating?: number;
        page?: number;
        limit?: number;
      }
    >({
      query: (params) => ({
        url: '/workers/nearby',
        params,
      }),
      providesTags: ['Worker'],
    }),

    // 获取装修工详情
    getWorkerDetail: builder.query<WorkerProfile, string>({
      query: (workerId) => `/workers/${workerId}`,
      providesTags: (result, error, workerId) => [{ type: 'Worker', id: workerId }],
    }),

    // 获取装修工订单
    getWorkerOrders: builder.query<
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
        url: '/worker/orders',
        params,
      }),
      providesTags: ['Order'],
    }),

    // 获取装修工申请列表
    getWorkerApplications: builder.query<
      {
        applications: any[];
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
        url: '/worker/applications',
        params,
      }),
      providesTags: ['Order'],
    }),

    // 上传装修工头像
    uploadWorkerAvatar: builder.mutation<
      { avatarUrl: string },
      FormData
    >({
      query: (formData) => ({
        url: '/worker/avatar',
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['Worker'],
    }),

    // 上传资质证书
    uploadCertification: builder.mutation<
      { certificationUrl: string },
      FormData
    >({
      query: (formData) => ({
        url: '/worker/certifications',
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['Worker'],
    }),
  }),
});

export const {
  useGetWorkerProfileQuery,
  useUpdateWorkerProfileMutation,
  useGetNearbyWorkersQuery,
  useGetWorkerDetailQuery,
  useGetWorkerOrdersQuery,
  useGetWorkerApplicationsQuery,
  useUploadWorkerAvatarMutation,
  useUploadCertificationMutation,
} = workerApi;