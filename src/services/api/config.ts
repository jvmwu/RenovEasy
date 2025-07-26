// API 配置管理 - 符合API约束规范

/**
 * API 配置接口
 */
export interface ApiConfig {
  baseURL: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  enableLogging: boolean;
  enableCache: boolean;
  cacheTimeout: number;
}

/**
 * 默认API配置
 */
export const defaultApiConfig: ApiConfig = {
  baseURL: __DEV__ ? 'http://localhost:3000/api' : 'https://api.renoveasy.com',
  timeout: 10000, // 10秒
  retryAttempts: 3,
  retryDelay: 1000, // 1秒
  enableLogging: __DEV__,
  enableCache: true,
  cacheTimeout: 300000, // 5分钟
};

/**
 * 缓存配置
 */
export const cacheConfig = {
  // 用户信息缓存5分钟
  userProfile: 300,
  // 订单列表缓存1分钟
  orderList: 60,
  // 装修工列表缓存2分钟
  workerList: 120,
  // 静态数据缓存1小时
  categories: 3600,
  // 消息列表缓存30秒
  messages: 30,
} as const;

/**
 * 端点配置
 */
export const endpointConfig = {
  auth: {
    login: { timeout: 15000, retryAttempts: 2 },
    register: { timeout: 15000, retryAttempts: 2 },
    refresh: { timeout: 5000, retryAttempts: 1 },
    logout: { timeout: 5000, retryAttempts: 1 },
  },
  user: {
    profile: { cache: cacheConfig.userProfile },
    updateProfile: { timeout: 15000 },
    uploadAvatar: { timeout: 30000, retryAttempts: 2 },
  },
  worker: {
    list: { cache: cacheConfig.workerList },
    profile: { cache: cacheConfig.userProfile },
    nearby: { cache: 60 }, // 1分钟
  },
  order: {
    list: { cache: cacheConfig.orderList },
    create: { timeout: 15000 },
    update: { timeout: 10000 },
    messages: { cache: cacheConfig.messages },
  },
  upload: {
    image: { timeout: 60000, retryAttempts: 2 }, // 1分钟
    file: { timeout: 120000, retryAttempts: 2 }, // 2分钟
  },
} as const;

/**
 * 文件上传配置
 */
export const uploadConfig = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  allowedFileTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  imageQuality: 0.8,
  maxImageWidth: 1920,
  maxImageHeight: 1920,
};

/**
 * 分页配置
 */
export const paginationConfig = {
  defaultPageSize: 20,
  maxPageSize: 100,
  minPageSize: 1,
};

/**
 * 获取端点配置
 */
export function getEndpointConfig(category: keyof typeof endpointConfig, endpoint: string) {
  const categoryConfig = endpointConfig[category] as any;
  return categoryConfig?.[endpoint] || {};
}

/**
 * 合并配置
 */
export function mergeConfig(defaultConfig: Partial<ApiConfig>, customConfig: Partial<ApiConfig> = {}): ApiConfig {
  return {
    ...defaultApiConfig,
    ...defaultConfig,
    ...customConfig,
  };
}