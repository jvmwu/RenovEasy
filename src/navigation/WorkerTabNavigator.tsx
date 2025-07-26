import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { WorkerTabParamList } from './types';
import { createTabIconRenderer, getTabNavigatorStyles } from './navigationUtils';

const Tab = createBottomTabNavigator<WorkerTabParamList>();

// 临时屏幕组件
function WorkerHomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-slate-50">
      <Text className="text-2xl font-bold text-slate-800">装修工首页</Text>
      <Text className="text-base text-slate-600 mt-2">地图和接单</Text>
    </View>
  );
}

function WorkerOrdersScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-slate-50">
      <Text className="text-2xl font-bold text-slate-800">订单管理</Text>
      <Text className="text-base text-slate-600 mt-2">管理接单和进度</Text>
    </View>
  );
}

function WorkerProfileScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-slate-50">
      <Text className="text-2xl font-bold text-slate-800">个人中心</Text>
      <Text className="text-base text-slate-600 mt-2">资质和收入统计</Text>
    </View>
  );
}

// 创建装修工端图标渲染函数
const renderTabIcon = createTabIconRenderer('worker');

export function WorkerTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: renderTabIcon(route.name),
        ...getTabNavigatorStyles('#10B981'),
      })}
    >
      <Tab.Screen
        name="WorkerHome"
        component={WorkerHomeScreen}
        options={{
          title: '首页',
          headerTitle: '接单大厅',
        }}
      />
      <Tab.Screen
        name="WorkerOrders"
        component={WorkerOrdersScreen}
        options={{
          title: '订单',
          headerTitle: '订单管理',
        }}
      />
      <Tab.Screen
        name="WorkerProfile"
        component={WorkerProfileScreen}
        options={{
          title: '我的',
          headerTitle: '个人中心',
        }}
      />
    </Tab.Navigator>
  );
}