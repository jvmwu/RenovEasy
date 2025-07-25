import React, { useState, forwardRef } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { colors, textStyles, spacing, borderRadius } from '@/styles';

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

  // 获取容器样式
  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: borderRadius.lg,
    };

    const sizeStyles: Record<typeof size, ViewStyle> = {
      sm: {
        minHeight: 36,
        paddingHorizontal: spacing[3],
      },
      base: {
        minHeight: 44,
        paddingHorizontal: spacing[4],
      },
      lg: {
        minHeight: 52,
        paddingHorizontal: spacing[5],
      },
    };

    const variantStyles: Record<typeof variant, ViewStyle> = {
      default: {
        backgroundColor: colors.background.primary,
        borderBottomWidth: 1,
        borderBottomColor: error ? colors.error[500] : isFocused ? colors.primary[500] : colors.border.primary,
        borderRadius: 0,
      },
      filled: {
        backgroundColor: colors.background.secondary,
        borderWidth: 1,
        borderColor: error ? colors.error[500] : isFocused ? colors.primary[500] : colors.transparent,
      },
      outline: {
        backgroundColor: colors.background.primary,
        borderWidth: 1,
        borderColor: error ? colors.error[500] : isFocused ? colors.primary[500] : colors.border.primary,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      opacity: disabled ? 0.6 : 1,
    };
  };

  // 获取输入框样式
  const getInputStyle = (): TextStyle => {
    const sizeStyles: Record<typeof size, TextStyle> = {
      sm: {
        ...textStyles.body2,
      },
      base: {
        ...textStyles.input,
      },
      lg: {
        ...textStyles.body1,
      },
    };

    return {
      flex: 1,
      color: disabled ? colors.text.disabled : colors.text.primary,
      ...sizeStyles[size],
      ...(leftIcon && { marginLeft: spacing[2] }),
      ...(rightIcon && { marginRight: spacing[2] }),
    };
  };

  return (
    <View style={containerStyle}>
      {/* 标签 */}
      {label && (
        <View style={{ flexDirection: 'row', marginBottom: spacing[1] }}>
          <Text style={[textStyles.inputLabel, { color: colors.text.secondary }, labelStyle]}>
            {label}
          </Text>
          {required && (
            <Text style={[textStyles.inputLabel, { color: colors.error[500], marginLeft: spacing[0.5] }]}>
              *
            </Text>
          )}
        </View>
      )}

      {/* 输入框容器 */}
      <View style={getContainerStyle()}>
        {/* 左侧图标 */}
        {leftIcon && (
          <View style={{ marginRight: spacing[2] }}>
            {leftIcon}
          </View>
        )}

        {/* 输入框 */}
        <TextInput
          ref={ref}
          style={[getInputStyle(), inputStyle]}
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
            style={{ marginLeft: spacing[2] }}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {/* 错误信息或帮助文本 */}
      {(error || helperText) && (
        <Text
          style={[
            textStyles.inputHelper,
            {
              color: error ? colors.error[500] : colors.text.tertiary,
              marginTop: spacing[1],
            },
          ]}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
});