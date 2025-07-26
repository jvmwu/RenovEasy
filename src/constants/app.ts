// 应用相关常量

export const APP_CONFIG = {
  NAME: 'RenovEasy',
  VERSION: '1.0.0',
  BUILD_NUMBER: 1,
} as const;

export const SCREEN_NAMES = {
  // 认证相关
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  
  // 用户端
  USER_HOME: 'UserHome',
  USER_PROFILE: 'UserProfile',
  USER_ORDERS: 'UserOrders',
  CREATE_ORDER: 'CreateOrder',
  ORDER_DETAIL: 'OrderDetail',
  
  // 工人端
  WORKER_HOME: 'WorkerHome',
  WORKER_PROFILE: 'WorkerProfile',
  WORKER_ORDERS: 'WorkerOrders',
  WORKER_APPLICATIONS: 'WorkerApplications',
  
  // 通用
  CHAT: 'Chat',
  MAP: 'Map',
  SETTINGS: 'Settings',
} as const;

export const TAB_NAMES = {
  USER: {
    HOME: 'UserHome',
    ORDERS: 'UserOrders',
    PROFILE: 'UserProfile',
  },
  WORKER: {
    HOME: 'WorkerHome',
    ORDERS: 'WorkerOrders',
    PROFILE: 'WorkerProfile',
  },
} as const;

export const COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#64748B',
  SUCCESS: '#22C55E',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
} as const;
