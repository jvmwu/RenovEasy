import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { WorkerTabParamList } from './types';

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

// 图标组件（临时使用文字）
function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const iconMap: Record<string, string> = {
    WorkerHome: '🗺️',
    WorkerOrders: '📋',
    WorkerProfile: '👤',
  };

  return (
    <View className="items-center justify-center">
      <Text className={`text-lg ${focused ? 'opacity-100' : 'opacity-60'}`}>
        {iconMap[name] || '📱'}
      </Text>
    </View>
  );
}

export function WorkerTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabIcon name={route.name} focused={focused} />
        ),
        tabBarActiveTintColor: '#10B981',
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