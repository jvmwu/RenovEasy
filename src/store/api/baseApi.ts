import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store';
import { API_BASE_URL } from '@/constants';

// 基础查询配置
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // 从 Redux state 中获取 token
    const token = (getState() as RootState).auth.token;
    
    // 设置通用 headers
    headers.set('Content-Type', 'application/json');
    
    // 如果有 token，添加到 Authorization header
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  },
});

// 带有错误处理和 token 刷新的查询
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
        // 更新 token
        const { token, refreshToken: newRefreshToken } = refreshResult.data as any;
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
      // 没有 refresh token，直接登出
      api.dispatch({ type: 'auth/logout' });
    }
  }
  
  return result;
};

// 创建基础 API
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Worker', 'Order', 'Auth'],
  endpoints: () => ({}),
});

export default baseApi;