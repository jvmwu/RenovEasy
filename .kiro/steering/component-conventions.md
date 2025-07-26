---
inclusion: fileMatch
fileMatchPattern: ['src/components/**/*']
---

# 组件开发规范

## 核心原则

### 1. 禁止内联样式
- **严格禁止**在组件中使用内联样式对象
- 所有样式必须定义为常量对象或使用预定义的样式系统
- 使用 `@/styles` 中的样式常量和工具函数

```typescript
// ❌ 错误 - 内联样式
<View style={{ flexDirection: 'row', padding: 16 }}>

// ❌ 错误 - 样式函数（性能差）
const getContainerStyle = (): ViewStyle => ({
  ...layoutStyles.row,
  padding: spacing[4],
});
<View style={getContainerStyle()}>

// ✅ 正确 - StyleSheet + useMemo 优化
const containerStyle = useMemo((): ViewStyle => ({
  ...styles.container,
  padding: spacing[4],
}), []);
<View style={containerStyle}>

// ✅ 最佳 - 静态样式 + 动态计算分离
const styles = StyleSheet.create({
  container: {
    ...layoutStyles.row,
  },
});
```

### 2. 样式组织规范

#### 样式定义位置优先级
1. **公共样式**: 使用 `@/styles/components.ts` 中的预定义样式
2. **组件样式函数**: 在组件内部定义样式获取函数
3. **局部样式常量**: 组件内部的样式常量对象
4. **避免重复**: 相同样式在多个组件中使用时，提取到公共样式文件

#### 样式优化规范
```typescript
// ✅ 使用 StyleSheet.create 定义静态样式
const styles = StyleSheet.create({
  container: { ... },
  text: { ... },
});

// ✅ 使用 useMemo 缓存动态样式计算
const containerStyle = useMemo((): ViewStyle => ({
  ...styles.container,
  backgroundColor: isActive ? colors.primary[500] : colors.white,
}), [isActive]);

// ✅ 样式变量命名规范
const computedStyle = useMemo(...);  // 动态计算的样式
const staticStyle = styles.container; // 静态样式引用
```

### 3. 导入规范

#### React Native 导入顺序
```typescript
import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleSheet
} from 'react-native';

// 样式导入顺序
import { 
  colors,           // 颜色系统
  textStyles,       // 文本样式
  spacing,          // 间距系统
  borderRadius,     // 边框半径
  shadows,          // 阴影系统
  layoutStyles,     // 布局样式
} from '@/styles';
```

#### 避免不必要的导入
- 只导入实际使用的样式常量
- 使用 ESLint 检查未使用的导入

## 组件结构规范

### 1. 组件文件结构
```typescript
// 1. React 和 React Native 导入
import React, { useMemo } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ViewStyle, 
  TextStyle,
  StyleSheet 
} from 'react-native';

// 2. 第三方库导入
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// 3. 内部模块导入
import { colors, textStyles, layoutStyles, spacing } from '@/styles';

// 4. 类型定义
export interface ComponentProps {
  // props 定义
}

// 5. 组件实现
export const Component: React.FC<ComponentProps> = ({ ... }) => {
  // 使用 useMemo 缓存动态样式计算
  const containerStyle = useMemo((): ViewStyle => ({
    ...styles.container,
    // 动态样式计算
  }), [dependencies]);
  
  // 组件逻辑
  
  // 渲染
  return (
    <View style={containerStyle}>
      {/* 组件内容 */}
    </View>
  );
};

// 6. 静态样式定义 - 性能优化
const styles = StyleSheet.create({
  container: {
    ...layoutStyles.row,
    padding: spacing[4],
  },
  // 其他静态样式
});
```

### 2. Props 接口规范
```typescript
export interface ComponentProps extends ViewProps {
  // 必需属性
  title: string;
  onPress: () => void;
  
  // 可选属性
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'base' | 'lg';
  disabled?: boolean;
  
  // 样式属性
  style?: ViewStyle;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  
  // 子组件
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

## 样式系统使用规范

### 1. 布局样式
```typescript
// 使用预定义的布局样式
import { layoutStyles } from '@/styles';

