import React from 'react';
import { View, ViewStyle, ViewProps } from 'react-native';
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
  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: borderRadius.xl,
      padding: spacing[padding],
    };

    const variantStyles: Record<typeof variant, ViewStyle> = {
      default: {
        backgroundColor: colors.background.card,
        ...shadows.sm,
      },
      elevated: {
        backgroundColor: colors.background.card,
        ...shadows.lg,
      },
      outlined: {
        backgroundColor: colors.background.card,
        borderWidth: 1,
        borderColor: colors.border.primary,
      },
      filled: {
        backgroundColor: colors.background.secondary,
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
    };
  };

  return (
    <View style={[getCardStyle(), style]} {...props}>
      {children}
    </View>
  );
};