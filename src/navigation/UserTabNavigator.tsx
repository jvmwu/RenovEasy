import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { UserTabParamList } from './types';

const Tab = createBottomTabNavigator<UserTabParamList>();

// 临时屏幕组件
function UserHomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-slate-50">
      <Text className="text-2xl font-bold text-slate-800">用户首页</Text>
      <Text className="text-base text-slate-600 mt-2">地图和发布需求</Text>
    </View>
  );
}

function UserNearbyScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-slate-50">
      <Text className="text-2xl font-bold text-slate-800">附近装修工</Text>
      <Text className="text-base text-slate-600 mt-2">查找附近的装修工</Text>
    </View>
  );
}

function UserOrdersScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-slate-50">
      <Text className="text-2xl font-bold text-slate-800">我的订单</Text>
      <Text className="text-base text-slate-600 mt-2">查看订单状态</Text>
    </View>
  );
}

function UserProfileScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-slate-50">
      <Text className="text-2xl font-bold text-slate-800">个人中心</Text>
      <Text className="text-base text-slate-600 mt-2">个人信息和设置</Text>
    </View>
  );
}

// 图标组件（临时使用文字）
function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const iconMap: Record<string, string> = {
    UserHome: '🏠',
    UserNearby: '👷',
    UserOrders: '📋',
    UserProfile: '👤',
  };

  return (
    <View className="items-center justify-center">
      <Text className={`text-lg ${focused ? 'opacity-100' : 'opacity-60'}`}>
        {iconMap[name] || '📱'}
      </Text>
    </View>
  );
}

export function UserTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabIcon name={route.name} focused={focused} />
        ),
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: '#1E293B',
        },
      })}
    >
      <Tab.Screen
        name="UserHome"
        component={UserHomeScreen}
        options={{
          title: '首页',
          headerTitle: 'RenovEasy',
        }}
      />
      <Tab.Screen
        name="UserNearby"
        component={UserNearbyScreen}
        options={{
          title: '附近',
          headerTitle: '附近装修工',
        }}
      />
      <Tab.Screen
        name="UserOrders"
        component={UserOrdersScreen}
        options={{
          title: '订单',
          headerTitle: '我的订单',
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          title: '我的',
          headerTitle: '个人中心',
        }}
      />
    </Tab.Navigator>
  );
}