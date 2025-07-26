import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_BASE_URL, HTTP_STATUS } from '@/constants/api';
import { storageService } from '@/services/storage';
import { ApiResponse } from '@/types/common';

/**
 * HTTP 客户端配置 - 基于API约束优化
 */
class HttpClient {
  private instance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
  }> = [];

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000, // 10秒超时
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * 设置请求和响应拦截器 - 符合API约束规范
   */
  private setupInterceptors(): void {
    // 请求拦截器 - 自动添加认证头
    this.instance.interceptors.request.use(
      async (config) => {
        // 添加认证 token
        const token = await storageService.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // 添加请求 ID 用于调试和追踪
        config.headers['X-Request-ID'] = this.generateRequestId();

        // 添加时间戳
        config.headers['X-Timestamp'] = Date.now().toString();

        // 开发环境下打印请求日志
        if (__DEV__) {
          console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
            headers: config.headers,
            data: config.data,
            params: config.params,
          });
        }

        return config;
      },
      (error) => {
        if (__DEV__) {
          console.error('❌ Request Error:', error);
        }
        return Promise.reject(error);
      }
    );

    // 响应拦截器 - 统一处理响应和错误
    this.instance.interceptors.response.use(
      (response) => {
        // 开发环境下打印响应日志
        if (__DEV__) {
          console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
            status: response.status,
            data: response.data,
            requestId: response.config.headers?.['X-Request-ID'],
          });
        }
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // 开发环境下打印错误日志
        if (__DEV__) {
          console.error(`❌ API Error: ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`, {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
            requestId: originalRequest?.headers?.['X-Request-ID'],
          });
        }

        // 处理 401 错误（token 过期）- 自动刷新机制
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
          if (this.isRefreshing) {
            // 如果正在刷新 token，将请求加入队列
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then(() => {
              return this.instance(originalRequest);
            }).catch(err => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshToken = await storageService.getRefreshToken();
            if (refreshToken) {
              const response = await this.refreshToken(refreshToken);
              const responseData = response.data as ApiResponse<{
                token: string;
                refreshToken: string;
              }>;

              if (responseData.success && responseData.data) {
                const { token, refreshToken: newRefreshToken } = responseData.data;

                // 保存新的 token
                await storageService.setAuthToken(token);
                if (newRefreshToken) {
                  await storageService.setRefreshToken(newRefreshToken);
                }

                // 处理队列中的请求
                this.processQueue(null);

                // 重新发送原始请求
                return this.instance(originalRequest);
              } else {
                throw new Error(responseData.message || 'Token刷新失败');
              }
            }
          } catch (refreshError) {
            // 刷新失败，清除认证信息
            this.processQueue(refreshError);
            await this.clearAuthData();
            this.onAuthError();
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * 处理队列中的请求
   */
  private processQueue(error: any): void {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

    this.failedQueue = [];
  }

  /**
   * 刷新 token - 使用统一响应格式
   */
  private async refreshToken(refreshToken: string): Promise<AxiosResponse<ApiResponse<{
    token: string;
    refreshToken: string;
  }>>> {
    return axios.post(`${API_BASE_URL}/auth/refresh`, {
      refreshToken,
    });
  }

  /**
   * 清除认证数据
   */
  private async clearAuthData(): Promise<void> {
    await storageService.clearAuthData();
  }

  /**
   * 认证错误处理 - 触发登出流程
   */
  private onAuthError(): void {
    // 可以在这里发送事件通知应用登出
    // EventEmitter.emit('AUTH_ERROR');
    if (__DEV__) {
      console.log('🔐 认证失败，用户需要重新登录');
    }
    
    // 这里可以添加全局事件通知或导航到登录页面
    // 例如：NavigationService.navigate('Login');
  }

  /**
   * 生成请求 ID
   */
  private generateRequestId(): string {
    return Math.random().toString(36).substring(2, 11);
  }

  /**
   * 错误处理 - 统一处理 API 响应格式，符合API约束规范
   */
  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      // 服务器响应错误
      const { status, data } = error.response;
      const responseData = data as ApiResponse<any>;
      
      return new ApiError(
        responseData?.message || this.getDefaultErrorMessage(status),
        status,
        responseData?.data || data,
        'RESPONSE_ERROR'
      );
    } else if (error.request) {
      // 网络错误
      return new ApiError(
        '网络连接失败，请检查网络设置',
        0,
        null,
        'NETWORK_ERROR'
      );
    } else {
      // 其他错误
      return new ApiError(
        error.message || '未知错误',
        0,
        null,
        'UNKNOWN_ERROR'
      );
    }
  }

  /**
   * 根据状态码获取默认错误消息
   */
  private getDefaultErrorMessage(status: number): string {
    switch (status) {
      case 400: return '请求参数错误';
      case 401: return '认证失败，请重新登录';
      case 403: return '权限不足';
      case 404: return '请求的资源不存在';
      case 409: return '数据冲突，请刷新后重试';
      case 422: return '数据验证失败';
      case 429: return '请求过于频繁，请稍后再试';
      case 500: return '服务器内部错误';
      case 502: return '网关错误';
      case 503: return '服务不可用';
      case 504: return '网关超时';
      default: return `请求失败 (${status})`;
    }
  }

  /**
   * GET 请求 - 统一处理响应格式
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return this.extractData(response.data);
  }

  /**
   * POST 请求 - 统一处理响应格式
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config);
    return this.extractData(response.data);
  }

  /**
   * PUT 请求 - 统一处理响应格式
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    return this.extractData(response.data);
  }

  /**
   * DELETE 请求 - 统一处理响应格式
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    return this.extractData(response.data);
  }

  /**
   * PATCH 请求 - 统一处理响应格式
   */
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.patch<ApiResponse<T>>(url, data, config);
    return this.extractData(response.data);
  }

  /**
   * 从统一响应格式中提取数据 - 符合API约束的响应格式处理
   */
  private extractData<T>(response: ApiResponse<T>): T {
    if (!response.success) {
      throw new ApiError(
        response.message || '请求失败',
        response.code,
        response.data,
        'RESPONSE_ERROR'
      );
    }
    
    // 确保返回的数据不为null
    if (response.data === null || response.data === undefined) {
      throw new ApiError(
        '服务器返回数据为空',
        response.code,
        null,
        'RESPONSE_ERROR'
      );
    }
    
    return response.data as T;
  }

  /**
   * 上传文件 - 支持进度回调和文件验证
   */
  async upload<T = any>(
    url: string, 
    formData: FormData, 
    config?: AxiosRequestConfig & {
      onUploadProgress?: (progressEvent: any) => void;
    }
  ): Promise<T> {
    const response = await this.instance.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: config?.onUploadProgress,
    });
    return this.extractData(response.data);
  }

  /**
   * 下载文件 - 支持下载进度回调
   */
  async download(
    url: string, 
    config?: AxiosRequestConfig & {
      onDownloadProgress?: (progressEvent: any) => void;
    }
  ): Promise<Blob> {
    const response = await this.instance.get(url, {
      ...config,
      responseType: 'blob',
      onDownloadProgress: config?.onDownloadProgress,
    });
    return response.data;
  }

  /**
   * 取消请求
   */
  createCancelToken() {
    return axios.CancelToken.source();
  }

  /**
   * 检查请求是否被取消
   */
  isCancel(error: any): boolean {
    return axios.isCancel(error);
  }
}

/**
 * API 错误类
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data: any,
    public type: 'RESPONSE_ERROR' | 'NETWORK_ERROR' | 'UNKNOWN_ERROR'
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// 创建单例实例
export const httpClient = new HttpClient();
export default httpClient;