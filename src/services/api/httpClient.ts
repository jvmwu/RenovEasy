import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_BASE_URL, HTTP_STATUS } from '@/constants';
import { storageService } from '@/services/storage';

/**
 * HTTP 客户端配置
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
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * 设置请求和响应拦截器
   */
  private setupInterceptors(): void {
    // 请求拦截器
    this.instance.interceptors.request.use(
      async (config) => {
        // 添加认证 token
        const token = await storageService.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // 添加请求 ID 用于调试
        config.headers['X-Request-ID'] = this.generateRequestId();

        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
          headers: config.headers,
          data: config.data,
          params: config.params,
        });

        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
          status: response.status,
          data: response.data,
        });
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        console.error(`❌ API Error: ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`, {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });

        // 处理 401 错误（token 过期）
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
              const { token, refreshToken: newRefreshToken } = response.data;

              // 保存新的 token
              await storageService.setAuthToken(token);
              if (newRefreshToken) {
                await storageService.setRefreshToken(newRefreshToken);
              }

              // 处理队列中的请求
              this.processQueue(null);

              // 重新发送原始请求
              return this.instance(originalRequest);
            }
          } catch (refreshError) {
            // 刷新失败，清除认证信息
            this.processQueue(refreshError);
            await this.clearAuthData();
            // 可以在这里触发登出事件
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
   * 刷新 token
   */
  private async refreshToken(refreshToken: string): Promise<AxiosResponse> {
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
   * 认证错误处理
   */
  private onAuthError(): void {
    // 可以在这里发送事件通知应用登出
    // EventEmitter.emit('AUTH_ERROR');
    console.log('🔐 Authentication error, user should be logged out');
  }

  /**
   * 生成请求 ID
   */
  private generateRequestId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  /**
   * 错误处理
   */
  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      // 服务器响应错误
      const { status, data } = error.response;
      return new ApiError(
        (data as any)?.message || error.message,
        status,
        data,
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
   * GET 请求
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  /**
   * POST 请求
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  /**
   * PUT 请求
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  /**
   * DELETE 请求
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }

  /**
   * PATCH 请求
   */
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.patch<T>(url, data, config);
    return response.data;
  }

  /**
   * 上传文件
   */
  async upload<T = any>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  /**
   * 下载文件
   */
  async download(url: string, config?: AxiosRequestConfig): Promise<Blob> {
    const response = await this.instance.get(url, {
      ...config,
      responseType: 'blob',
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