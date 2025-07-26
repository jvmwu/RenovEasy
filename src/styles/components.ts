// 组件通用样式定义 - 避免重复的内联样式

import { borderRadius, colors, shadows, sizes, spacing } from './index';

/**
 * 布局相关样式
 */
export const layoutStyles = {
  // Flex 布局
  row: {
    flexDirection: 'row' as const,
  },
  column: {
    flexDirection: 'column' as const,
  },
  center: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  centerHorizontal: {
    alignItems: 'center' as const,
  },
  centerVertical: {
    justifyContent: 'center' as const,
  },
  spaceBetween: {
    justifyContent: 'space-between' as const,
  },
  spaceAround: {
    justifyContent: 'space-around' as const,
  },
  spaceEvenly: {
    justifyContent: 'space-evenly' as const,
  },
  alignStart: {
    alignItems: 'flex-start' as const,
  },
  alignEnd: {
    alignItems: 'flex-end' as const,
  },
  justifyStart: {
    justifyContent: 'flex-start' as const,
  },
  justifyEnd: {
    justifyContent: 'flex-end' as const,
  },
  flex1: {
    flex: 1,
  },
  fullWidth: {
    width: '100%' as const,
  },
  fullHeight: {
    height: '100%' as const,
  },
} as const;

/**
 * 定位相关样式
 */
export const positionStyles = {
  absolute: {
    position: 'absolute' as const,
  },
  relative: {
    position: 'relative' as const,
  },
  absoluteFill: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  absoluteTop: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
  },
  absoluteBottom: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
  },
  absoluteCenter: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
} as const;

/**
 * 按钮相关样式
 */
