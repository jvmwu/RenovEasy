// API 相关常量 - 符合API约束规范

export const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api' 
  : 'https://api.renoveasy.com';

// API 版本
export const API_VERSION = 'v1';

// 完整的API基础URL
export const FULL_API_BASE_URL = `${API_BASE_URL}/${API_VERSION}`;

export const API_ENDPOINTS = {
  // 认证相关
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    SEND_CODE: '/auth/send-code',
    VERIFY_CODE: '/auth/verify-code',
  },
  
  // 用户相关
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    UPLOAD_AVATAR: '/user/avatar',
    ORDERS: '/user/orders',
  },
  
  // 工人相关
  WORKER: {
    PROFILE: '/worker/profile',
    UPDATE_PROFILE: '/worker/profile',
    UPLOAD_AVATAR: '/worker/avatar',
    ORDERS: '/worker/orders',
    APPLICATIONS: '/worker/applications',
    CERTIFICATIONS: '/worker/certifications',
  },
  
  // 订单相关
  ORDER: {
    LIST: '/orders',
    CREATE: '/orders',
    DETAIL: '/orders/:id',
    UPDATE: '/orders/:id',
    CANCEL: '/orders/:id/cancel',
    APPLY: '/orders/:id/apply',
    ACCEPT: '/orders/:id/accept',
    COMPLETE: '/orders/:id/complete',
    REVIEW: '/orders/:id/review',
    MESSAGES: '/orders/:id/messages',
    UPLOAD_IMAGE: '/orders/:id/images',
  },
  
  // 文件上传
  UPLOAD: {
    IMAGE: '/upload/image',
    FILE: '/upload/file',
  },
} as const;

// HTTP 状态码常量
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

// 请求方法常量
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

// 内容类型常量
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  URL_ENCODED: 'application/x-www-form-urlencoded',
  TEXT: 'text/plain',
} as const;