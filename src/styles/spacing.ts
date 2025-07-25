// 设计系统 - 间距定义

// 基础间距单位 (4px)
const BASE_UNIT = 4;

// 间距值
export const spacing = {
  0: 0,
  0.5: BASE_UNIT * 0.5, // 2px
  1: BASE_UNIT * 1,     // 4px
  1.5: BASE_UNIT * 1.5, // 6px
  2: BASE_UNIT * 2,     // 8px
  2.5: BASE_UNIT * 2.5, // 10px
  3: BASE_UNIT * 3,     // 12px
  3.5: BASE_UNIT * 3.5, // 14px
  4: BASE_UNIT * 4,     // 16px
  5: BASE_UNIT * 5,     // 20px
  6: BASE_UNIT * 6,     // 24px
  7: BASE_UNIT * 7,     // 28px
  8: BASE_UNIT * 8,     // 32px
  9: BASE_UNIT * 9,     // 36px
  10: BASE_UNIT * 10,   // 40px
  11: BASE_UNIT * 11,   // 44px
  12: BASE_UNIT * 12,   // 48px
  14: BASE_UNIT * 14,   // 56px
  16: BASE_UNIT * 16,   // 64px
  20: BASE_UNIT * 20,   // 80px
  24: BASE_UNIT * 24,   // 96px
  28: BASE_UNIT * 28,   // 112px
  32: BASE_UNIT * 32,   // 128px
  36: BASE_UNIT * 36,   // 144px
  40: BASE_UNIT * 40,   // 160px
  44: BASE_UNIT * 44,   // 176px
  48: BASE_UNIT * 48,   // 192px
  52: BASE_UNIT * 52,   // 208px
  56: BASE_UNIT * 56,   // 224px
  60: BASE_UNIT * 60,   // 240px
  64: BASE_UNIT * 64,   // 256px
  72: BASE_UNIT * 72,   // 288px
  80: BASE_UNIT * 80,   // 320px
  96: BASE_UNIT * 96,   // 384px
} as const;

// 语义化间距
export const semanticSpacing = {
  // 组件内部间距
  xs: spacing[1],      // 4px
  sm: spacing[2],      // 8px
  md: spacing[4],      // 16px
  lg: spacing[6],      // 24px
  xl: spacing[8],      // 32px
  '2xl': spacing[12],  // 48px
  '3xl': spacing[16],  // 64px

  // 页面级间距
  pageHorizontal: spacing[4],  // 16px - 页面水平边距
  pageVertical: spacing[6],    // 24px - 页面垂直边距
  sectionGap: spacing[8],      // 32px - 区块间距
  
  // 组件间距
  componentGap: spacing[4],    // 16px - 组件间距
  elementGap: spacing[2],      // 8px - 元素间距
  
  // 按钮间距
  buttonPaddingHorizontal: spacing[6], // 24px
  buttonPaddingVertical: spacing[3],   // 12px
  buttonGap: spacing[3],               // 12px
  
  // 输入框间距
  inputPaddingHorizontal: spacing[4],  // 16px
  inputPaddingVertical: spacing[3],    // 12px
  inputGap: spacing[4],                // 16px
  
  // 卡片间距
  cardPadding: spacing[4],             // 16px
  cardGap: spacing[3],                 // 12px
  
  // 列表间距
  listItemPaddingHorizontal: spacing[4], // 16px
  listItemPaddingVertical: spacing[3],   // 12px
  listItemGap: spacing[1],               // 4px
  
  // 导航间距
  navPaddingHorizontal: spacing[4],    // 16px
  navPaddingVertical: spacing[2],      // 8px
  tabBarHeight: spacing[20],           // 80px
  navBarHeight: spacing[11],           // 44px
  
  // 安全区域
  safeAreaTop: spacing[11],            // 44px - iOS 状态栏高度
  safeAreaBottom: spacing[8],          // 32px - iOS Home Indicator
} as const;

// 边框半径
export const borderRadius = {
  none: 0,
  sm: 2,
  base: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
} as const;

// 阴影配置
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  '2xl': {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 24,
  },
} as const;

// 尺寸定义
export const sizes = {
  // 图标尺寸
  icon: {
    xs: 12,
    sm: 16,
    base: 20,
    md: 24,
    lg: 32,
    xl: 40,
    '2xl': 48,
  },
  
  // 头像尺寸
  avatar: {
    xs: 24,
    sm: 32,
    base: 40,
    md: 48,
    lg: 64,
    xl: 80,
    '2xl': 96,
  },
  
  // 按钮高度
  button: {
    sm: 32,
    base: 44,
    lg: 52,
  },
  
  // 输入框高度
  input: {
    sm: 36,
    base: 44,
    lg: 52,
  },
  
  // 最小触摸区域
  touchTarget: 44,
  
  // 屏幕断点
  screen: {
    sm: 375,  // iPhone SE
    md: 414,  // iPhone Pro Max
    lg: 768,  // iPad Mini
    xl: 1024, // iPad
  },
} as const;