import React, { useMemo } from 'react';
import {
  Text,
  View,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, layoutStyles, shadows, spacing, textStyles } from '@/styles';

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

  // 使用 useMemo 缓存动态样式计算
  const containerStyle = useMemo((): ViewStyle => ({
    ...styles.container,
    backgroundColor,
    paddingBottom: insets.bottom,
  }), [backgroundColor, insets.bottom]);

  const iconContainerStyle = useMemo((): ViewStyle => ({
    ...styles.iconContainer,
    marginBottom: showLabels ? spacing[0.5] : 0,
  }), [showLabels]);

  return (
    <View style={[containerStyle, style]}>
      <View style={styles.tabbar}>
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          const tabColor = isActive ? activeColor : inactiveColor;

          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
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
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {typeof tab.badge === 'number' && tab.badge > 99 ? '99+' : tab.badge}
                    </Text>
                  </View>
                )}
              </View>

              {/* 标签文本 */}
              {showLabels && (
                <Text style={[styles.labelText, { color: tabColor }]} numberOfLines={1}>
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

// 静态样式定义
const styles = StyleSheet.create({
  // 标签栏容器
  container: {
    ...shadows.lg,
  },
  // 标签栏主体
  tabbar: {
    ...layoutStyles.row,
    height: 49, // iOS 标准标签栏高度
    ...layoutStyles.centerVertical,
  },
  // 标签样式
  tab: {
    ...layoutStyles.flex1,
    ...layoutStyles.center,
    paddingVertical: spacing[1],
  },
  // 图标容器
  iconContainer: {
    ...layoutStyles.center,
  },
  // 标签文本
  labelText: {
    ...textStyles.tabLabel,
    fontSize: 10, // iOS 标准标签字体大小
  },
  // 徽章样式
  badge: {
    position: 'absolute',
    top: -2,
    right: -6,
    backgroundColor: colors.error[500],
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    ...layoutStyles.center,
    paddingHorizontal: 4,
  },
  // 徽章文本
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
});
