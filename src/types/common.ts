// 通用类型定义

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  code?: number;
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