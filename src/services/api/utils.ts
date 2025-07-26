// API 工具函数 - 符合API约束规范
import { Platform } from 'react-native';

/**
 * 构建查询参数
 */
export function buildQueryParams(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  
  return searchParams.toString();
}

/**
 * 构建分页参数
 */
export function buildPaginationParams(page: number = 1, limit: number = 20) {
  return {
    page: Math.max(1, page),
    limit: Math.min(100, Math.max(1, limit)), // 限制每页最多100条
  };
}

/**
 * 构建排序参数
 */
export function buildSortParams(sortBy?: string, sortOrder: 'asc' | 'desc' = 'desc') {
  if (!sortBy) return {};
  
  return {
    sortBy,
    sortOrder,
  };
}

/**
 * React Native 文件对象接口
 */
interface ReactNativeFile {
  uri: string;
  type: string;
  name: string;
}

/**
 * 构建文件上传FormData
 */
export function buildFormData(data: Record<string, any>): FormData {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      // 检查是否为文件对象（Web File API 或 React Native 文件对象）
      if (value instanceof File || (value && typeof value === 'object' && value.uri)) {
        // React Native 文件对象需要特殊处理
        if (value.uri) {
          const file = value as ReactNativeFile;
          formData.append(key, {
            uri: file.uri,
            type: file.type,
            name: file.name,
          } as any);
        } else {
          // Web File API
          formData.append(key, value);
        }
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, String(item));
        });
      } else {
        formData.append(key, String(value));
      }
    }
  });
  
  return formData;
}

/**
 * 验证文件类型 - 兼容Web File API和React Native文件对象
 */
export function validateFileType(file: any, allowedTypes: string[]): boolean {
  if (!file) return false;
  
  // Web File API
  if (file.type) {
    return allowedTypes.includes(file.type);
  }
  
  // React Native 文件对象 - 通过文件扩展名判断
  if (file.uri && file.name) {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension) return false;
    
    // 简单的扩展名到MIME类型映射
    const extensionToMime: Record<string, string> = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
    
    const mimeType = extensionToMime[extension];
    return mimeType ? allowedTypes.includes(mimeType) : false;
  }
  
  return false;
}

/**
 * 验证文件大小 - 兼容Web File API和React Native文件对象
 */
export function validateFileSize(file: any, maxSizeInMB: number): boolean {
  if (!file) return false;
  
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  
  // Web File API
  if (file.size !== undefined) {
    return file.size <= maxSizeInBytes;
  }
  
  // React Native 文件对象可能没有size属性
  // 在这种情况下，我们无法验证大小，返回true让服务器处理
  return true;
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 生成缓存键
 */
export function generateCacheKey(endpoint: string, params?: Record<string, any>): string {
  if (!params) return endpoint;
  
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((result, key) => {
      result[key] = params[key];
      return result;
    }, {} as Record<string, any>);
  
  return `${endpoint}?${JSON.stringify(sortedParams)}`;
}

/**
 * 延迟函数
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 重试函数
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxAttempts) {
        break;
      }
      
      await delay(delayMs * attempt); // 递增延迟
    }
  }
  
  throw lastError;
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * 检查是否为React Native环境
 */
export function isReactNative(): boolean {
  try {
    // 如果能成功导入Platform，说明是React Native环境
    return Platform.OS === 'ios' || Platform.OS === 'android';
  } catch {
    return false;
  }
}

/**
 * 安全的JSON解析
 */
export function safeJsonParse<T = any>(jsonString: string, defaultValue: T): T {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return defaultValue;
  }
}

/**
 * 深度合并对象
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const sourceValue = source[key];
      const targetValue = result[key];
      
      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(targetValue, sourceValue);
      } else {
        result[key] = sourceValue as T[Extract<keyof T, string>];
      }
    }
  }
  
  return result;
}

/**
 * 获取文件扩展名
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

/**
 * 生成随机字符串
 */
export function generateRandomString(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
