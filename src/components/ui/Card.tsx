import React, { useMemo } from 'react';
import { View, ViewStyle, ViewProps, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '@/styles';

export interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: keyof typeof spacing;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 4,
  children,
  style,
  ...props
}) => {

  // 使用 useMemo 缓存动态样式计算
  const cardStyle = useMemo((): ViewStyle => {
    const variantStyleMap = {
      default: styles.variantDefault,
      elevated: styles.variantElevated,
      outlined: styles.variantOutlined,
      filled: styles.variantFilled,
    };

    return {
      ...styles.container,
      padding: spacing[padding],
      ...variantStyleMap[variant],
    };
  }, [variant, padding]);

  return (
    <View style={[cardStyle, style]} {...props}>
      {children}
    </View>
  );

};

// 静态样式定义
const styles = StyleSheet.create({
  // 基础容器
  container: {
    borderRadius: borderRadius.xl,
  },
  // 变体样式
  variantDefault: {
    backgroundColor: colors.background.card,
    ...shadows.sm,
  },
  variantElevated: {
    backgroundColor: colors.background.card,
    ...shadows.lg,
  },
  variantOutlined: {
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  variantFilled: {
    backgroundColor: colors.background.secondary,
  },
});
