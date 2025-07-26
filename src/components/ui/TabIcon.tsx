import React from 'react';
import { StyleSheet, Text } from 'react-native';

// Props 接口定义
export interface TabIconProps {
  name: string;
  focused: boolean;
  iconMap: Record<string, string>;
}

// 通用图标组件
export const TabIcon: React.FC<TabIconProps> = ({
  name, 
  focused, 
  iconMap 
}) => (
  <Text style={focused ? styles.focusedIcon : styles.unfocusedIcon}>
    {iconMap[name] || '📱'}
  </Text>
);
 
 // 样式定义
 const styles = StyleSheet.create({
   focusedIcon: {
      fontSize: 18,
      opacity: 1,
      textAlign: 'center',
    },
    unfocusedIcon: {
      fontSize: 18,
      opacity: 0.6,
      textAlign: 'center',
    },
 });
 