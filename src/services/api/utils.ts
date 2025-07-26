// API 工具函数 - 符合API约束规范

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
 * 构建文件上传FormData
 */
export function buildFormData(data: Record<string, any>): FormData {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (value instanceof File || (value && typeof value === 'object' && value.uri)) {
        // React Native 文件对象
        formData.append(key, value as any);
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
 * 验证文件类型
 */
export function validateFileType(file: any, allowedTypes: string[]): boolean {
  if (!file || !file.type) return false;
  return allowedTypes.includes(file.type);
}

/**
 * 验证文件大小
 */
export function validateFileSize(file: any, maxSizeInMB: number): boolean {
  if (!file || !file.size) return false;
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
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
  let timeout: NodeJS.Timeout;
  
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
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}