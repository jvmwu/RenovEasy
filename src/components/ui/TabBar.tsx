import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, textStyles, spacing, shadows } from '@/styles';

export interface TabItem {
  key: string;
  title: string;
  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  badge?: number | string;
}

export interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabKey: string) => void;
  backgroundColor?: string;
  activeColor?: string;
  inactiveColor?: string;
  showLabels?: boolean;
  style?: ViewStyle;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabPress,
  backgroundColor = colors.background.primary,
  activeColor = colors.primary[500],
  inactiveColor = colors.neutral[500],
  showLabels = true,
  style,
}) => {
  const insets = useSafeAreaInsets();

  const containerStyle: ViewStyle = {
    backgroundColor,
    paddingBottom: insets.bottom,
    ...shadows.lg,
  };

  const tabBarStyle: ViewStyle = {
    flexDirection: 'row',
    height: 49, // iOS 标准标签栏高度
    alignItems: 'center',
  };

  const tabStyle: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[1],
  };

  const iconContainerStyle: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: showLabels ? spacing[0.5] : 0,
  };

  const labelStyle: TextStyle = {
    ...textStyles.tabLabel,
    fontSize: 10, // iOS 标准标签字体大小
  };

  const badgeStyle: ViewStyle = {
    position: 'absolute',
    top: -2,
    right: -6,
    backgroundColor: colors.error[500],
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  };

  const badgeTextStyle: TextStyle = {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  };

  return (
    <View style={[containerStyle, style]}>
      <View style={tabBarStyle}>
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          const tabColor = isActive ? activeColor : inactiveColor;

          return (
            <TouchableOpacity
              key={tab.key}
              style={tabStyle}
              onPress={() => onTabPress(tab.key)}
              activeOpacity={0.6}
            >
              <View style={iconContainerStyle}>
                {/* 图标 */}
                {tab.icon && (
                  <View style={{ tintColor: tabColor }}>
                    {isActive && tab.activeIcon ? tab.activeIcon : tab.icon}
                  </View>
                )}

                {/* 徽章 */}
                {tab.badge && (
                  <View style={badgeStyle}>
                    <Text style={badgeTextStyle}>
                      {typeof tab.badge === 'number' && tab.badge > 99 ? '99+' : tab.badge}
                    </Text>
                  </View>
                )}
              </View>

              {/* 标签文本 */}
              {showLabels && (
                <Text style={[labelStyle, { color: tabColor }]} numberOfLines={1}>
                  {tab.title}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};