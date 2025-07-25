import { baseApi } from './baseApi';
import { Order, OrderDetail, CreateOrderData } from '@/types';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 获取订单列表
    getOrders: builder.query<
      {
        orders: Order[];
        total: number;
        page: number;
        limit: number;
      },
      {
        page?: number;
        limit?: number;
        status?: string;
        category?: string;
        latitude?: number;
        longitude?: number;
        radius?: number;
      }
    >({
      query: (params) => ({
        url: '/orders',
        params,
      }),
      providesTags: ['Order'],
    }),

    // 获取订单详情
    getOrderDetail: builder.query<OrderDetail, string>({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: (result, error, orderId) => [{ type: 'Order', id: orderId }],
    }),

    // 创建订单
    createOrder: builder.mutation<Order, CreateOrderData>({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),

    // 更新订单
    updateOrder: builder.mutation<
      Order,
      { orderId: string; updates: Partial<Order> }
    >({
      query: ({ orderId, updates }) => ({
        url: `/orders/${orderId}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'Order', id: orderId },
        'Order',
      ],
    }),

    // 取消订单
    cancelOrder: builder.mutation<
      { success: boolean; message: string },
      { orderId: string; reason?: string }
    >({
      query: ({ orderId, reason }) => ({
        url: `/orders/${orderId}/cancel`,
        method: 'POST',
        body: { reason },
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'Order', id: orderId },
        'Order',
      ],
    }),

    // 申请订单（装修工）
    applyOrder: builder.mutation<
      { success: boolean; applicationId: string },
      {
        orderId: string;
        proposedPrice: number;
        estimatedDuration: number;
        message: string;
      }
    >({
      query: ({ orderId, ...data }) => ({
        url: `/orders/${orderId}/apply`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'Order', id: orderId },
        'Order',
      ],
    }),

    // 接受申请（用户）
    acceptApplication: builder.mutation<
      { success: boolean; message: string },
      { orderId: string; applicationId: string }
    >({
      query: ({ orderId, applicationId }) => ({
        url: `/orders/${orderId}/accept`,
        method: 'POST',
        body: { applicationId },
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'Order', id: orderId },
        'Order',
      ],
    }),

    // 完成订单
    completeOrder: builder.mutation<
      { success: boolean; message: string },
      { orderId: string; completionNotes?: string; images?: string[] }
    >({
      query: ({ orderId, ...data }) => ({
        url: `/orders/${orderId}/complete`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'Order', id: orderId },
        'Order',
      ],
    }),

    // 评价订单
    reviewOrder: builder.mutation<
      { success: boolean; reviewId: string },
      {
        orderId: string;
        rating: number;
        comment: string;
        targetType: 'user' | 'worker';
      }
    >({
      query: ({ orderId, ...data }) => ({
        url: `/orders/${orderId}/review`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'Order', id: orderId },
        'Order',
      ],
    }),

    // 上传订单图片
    uploadOrderImages: builder.mutation<
      { imageUrls: string[] },
      { orderId: string; formData: FormData }
    >({
      query: ({ orderId, formData }) => ({
        url: `/orders/${orderId}/images`,
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'Order', id: orderId },
      ],
    }),

    // 获取订单消息
    getOrderMessages: builder.query<
      {
        messages: any[];
        total: number;
        page: number;
        limit: number;
      },
      {
        orderId: string;
        page?: number;
        limit?: number;
      }
    >({
      query: ({ orderId, ...params }) => ({
        url: `/orders/${orderId}/messages`,
        params,
      }),
      providesTags: (result, error, { orderId }) => [
        { type: 'Order', id: `${orderId}-messages` },
      ],
    }),

    // 发送订单消息
    sendOrderMessage: builder.mutation<
      { success: boolean; messageId: string },
      {
        orderId: string;
        content: string;
        type: 'text' | 'image' | 'location';
        attachments?: string[];
      }
    >({
      query: ({ orderId, ...data }) => ({
        url: `/orders/${orderId}/messages`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'Order', id: `${orderId}-messages` },
      ],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderDetailQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useCancelOrderMutation,
  useApplyOrderMutation,
  useAcceptApplicationMutation,
  useCompleteOrderMutation,
  useReviewOrderMutation,
  useUploadOrderImagesMutation,
  useGetOrderMessagesQuery,
  useSendOrderMessageMutation,
} = orderApi;