// 本地存储相关常量

export const STORAGE_KEYS = {
  // 认证相关
  AUTH_TOKEN: '@RenovEasy:authToken',
  REFRESH_TOKEN: '@RenovEasy:refreshToken',
  USER_TYPE: '@RenovEasy:userType',
  USER_ID: '@RenovEasy:userId',
  USER_DATA: '@RenovEasy:userData',
  
  // 用户偏好
  THEME: '@RenovEasy:theme',
  LANGUAGE: '@RenovEasy:language',
  NOTIFICATIONS_ENABLED: '@RenovEasy:notificationsEnabled',
  
  // 应用状态
  FIRST_LAUNCH: '@RenovEasy:firstLaunch',
  ONBOARDING_COMPLETED: '@RenovEasy:onboardingCompleted',
  
  // 缓存
  USER_PROFILE: '@RenovEasy:userProfile',
  WORKER_PROFILE: '@RenovEasy:workerProfile',
  RECENT_SEARCHES: '@RenovEasy:recentSearches',
  LOCATION_PERMISSION: '@RenovEasy:locationPermission',
} as const;
