import { ApiError } from './httpClient';

/**
 * API 错误处理器 - 基于API约束优化
 * 提供统一的错误处理逻辑和用户友好的错误提示
 */
export class ErrorHandler {
  /**
   * 处理 API 错误 - 返回用户友好的错误信息
   */
  static handleApiError(error: ApiError): {
    title: string;
    message: string;
    action?: 'retry' | 'login' | 'refresh' | 'wait' | 'contact';
    canRetry?: boolean;
    retryDelay?: number;
  } {
    switch (error.type) {
      case 'NETWORK_ERROR':
        return {
          title: '网络错误',
          message: '网络连接失败，请检查网络设置后重试',
          action: 'retry',
          canRetry: true,
          retryDelay: 3000,
        };

      case 'RESPONSE_ERROR':
        return this.handleResponseError(error);

      case 'UNKNOWN_ERROR':
      default:
        return {
          title: '未知错误',
          message: error.message || '发生了未知错误，请稍后重试',
          action: 'retry',
          canRetry: true,
          retryDelay: 5000,
        };
    }
  }

  /**
   * 处理响应错误 - 根据HTTP状态码提供详细的错误处理
   */
  private static handleResponseError(error: ApiError): {
    title: string;
    message: string;
    action?: 'retry' | 'login' | 'refresh' | 'wait' | 'contact';
    canRetry?: boolean;
    retryDelay?: number;
  } {
    switch (error.status) {
      case 400:
        return {
          title: '请求错误',
          message: this.formatValidationErrors(error) || '请求参数有误，请检查后重试',
          canRetry: false,
        };

      case 401:
        return {
          title: '认证失败',
          message: '登录已过期，请重新登录',
          action: 'login',
          canRetry: false,
        };

      case 403:
        return {
          title: '权限不足',
          message: '您没有权限执行此操作',
          canRetry: false,
        };

      case 404:
        return {
          title: '资源不存在',
          message: '请求的资源不存在或已被删除',
          canRetry: false,
        };

      case 409:
        return {
          title: '数据冲突',
          message: error.message || '数据已被其他用户修改，请刷新后重试',
          action: 'refresh',
          canRetry: true,
        };

      case 422:
        return {
          title: '数据验证失败',
          message: this.formatValidationErrors(error) || '提交的数据格式不正确',
          canRetry: false,
        };

      case 429:
        return {
          title: '请求过于频繁',
          message: '请求过于频繁，请稍后再试',
          action: 'wait',
          canRetry: true,
          retryDelay: 60000, // 1分钟后重试
        };

      case 500:
        return {
          title: '服务器错误',
          message: '服务器内部错误，请稍后重试',
          action: 'retry',
          canRetry: true,
          retryDelay: 5000,
        };

      case 502:
      case 503:
      case 504:
        return {
          title: '服务不可用',
          message: '服务暂时不可用，请稍后重试',
          action: 'retry',
          canRetry: true,
          retryDelay: 10000,
        };

      default:
        return {
          title: '请求失败',
          message: error.message || `请求失败 (${error.status})`,
          action: error.status >= 500 ? 'retry' : 'contact',
          canRetry: error.status >= 500,
          retryDelay: 5000,
        };
    }
  }

  /**
   * 格式化验证错误信息
   */
  private static formatValidationErrors(error: ApiError): string | null {
    if (error.data && typeof error.data === 'object' && error.data.errors) {
      const errors = error.data.errors as Record<string, string[]>;
      const errorMessages = Object.entries(errors)
        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
        .join('\n');
      return errorMessages || null;
    }
    return null;
  }

  /**
   * 获取用户友好的错误消息
   */
  static getUserFriendlyMessage(error: any): string {
    if (error instanceof ApiError) {
      const handled = this.handleApiError(error);
      return handled.message;
    }

    if (error?.message) {
      return error.message;
    }

    return '发生了未知错误，请稍后重试';
  }

  /**
   * 判断错误是否需要重试
   */
  static shouldRetry(error: ApiError): boolean {
    if (error.type === 'NETWORK_ERROR') {
      return true;
    }

    if (error.type === 'RESPONSE_ERROR') {
      // 5xx 错误和 429 错误可以重试
      return error.status >= 500 || error.status === 429;
    }

    return false;
  }

  /**
   * 判断错误是否需要登录
   */
  static requiresLogin(error: ApiError): boolean {
    return error.status === 401;
  }

  /**
   * 判断错误是否需要刷新数据
   */
  static requiresRefresh(error: ApiError): boolean {
    return error.status === 409;
  }

  /**
   * 获取重试延迟时间（毫秒）- 指数退避算法
   */
  static getRetryDelay(attempt: number): number {
    // 指数退避算法：1s, 2s, 4s, 8s, 16s
    return Math.min(1000 * Math.pow(2, attempt), 16000);
  }

  /**
   * 检查错误是否为业务逻辑错误
   */
  static isBusinessError(error: ApiError): boolean {
    return error.type === 'RESPONSE_ERROR' && 
      error.status >= 400 && 
      error.status < 500 && 
      error.status !== 401 && 
      error.status !== 403;
  }

  /**
   * 检查错误是否为服务器错误
   */
  static isServerError(error: ApiError): boolean {
    return error.type === 'RESPONSE_ERROR' && error.status >= 500;
  }

  /**
   * 获取错误的严重程度
   */
  static getErrorSeverity(error: ApiError): 'low' | 'medium' | 'high' | 'critical' {
    if (error.type === 'NETWORK_ERROR') {
      return 'high';
    }

    if (error.type === 'RESPONSE_ERROR') {
      if (error.status === 401 || error.status === 403) {
        return 'critical';
      }
      if (error.status >= 500) {
        return 'high';
      }
      if (error.status === 429) {
        return 'medium';
      }
      return 'low';
    }

    return 'medium';
  }
}

/**
 * 重试配置
 */
export interface RetryConfig {
  maxAttempts: number;
  delay: number;
  backoff: boolean;
}

/**
 * 带重试的请求执行器
 */
export class RetryExecutor {
  /**
   * 执行带重试的请求
   */
  static async execute<T>(
    requestFn: () => Promise<T>,
    config: Partial<RetryConfig> = {}
  ): Promise<T> {
    const {
      maxAttempts = 3,
      delay = 1000,
      backoff = true,
    } = config;

    let lastError: any;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error;

        // 如果是最后一次尝试，直接抛出错误
        if (attempt === maxAttempts - 1) {
          break;
        }

        // 检查是否应该重试
        if (error instanceof ApiError && !ErrorHandler.shouldRetry(error)) {
          break;
        }

        // 计算延迟时间
        const retryDelay = backoff 
          ? ErrorHandler.getRetryDelay(attempt)
          : delay;

        // 等待后重试
        await new Promise(resolve => setTimeout(() => resolve(undefined), retryDelay));
      }
    }

    throw lastError;
  }
}

export default ErrorHandler;
