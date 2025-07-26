import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store';
import { API_BASE_URL } from '@/constants/api';
import { ApiResponse } from '@/types/common';

// 基础查询配置 - 符合API约束规范
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  timeout: 10000, // 10秒超时
  prepareHeaders: (headers, { getState }) => {
    // 从 Redux state 中获取 token
    const token = (getState() as RootState).auth.token;
    
    // 设置通用 headers
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    
    // 如果有 token，添加到 Authorization header
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    // 添加请求时间戳
    headers.set('X-Timestamp', Date.now().toString());
    
    return headers;
  },
  // 响应处理 - 统一处理API响应格式
  responseHandler: async (response) => {
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      // 如果是统一响应格式，直接返回
      if (data && typeof data === 'object' && 'success' in data) {
        return data as ApiResponse;
      }
      
      // 否则包装成统一格式
      return {
        code: response.status,
        message: response.ok ? '请求成功' : '请求失败',
        data: data,
        success: response.ok,
      } as ApiResponse;
    }
    
    return response.text();
  },
});

// 带有错误处理和 token 刷新的查询 - 符合API约束的认证流程
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  
  // 如果返回 401，尝试刷新 token
  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    
    if (refreshToken) {
      // 尝试刷新 token
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      );
      
      if (refreshResult.data) {
        const responseData = refreshResult.data as ApiResponse<{
          token: string;
          refreshToken: string;
        }>;
        
        if (responseData.success && responseData.data) {
          // 更新 token
          const { token, refreshToken: newRefreshToken } = responseData.data;
          api.dispatch({
            type: 'auth/updateToken',
            payload: { token, refreshToken: newRefreshToken },
          });
          
          // 重新执行原始请求
          result = await baseQuery(args, api, extraOptions);
        } else {
          // 刷新失败，清除认证状态
          api.dispatch({ type: 'auth/logout' });
        }
      } else {
        // 刷新失败，清除认证状态
        api.dispatch({ type: 'auth/logout' });
      }
    } else {
      // 没有 refresh token，直接登出
      api.dispatch({ type: 'auth/logout' });
    }
  }
  
  return result;
};

// 创建基础 API - 符合API约束的缓存标签管理
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Worker', 'Order', 'Auth', 'Category', 'Message'],
  // 全局缓存配置
  keepUnusedDataFor: 60, // 60秒
  // 全局重新获取配置
  refetchOnMountOrArgChange: 30, // 30秒内不重新获取
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});

export default baseApi;
