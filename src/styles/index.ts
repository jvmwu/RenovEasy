// 设计系统统一导出

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './components';

// 主题配置
import { colors } from './colors';
import { textStyles, fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from './typography';
import { spacing, semanticSpacing, borderRadius, shadows, sizes } from './spacing';
import { 
  layoutStyles, 
  positionStyles, 
  buttonStyles, 
  inputStyles, 
  cardStyles, 
  modalStyles, 
  navigationStyles, 
  tabBarStyles, 
  listStyles, 
  formStyles, 
  loadingStyles, 
  imageStyles 
} from './components';

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
  components: {
    layout: layoutStyles,
    position: positionStyles,
    button: buttonStyles,
    input: inputStyles,
    card: cardStyles,
    modal: modalStyles,
    navigation: navigationStyles,
    tabBar: tabBarStyles,
    list: listStyles,
    form: formStyles,
    loading: loadingStyles,
    image: imageStyles,
  },
} as const;

export type Theme = typeof theme;
