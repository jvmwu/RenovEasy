// 通用类型定义

/**
 * 统一 API 响应格式
 */
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T | null;
  success: boolean;
}

/**
 * API 错误详情
 */
export interface ApiError {
  code: number;
  message: string;
  details?: Record<string, string[]>;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  province?: string;
}

export interface FileUpload {
  uri: string;
  type: string;
  name: string;
}