export const buttonStyles = {
  // 按钮图标间距
  iconSpacing: {
    left: {
      marginLeft: spacing[2],
    },
    right: {
      marginRight: spacing[2],
    },
  },
  // 按钮容器
  container: {
    ...layoutStyles.row,
    ...layoutStyles.center,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
} as const;

/**
 * 输入框相关样式
 */
export const inputStyles = {
  // 标签容器
  labelContainer: {
    ...layoutStyles.row,
    marginBottom: spacing[1],
  },
  // 图标容器
  iconContainer: {
    left: {
      marginRight: spacing[2],
    },
    right: {
      marginLeft: spacing[2],
    },
  },
  // 输入框容器
  container: {
    ...layoutStyles.row,
    ...layoutStyles.centerVertical,
    borderRadius: borderRadius.lg,
  },
  // 帮助文本
  helperText: {
    marginTop: spacing[1],
  },
  // 必填标记
  requiredMark: {
    marginLeft: spacing[0.5],
  },
} as const;

/**
 * 卡片相关样式
 */
export const cardStyles = {
  container: {
    borderRadius: borderRadius.xl,
  },
  elevated: {
    ...shadows.lg,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
} as const;

/**
 * 模态框相关样式
 */
export const modalStyles = {
  // 遮罩层
  overlay: {
    ...layoutStyles.flex1,
    backgroundColor: colors.background.overlay,
  },
  // 模态框容器
  container: {
    backgroundColor: colors.background.modal,
    ...shadows.xl,
  },
  // 关闭按钮
  closeButton: {
    ...positionStyles.absolute,
    top: spacing[3],
    right: spacing[3],
    zIndex: 1,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.neutral[100],
    ...layoutStyles.center,
  },
  // 关闭图标线条
  closeIconLine: {
    width: 16,
    height: 2,
    backgroundColor: colors.neutral[600],
    ...positionStyles.absolute,
  },
  // 位置样式
  position: {
    center: {
      ...layoutStyles.center,
      padding: spacing[4],
    },
    bottom: {
      justifyContent: 'flex-end' as const,
    },
    top: {
      justifyContent: 'flex-start' as const,
      paddingTop: spacing[12],
    },
  },
  // 尺寸样式
  size: {
    sm: {
      maxWidth: 320,
      width: '80%' as const,
    },
    md: {
      maxWidth: 400,
      width: '90%' as const,
    },
    lg: {
      maxWidth: 600,
      width: '95%' as const,
    },
    full: {
      width: '100%' as const,
      height: '100%' as const,
    },
  },
  // 边框半径样式
  borderRadius: {
    center: {
      borderRadius: borderRadius['2xl'],
      maxHeight: '80%' as const,
    },
    bottom: {
      borderTopLeftRadius: borderRadius['2xl'],
      borderTopRightRadius: borderRadius['2xl'],
      width: '100%' as const,
      maxHeight: '90%' as const,
    },
    top: {
      borderBottomLeftRadius: borderRadius['2xl'],
      borderBottomRightRadius: borderRadius['2xl'],
      width: '100%' as const,
      maxHeight: '80%' as const,
    },
  },
} as const;

/**
 * 导航栏相关样式
 */
export const navigationStyles = {
  // 导航栏容器
  container: {
    ...shadows.sm,
  },
  // 导航栏主体
  navbar: {
    height: 44,
    ...layoutStyles.row,
    ...layoutStyles.centerVertical,
    ...layoutStyles.spaceBetween,
    paddingHorizontal: spacing[4],
  },
  // 按钮样式
  button: {
    minWidth: 44,
    height: 44,
    ...layoutStyles.center,
  },
  // 按钮容器
  buttonContainer: {
    left: {
      width: 80,
      ...layoutStyles.alignStart,
    },
    right: {
      width: 80,
      ...layoutStyles.alignEnd,
    },
  },
  // 标题样式
  title: {
    ...layoutStyles.flex1,
    textAlign: 'center' as const,
  },
} as const;

/**
 * 标签栏相关样式
 */
export const tabBarStyles = {
  // 标签栏容器
  container: {
    ...shadows.lg,
  },
  // 标签栏主体
  tabbar: {
    ...layoutStyles.row,
    height: 49, // iOS 标准标签栏高度
    ...layoutStyles.centerVertical,
  },
  // 标签样式
  tab: {
    ...layoutStyles.flex1,
    ...layoutStyles.center,
    paddingVertical: spacing[1],
  },
  // 图标容器
  iconContainer: {
    ...layoutStyles.center,
  },
  // 徽章样式
  badge: {
    ...positionStyles.absolute,
    top: -2,
    right: -6,
    backgroundColor: colors.error[500],
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    ...layoutStyles.center,
    paddingHorizontal: 4,
  },
  // 图标着色
  iconTint: (color: string) => ({
    tintColor: color,
  }),
} as const;

/**
 * 列表相关样式
 */
export const listStyles = {
  // 列表项
  item: {
    ...layoutStyles.row,
    ...layoutStyles.centerVertical,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  // 分隔线
  separator: {
    height: 1,
    backgroundColor: colors.border.primary,
    marginLeft: spacing[4],
  },
  // 空状态
  empty: {
    ...layoutStyles.center,
    paddingVertical: spacing[12],
  },
} as const;

/**
 * 表单相关样式
 */
export const formStyles = {
  // 表单容器
  container: {
    padding: spacing[4],
  },
  // 表单组
  group: {
    marginBottom: spacing[4],
  },
  // 表单行
  row: {
    ...layoutStyles.row,
    ...layoutStyles.centerVertical,
    marginBottom: spacing[3],
  },
  // 表单标签
  label: {
    marginBottom: spacing[1],
  },
  // 错误文本
  error: {
    marginTop: spacing[1],
    color: colors.error[500],
  },
} as const;

/**
 * 加载相关样式
 */
export const loadingStyles = {
  // 加载容器
  container: {
    ...layoutStyles.center,
    padding: spacing[8],
  },
  // 全屏加载
  fullscreen: {
    ...positionStyles.absoluteFill,
    backgroundColor: colors.background.overlay,
    ...layoutStyles.center,
  },
  // 内联加载
  inline: {
    ...layoutStyles.row,
    ...layoutStyles.center,
    padding: spacing[2],
  },
} as const;

/**
 * 图片相关样式
 */
export const imageStyles = {
  // 头像
  avatar: {
    borderRadius: sizes.avatar.base / 2,
  },
  // 圆形图片
  circle: {
    borderRadius: 9999,
  },
  // 圆角图片
  rounded: {
    borderRadius: borderRadius.lg,
  },
  // 封面图片
  cover: {
    width: '100%' as const,
    aspectRatio: 16 / 9,
  },
} as const;
