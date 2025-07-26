# 图标工具函数使用指南

## 概述

`iconUtils.ts` 提供了一系列工具函数，用于动态设置React图标组件的属性，特别是颜色和尺寸。这些工具函数可以在任何需要动态控制图标样式的组件中使用。

## 主要功能

### 1. `renderIconWithColor(icon, color)`
为图标设置颜色，最常用的函数。

```typescript
import { renderIconWithColor } from '@/utils/iconUtils';

// 在组件中使用
const MyComponent = () => {
  const iconColor = isActive ? colors.primary[500] : colors.neutral[500];
  
  return (
    <View>
      {renderIconWithColor(<HomeIcon />, iconColor)}
    </View>
  );
};
```

### 2. `renderIconWithSize(icon, size)`
为图标设置尺寸。

```typescript
import { renderIconWithSize } from '@/utils/iconUtils';

const MyButton = ({ size = 24 }) => {
  return (
    <TouchableOpacity>
      {renderIconWithSize(<StarIcon />, size)}
    </TouchableOpacity>
  );
};
```

### 3. `renderIconWithColorAndSize(icon, color, size)`
同时设置颜色和尺寸。

```typescript
import { renderIconWithColorAndSize } from '@/utils/iconUtils';

const StatusIcon = ({ status, size = 20 }) => {
  const color = status === 'success' ? colors.success[500] : colors.error[500];
  
  return renderIconWithColorAndSize(<CheckIcon />, color, size);
};
```

### 4. `renderIconWithProps(icon, props)`
设置任意属性的通用函数。

```typescript
import { renderIconWithProps } from '@/utils/iconUtils';

const CustomIcon = () => {
  return renderIconWithProps(<UserIcon />, {
    color: colors.primary[500],
    size: 24,
    strokeWidth: 2,
    opacity: 0.8
  });
};
```

## 使用场景

### 1. TabBar组件
```typescript
// 在TabBar中为不同状态的图标设置颜色
{renderIconWithColor(tab.icon, isActive ? activeColor : inactiveColor)}
```

### 2. Button组件
```typescript
// 在Button中根据状态设置图标颜色
const ButtonWithIcon = ({ variant, icon }) => {
  const iconColor = variant === 'primary' ? colors.white : colors.primary[500];
  
  return (
    <TouchableOpacity>
      {renderIconWithColor(icon, iconColor)}
      <Text>按钮文本</Text>
    </TouchableOpacity>
  );
};
```

### 3. NavigationBar组件
```typescript
// 在导航栏中设置图标颜色和尺寸
const NavButton = ({ icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {renderIconWithColorAndSize(icon, colors.text.primary, 24)}
    </TouchableOpacity>
  );
};
```

### 4. 状态指示器
```typescript
// 根据状态显示不同颜色的图标
const StatusIndicator = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return colors.success[500];
      case 'offline': return colors.neutral[400];
      case 'busy': return colors.warning[500];
      default: return colors.neutral[400];
    }
  };
  
  return renderIconWithColor(<CircleIcon />, getStatusColor(status));
};
```

## 兼容性

这些工具函数兼容以下类型的图标：

1. **React Native Vector Icons**: 支持color、size属性
2. **自定义SVG图标**: 支持color、width、height属性
3. **Expo Icons**: 支持color、size属性
4. **任何接受props的React组件**

## 注意事项

1. **图标组件必须支持相应属性**: 确保你的图标组件接受color、size等属性
2. **属性覆盖**: 工具函数传递的属性会覆盖图标组件的原有属性
3. **类型安全**: 如果图标不是React元素，函数会安全地返回原始值
4. **性能**: 这些函数使用React.cloneElement，在大量图标的情况下要注意性能

## 扩展

如果需要支持更多属性或特殊逻辑，可以扩展`renderIconWithProps`函数或创建新的专用函数。

```typescript
// 示例：为特定图标库创建专用函数
export function renderFeatherIcon(icon: React.ReactNode, props: {
  color?: string;
  size?: number;
  strokeWidth?: number;
}): React.ReactNode {
  return renderIconWithProps(icon, props);
}
```