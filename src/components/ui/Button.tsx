import React, { useMemo } from 'react';
import {
  Text,
  TextStyle,
  ViewStyle,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';
import { colors, layoutStyles, spacing, textStyles } from '@/styles';

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

  // 使用 useMemo 缓存动态样式计算
  const buttonStyle = useMemo((): ViewStyle => {
    const sizeStyleMap = {
      sm: styles.sizeSmall,
      base: styles.sizeBase,
      lg: styles.sizeLarge,
    };

    const variantStyleMap = {
      primary: styles.primaryBase,
      secondary: styles.secondaryBase,
      outline: styles.outlineBase,
      ghost: styles.ghostBase,
      danger: styles.dangerBase,
    };

    // 基础样式合并
    let computedStyle: ViewStyle = {
      ...styles.container,
      ...sizeStyleMap[size],
      ...variantStyleMap[variant],
    };

    // 动态颜色样式
    switch (variant) {
      case 'primary':
        computedStyle.backgroundColor = isDisabled ? colors.neutral[300] : colors.primary[500];
        break;
      case 'secondary':
        computedStyle.backgroundColor = isDisabled ? colors.neutral[100] : colors.secondary[100];
        computedStyle.borderColor = isDisabled ? colors.neutral[200] : colors.secondary[300];
        break;
      case 'outline':
        computedStyle.borderColor = isDisabled ? colors.neutral[300] : colors.primary[500];
        break;
      case 'danger':
        computedStyle.backgroundColor = isDisabled ? colors.neutral[300] : colors.error[500];
        break;
    }

    // 条件样式
    if (fullWidth) {
      computedStyle = { ...computedStyle, ...layoutStyles.fullWidth };
    }

    if (isDisabled) {
      computedStyle.opacity = 0.6;
    }

    return computedStyle;
  }, [variant, size, isDisabled, fullWidth]);

  // 文本样式缓存
  const computedTextStyle = useMemo((): TextStyle => {
    const sizeTextStyleMap = {
      sm: textStyles.buttonSmall,
      base: textStyles.button,
      lg: textStyles.buttonLarge,
    };

    let textColor: string;
    switch (variant) {
      case 'primary':
      case 'danger':
        textColor = colors.white;
        break;
      case 'secondary':
        textColor = isDisabled ? colors.neutral[400] : colors.secondary[700];
        break;
      case 'outline':
      case 'ghost':
        textColor = isDisabled ? colors.neutral[400] : colors.primary[500];
        break;
      default:
        textColor = colors.primary[500];
    }

    let computedStyle: TextStyle = {
      ...sizeTextStyleMap[size],
      color: textColor,
    };

    // 图标间距
    if (leftIcon) {
      computedStyle = { ...computedStyle, ...styles.textWithLeftIcon };
    }
    if (rightIcon) {
      computedStyle = { ...computedStyle, ...styles.textWithRightIcon };
    }

    return computedStyle;
  }, [variant, size, isDisabled, leftIcon, rightIcon]);

  const handlePress = (event: any) => {
    if (!isDisabled && onPress) {
      onPress(event);
    }
  };

  const spinnerColor = variant === 'primary' || variant === 'danger' 
    ? colors.white 
    : colors.primary[500];

  return (
    <TouchableOpacity
      style={[buttonStyle, style]}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor} />
      ) : (
        <>
          {leftIcon}
          <Text style={[computedTextStyle, textStyle]}>
            {title}
          </Text>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
};

// 静态样式定义
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  // 尺寸样式
  sizeSmall: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    minHeight: 36,
  },
  sizeBase: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
    minHeight: 44,
  },
  sizeLarge: {
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[4],
    minHeight: 52,
  },
  // 基础变体样式
  primaryBase: {
    borderWidth: 0,
  },
  secondaryBase: {
    borderWidth: 1,
  },
  outlineBase: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
  },
  ghostBase: {
    backgroundColor: colors.transparent,
    borderWidth: 0,
  },
  dangerBase: {
    borderWidth: 0,
  },
  // 文本样式
  textWithLeftIcon: {
    marginLeft: spacing[2],
  },
  textWithRightIcon: {
    marginRight: spacing[2],
  },
});
