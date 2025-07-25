import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, textStyles, spacing, shadows } from '@/styles';

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

  const containerStyle: ViewStyle = {
    backgroundColor: translucent ? 'transparent' : backgroundColor,
    paddingTop: translucent ? 0 : insets.top,
    ...(showShadow && shadows.sm),
  };

  const navBarStyle: ViewStyle = {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
  };

  const buttonStyle: ViewStyle = {
    minWidth: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const buttonTextStyle: TextStyle = {
    ...textStyles.button,
    color: buttonColor,
    fontSize: 17, // iOS 标准字体大小
  };

  const titleTextStyle: TextStyle = {
    ...textStyles.navTitle,
    color: titleColor,
    fontSize: 17, // iOS 标准字体大小
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  };

  return (
    <>
      {!translucent && (
        <StatusBar
          barStyle={backgroundColor === colors.background.primary ? 'dark-content' : 'light-content'}
          backgroundColor={backgroundColor}
        />
      )}
      <View style={[containerStyle, style]}>
        <View style={navBarStyle}>
          {/* 左侧按钮 */}
          <View style={{ width: 80, alignItems: 'flex-start' }}>
            {leftButton && (
              <TouchableOpacity
                style={buttonStyle}
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
          <View style={{ width: 80, alignItems: 'flex-end' }}>
            {rightButton && (
              <TouchableOpacity
                style={buttonStyle}
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