// 常用布局
layoutStyles.row          // flexDirection: 'row'
layoutStyles.column       // flexDirection: 'column'
layoutStyles.center       // 居中对齐
layoutStyles.spaceBetween // 两端对齐
layoutStyles.flex1        // flex: 1
layoutStyles.fullWidth    // width: '100%'
```

### 2. 间距系统
```typescript
// 使用标准间距
import { spacing, semanticSpacing } from '@/styles';

// 基础间距 (4px 倍数)
spacing[1]  // 4px
spacing[2]  // 8px
spacing[4]  // 16px

// 语义化间距
semanticSpacing.pageHorizontal  // 页面水平边距
semanticSpacing.componentGap    // 组件间距
semanticSpacing.buttonPadding   // 按钮内边距
```

### 3. 颜色系统
```typescript
// 使用设计系统颜色
import { colors } from '@/styles';

// 主题色
colors.primary[500]     // 主色
colors.secondary[500]   // 辅助色
colors.error[500]       // 错误色

// 语义化颜色
colors.text.primary     // 主要文本色
colors.background.card  // 卡片背景色
colors.border.primary   // 主要边框色
```

### 4. 文本样式
```typescript
// 使用预定义文本样式
import { textStyles } from '@/styles';

textStyles.h1           // 一级标题
textStyles.body1        // 正文
textStyles.button       // 按钮文本
textStyles.caption      // 说明文字
```

## 组件样式最佳实践

### 1. 响应式设计
```typescript
// 根据屏幕尺寸调整样式
const getResponsiveStyle = (): ViewStyle => {
  const { width } = Dimensions.get('window');
  
  return {
    padding: width > 768 ? spacing[6] : spacing[4],
    fontSize: width > 768 ? fontSize.lg : fontSize.base,
  };
};
```

### 2. 主题支持
```typescript
// 支持主题切换
const getThemedStyle = (isDark: boolean): ViewStyle => ({
  backgroundColor: isDark ? colors.neutral[800] : colors.white,
  color: isDark ? colors.white : colors.text.primary,
});
```

### 3. 状态样式
```typescript
// 根据组件状态调整样式
const getStateStyle = (isActive: boolean, isDisabled: boolean): ViewStyle => ({
  backgroundColor: isDisabled 
    ? colors.neutral[200] 
    : isActive 
      ? colors.primary[500] 
      : colors.white,
  opacity: isDisabled ? 0.6 : 1,
});
```

### 4. 平台适配
```typescript
// 平台特定样式
const getPlatformStyle = (): ViewStyle => ({
  ...Platform.select({
    ios: {
      shadowColor: colors.shadow.light,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  }),
});
```

## 性能优化规范

### 1. 动静分离原则
```typescript
// ✅ 静态样式使用 StyleSheet.create
const styles = StyleSheet.create({
  container: {
    ...layoutStyles.row,
    padding: spacing[4],
  },
  activeContainer: {
    backgroundColor: colors.primary[500],
  },
});

// ✅ 动态样式使用 useMemo 缓存
const containerStyle = useMemo((): ViewStyle => ({
  ...styles.container,
  ...(isActive && styles.activeContainer),
  opacity: disabled ? 0.6 : 1,
}), [isActive, disabled]);
```

### 2. StyleSheet 优化
```typescript
// ✅ 使用 StyleSheet.create 优化性能
const styles = StyleSheet.create({
  // StyleSheet 会优化样式对象，避免重复创建
  container: { ... },
  text: { ... },
});

// ❌ 避免每次渲染创建新对象
const getStyle = () => ({ ... }); // 每次调用都创建新对象
```

### 3. useMemo 依赖优化
```typescript
// ✅ 精确的依赖数组
const containerStyle = useMemo((): ViewStyle => ({
  ...styles.container,
  backgroundColor: variant === 'primary' ? colors.primary[500] : colors.white,
}), [variant]); // 只有 variant 变化时才重新计算

// ❌ 过度依赖或缺少依赖
const containerStyle = useMemo(() => ({ ... }), []); // 缺少依赖
const containerStyle = useMemo(() => ({ ... }), [props]); // 过度依赖
```

### 4. 条件样式优化
```typescript
// ✅ 预定义状态样式
const styles = StyleSheet.create({
  base: { ... },
  active: { backgroundColor: colors.primary[500] },
  disabled: { opacity: 0.6 },
});

const containerStyle = useMemo((): ViewStyle => ({
  ...styles.base,
  ...(isActive && styles.active),
  ...(disabled && styles.disabled),
}), [isActive, disabled]);
```

## 可访问性规范

### 1. 触摸目标大小
```typescript
// 确保触摸目标至少 44x44 点
const touchableStyle: ViewStyle = {
  minWidth: sizes.touchTarget,  // 44
  minHeight: sizes.touchTarget, // 44,
  ...layoutStyles.center,
};
```

### 2. 颜色对比度
```typescript
// 确保文本和背景有足够的对比度
const accessibleTextStyle: TextStyle = {
  color: colors.text.primary,  // 高对比度文本色
  backgroundColor: colors.background.primary,
};
```

## 测试规范

### 1. 样式测试
```typescript
// 测试样式应用是否正确
it('should apply correct styles based on variant', () => {
  const { getByTestId } = render(
    <Button variant="primary" testID="button" />
  );
  
  const button = getByTestId('button');
  expect(button).toHaveStyle({
    backgroundColor: colors.primary[500],
  });
});
```

### 2. 响应式测试
```typescript
// 测试不同屏幕尺寸下的样式
it('should adapt to screen size', () => {
  // 模拟不同屏幕尺寸进行测试
});
```

## 错误处理

### 1. 样式回退
```typescript
// 提供样式回退机制
const getSafeStyle = (customStyle?: ViewStyle): ViewStyle => ({
  ...defaultStyle,
  ...customStyle,
});
```

### 2. 类型安全
```typescript
// 使用 TypeScript 确保样式类型安全
interface StyleProps {
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

// 严格的样式属性类型检查
const applyStyles = (styles: StyleProps) => {
  // 类型安全的样式应用
};
```

## 代码审查检查清单

### 样式规范检查
- [ ] 没有使用内联样式对象
- [ ] 使用了 `StyleSheet.create` 定义静态样式
- [ ] 动态样式使用 `useMemo` 进行缓存
- [ ] 样式变量命名规范（静态/动态分离）
- [ ] 导入了 `StyleSheet` 和必要的样式模块

### 性能优化检查
- [ ] 静态样式和动态样式正确分离
- [ ] `useMemo` 依赖数组精确且最小化
- [ ] 避免了不必要的样式重新计算
- [ ] 条件样式使用预定义对象
- [ ] 没有在渲染函数中创建样式对象

### 设计系统检查
- [ ] 使用了设计系统的颜色、间距、文本样式
- [ ] 支持主题和状态变化
- [ ] 满足可访问性要求（触摸目标、对比度）
- [ ] 响应式设计考虑

### 代码质量检查
- [ ] 有适当的 TypeScript 类型定义
- [ ] 代码结构清晰易读
- [ ] 组件文件结构符合规范
- [ ] 导入顺序正确
- [ ] 没有未使用的导入和变量

### 示例检查模板
```typescript
// ✅ 符合规范的组件结构
export const Component: React.FC<Props> = ({ variant, disabled }) => {
  // 动态样式缓存
  const containerStyle = useMemo((): ViewStyle => ({
    ...styles.container,
    ...(disabled && styles.disabled),
  }), [disabled]);

  return <View style={containerStyle}>{children}</View>;
};

// 静态样式定义
const styles = StyleSheet.create({
  container: { ... },
  disabled: { opacity: 0.6 },
});
```