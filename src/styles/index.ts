// 设计系统统一导出

export * from './colors';
export * from './typography';
export * from './spacing';

// 主题配置
import { colors } from './colors';
import { textStyles, fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from './typography';
import { spacing, semanticSpacing, borderRadius, shadows, sizes } from './spacing';

export const theme = {
  colors,
  typography: {
    textStyles,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
  },
  spacing,
  semanticSpacing,
  borderRadius,
  shadows,
  sizes,
} as const;

export type Theme = typeof theme;