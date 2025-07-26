import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserTabParamList } from './types';
import { createTabIconRenderer, getTabNavigatorStyles } from './navigationUtils';

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

// 创建用户端图标渲染函数
const renderTabIcon = createTabIconRenderer('user');

export function UserTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: renderTabIcon(route.name),
        ...getTabNavigatorStyles('#3B82F6'),
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