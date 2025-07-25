import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { colors, textStyles, spacing, borderRadius, shadows } from '@/styles';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'base' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'base',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  onPress,
  ...props
}) => {
  const isDisabled = disabled || loading;

  // 获取按钮样式
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius.lg,
      ...shadows.sm,
    };

    // 尺寸样式
    const sizeStyles: Record<typeof size, ViewStyle> = {
      sm: {
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[2],
        minHeight: 36,
      },
      base: {
        paddingHorizontal: spacing[6],
        paddingVertical: spacing[3],
        minHeight: 44,
      },
      lg: {
        paddingHorizontal: spacing[8],
        paddingVertical: spacing[4],
        minHeight: 52,
      },
    };

    // 变体样式
    const variantStyles: Record<typeof variant, ViewStyle> = {
      primary: {
        backgroundColor: isDisabled ? colors.neutral[300] : colors.primary[500],
        borderWidth: 0,
      },
      secondary: {
        backgroundColor: isDisabled ? colors.neutral[100] : colors.secondary[100],
        borderWidth: 1,
        borderColor: isDisabled ? colors.neutral[200] : colors.secondary[300],
      },
      outline: {
        backgroundColor: colors.transparent,
        borderWidth: 1,
        borderColor: isDisabled ? colors.neutral[300] : colors.primary[500],
      },
      ghost: {
        backgroundColor: colors.transparent,
        borderWidth: 0,
      },
      danger: {
        backgroundColor: isDisabled ? colors.neutral[300] : colors.error[500],
        borderWidth: 0,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(fullWidth && { width: '100%' }),
      opacity: isDisabled ? 0.6 : 1,
    };
  };

  // 获取文本样式
  const getTextStyle = (): TextStyle => {
    const sizeStyles: Record<typeof size, TextStyle> = {
      sm: textStyles.buttonSmall,
      base: textStyles.button,
      lg: textStyles.buttonLarge,
    };

    const variantStyles: Record<typeof variant, TextStyle> = {
      primary: {
        color: colors.white,
      },
      secondary: {
        color: isDisabled ? colors.neutral[400] : colors.secondary[700],
      },
      outline: {
        color: isDisabled ? colors.neutral[400] : colors.primary[500],
      },
      ghost: {
        color: isDisabled ? colors.neutral[400] : colors.primary[500],
      },
      danger: {
        color: colors.white,
      },
    };

    return {
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const handlePress = (event: any) => {
    if (!isDisabled && onPress) {
      onPress(event);
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'danger' ? colors.white : colors.primary[500]}
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={[getTextStyle(), textStyle, leftIcon && { marginLeft: spacing[2] }, rightIcon && { marginRight: spacing[2] }]}>
            {title}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};