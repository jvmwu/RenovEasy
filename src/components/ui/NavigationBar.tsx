import React, { useMemo } from 'react';
import {
  Text,
  View,
  TextStyle,
  ViewStyle,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, layoutStyles, shadows, spacing, textStyles } from '@/styles';

export interface NavigationBarProps {
  title?: string;
  leftButton?: {
    icon?: React.ReactNode;
    text?: string;
    onPress: () => void;
  };
  rightButton?: {
    icon?: React.ReactNode;
    text?: string;
    onPress: () => void;
  };
  backgroundColor?: string;
  titleColor?: string;
  buttonColor?: string;
  translucent?: boolean;
  showShadow?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  title,
  leftButton,
  rightButton,
  backgroundColor = colors.background.primary,
  titleColor = colors.text.primary,
  buttonColor = colors.primary[500],
  translucent = false,
  showShadow = true,
  style,
  titleStyle,
}) => {

  const insets = useSafeAreaInsets();

  // 使用 useMemo 缓存动态样式计算
  const containerStyle = useMemo((): ViewStyle => ({
    ...styles.container,
    backgroundColor: translucent ? 'transparent' : backgroundColor,
    paddingTop: translucent ? 0 : insets.top,
    ...(showShadow && shadows.sm),
  }), [translucent, backgroundColor, insets.top, showShadow]);

  const buttonTextStyle = useMemo((): TextStyle => ({
    ...styles.buttonText,
    color: buttonColor,
  }), [buttonColor]);

  const titleTextStyle = useMemo((): TextStyle => ({
    ...styles.titleText,
    color: titleColor,
  }), [titleColor]);

  return (
    <>
      {!translucent && (
        <StatusBar
          barStyle={backgroundColor === colors.background.primary ? 'dark-content' : 'light-content'}
          backgroundColor={backgroundColor}
        />
      )}
      <View style={[containerStyle, style]}>
        <View style={styles.navbar}>
          {/* 左侧按钮 */}
          <View style={styles.leftButtonContainer}>
            {leftButton && (
              <TouchableOpacity
                style={styles.button}
                onPress={leftButton.onPress}
                activeOpacity={0.6}
              >
                {leftButton.icon ? (
                  leftButton.icon
                ) : (
                  <Text style={buttonTextStyle}>{leftButton.text}</Text>
                )}
              </TouchableOpacity>
            )}
          </View>

          {/* 标题 */}
          {title && (
            <Text style={[titleTextStyle, titleStyle]} numberOfLines={1}>
              {title}
            </Text>
          )}

          {/* 右侧按钮 */}
          <View style={styles.rightButtonContainer}>
            {rightButton && (
              <TouchableOpacity
                style={styles.button}
                onPress={rightButton.onPress}
                activeOpacity={0.6}
              >
                {rightButton.icon ? (
                  rightButton.icon
                ) : (
                  <Text style={buttonTextStyle}>{rightButton.text}</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );

};

// 静态样式定义
const styles = StyleSheet.create({
  // 导航栏容器
  container: {
    ...shadows.sm,
  },
  // 导航栏主体
  navbar: {
    height: 44,
    ...layoutStyles.row,
    ...layoutStyles.centerVertical,
    ...layoutStyles.spaceBetween,
    paddingHorizontal: spacing[4],
  },
  // 按钮样式
  button: {
    minWidth: 44,
    height: 44,
    ...layoutStyles.center,
  },
  // 按钮容器
  leftButtonContainer: {
    width: 80,
    ...layoutStyles.alignStart,
  },
  rightButtonContainer: {
    width: 80,
    ...layoutStyles.alignEnd,
  },
  // 按钮文本样式
  buttonText: {
    ...textStyles.button,
    fontSize: 17, // iOS 标准字体大小
  },
  // 标题样式
  titleText: {
    ...textStyles.navTitle,
    ...layoutStyles.flex1,
    fontSize: 17, // iOS 标准字体大小
    fontWeight: '600',
    textAlign: 'center',
  },
});
