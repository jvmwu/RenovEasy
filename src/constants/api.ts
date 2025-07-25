// API 相关常量

export const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api' 
  : 'https://api.renoveasy.com';

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

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;