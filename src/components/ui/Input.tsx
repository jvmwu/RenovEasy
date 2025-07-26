import React, { useState, forwardRef, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TextStyle,
  ViewStyle,
  StyleSheet,
  TextInputProps,
  TouchableOpacity
} from 'react-native';
import { colors, textStyles, spacing, borderRadius, layoutStyles } from '@/styles';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  size?: 'sm' | 'base' | 'lg';
  variant?: 'default' | 'filled' | 'outline';
  disabled?: boolean;
  required?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

export const Input = forwardRef<TextInput, InputProps>(({
  label,
  placeholder,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  size = 'base',
  variant = 'outline',
  disabled = false,
  required = false,
  containerStyle,
  inputStyle,
  labelStyle,
  value,
  onChangeText,
  onFocus,
  onBlur,
  ...props
}, ref) => {

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  // 使用 useMemo 缓存动态样式计算
  const computedContainerStyle = useMemo((): ViewStyle => {
    const sizeStyleMap = {
      sm: styles.sizeSmall,
      base: styles.sizeBase,
      lg: styles.sizeLarge,
    };

    const variantStyleMap = {
      default: styles.variantDefault,
      filled: styles.variantFilled,
      outline: styles.variantOutline,
    };

    let computedStyle: ViewStyle = {
      ...styles.container,
      ...sizeStyleMap[size],
      ...variantStyleMap[variant],
    };

    // 动态边框颜色
    const borderColor = error ? colors.error[500] : isFocused ? colors.primary[500] : colors.border.primary;
    
    switch (variant) {
      case 'default':
        computedStyle.borderBottomColor = borderColor;
        break;
      case 'filled':
        computedStyle.borderColor = error ? colors.error[500] : isFocused ? colors.primary[500] : colors.transparent;
        break;
      case 'outline':
        computedStyle.borderColor = borderColor;
        break;
    }

    if (disabled) {
      computedStyle.opacity = 0.6;
    }

    return computedStyle;
  }, [size, variant, error, isFocused, disabled]);

  // 输入框样式缓存
  const computedInputStyle = useMemo((): TextStyle => {
    const sizeTextStyleMap = {
      sm: textStyles.body2,
      base: textStyles.input,
      lg: textStyles.body1,
    };

    let computedStyle: TextStyle = {
      ...styles.input,
      ...sizeTextStyleMap[size],
      color: disabled ? colors.text.disabled : colors.text.primary,
    };

    // 图标间距
    if (leftIcon) {
      computedStyle = { ...computedStyle, ...styles.inputWithLeftIcon };
    }
    if (rightIcon) {
      computedStyle = { ...computedStyle, ...styles.inputWithRightIcon };
    }

    return computedStyle;
  }, [size, disabled, leftIcon, rightIcon]);

  // 帮助文本样式缓存
  const helperTextStyle = useMemo((): TextStyle => ({
    ...styles.helperText,
    color: error ? colors.error[500] : colors.text.tertiary,
  }), [error]);

  return (
    <View style={containerStyle}>
      {/* 标签 */}
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[textStyles.inputLabel, styles.labelText, labelStyle]}>
            {label}
          </Text>
          {required && (
            <Text style={[textStyles.inputLabel, styles.requiredMark]}>
              *
            </Text>
          )}
        </View>
      )}

      {/* 输入框容器 */}
      <View style={computedContainerStyle}>
        {/* 左侧图标 */}
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}

        {/* 输入框 */}
        <TextInput
          ref={ref}
          style={[computedInputStyle, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={colors.text.placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled}
          {...props}
        />

        {/* 右侧图标 */}
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            style={styles.rightIconContainer}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {/* 错误信息或帮助文本 */}
      {(error || helperText) && (
        <Text style={[textStyles.inputHelper, helperTextStyle]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
});

// 静态样式定义
const styles = StyleSheet.create({
  container: {
    ...layoutStyles.row,
    ...layoutStyles.centerVertical,
    borderRadius: borderRadius.lg,
  },
  // 尺寸样式
  sizeSmall: {
    minHeight: 36,
    paddingHorizontal: spacing[3],
  },
  sizeBase: {
    minHeight: 44,
    paddingHorizontal: spacing[4],
  },
  sizeLarge: {
    minHeight: 52,
    paddingHorizontal: spacing[5],
  },
  // 变体样式
  variantDefault: {
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderRadius: 0,
  },
  variantFilled: {
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
  },
  variantOutline: {
    backgroundColor: colors.background.primary,
    borderWidth: 1,
  },
  // 输入框样式
  input: {
    flex: 1,
  },
  inputWithLeftIcon: {
    marginLeft: spacing[2],
  },
  inputWithRightIcon: {
    marginRight: spacing[2],
  },
  // 标签样式
  labelContainer: {
    ...layoutStyles.row,
    marginBottom: spacing[1],
  },
  labelText: {
    color: colors.text.secondary,
  },
  requiredMark: {
    color: colors.error[500],
    marginLeft: spacing[0.5],
  },
  // 图标容器样式
  leftIconContainer: {
    marginRight: spacing[2],
  },
  rightIconContainer: {
    marginLeft: spacing[2],
  },
  // 帮助文本样式
  helperText: {
    marginTop: spacing[1],
  },
});
