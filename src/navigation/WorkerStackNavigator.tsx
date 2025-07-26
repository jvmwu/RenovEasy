import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { WorkerStackParamList } from './types';
import { WorkerTabNavigator } from './WorkerTabNavigator';

const Stack = createStackNavigator<WorkerStackParamList>();

// 临时屏幕组件
function OrderDetailScreen({ route }: any) {
  const { orderId } = route.params;
  
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold text-slate-800 mb-4">
        订单详情
      </Text>
      <Text className="text-base text-slate-600">
        订单ID: {orderId}
      </Text>
      <View className="mt-6 space-y-2">
        <Text className="text-sm text-slate-600">• 查看订单详细信息</Text>
        <Text className="text-sm text-slate-600">• 申请接单</Text>
        <Text className="text-sm text-slate-600">• 更新订单状态</Text>
        <Text className="text-sm text-slate-600">• 上传施工照片</Text>
      </View>
    </View>
  );
}

function ChatScreen({ route }: any) {
  const { orderId, targetId, targetType } = route.params;
  
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold text-slate-800 mb-4">
        聊天
      </Text>
      <Text className="text-base text-slate-600">
        订单: {orderId}
      </Text>
      <Text className="text-base text-slate-600">
        对方: {targetType} - {targetId}
      </Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold text-slate-800 mb-4">
        设置
      </Text>
      <Text className="text-base text-slate-600">
        应用设置和偏好
      </Text>
      <View className="mt-6 space-y-2">
        <Text className="text-sm text-slate-600">• 接单偏好设置</Text>
        <Text className="text-sm text-slate-600">• 服务范围设置</Text>
        <Text className="text-sm text-slate-600">• 通知设置</Text>
        <Text className="text-sm text-slate-600">• 账户管理</Text>
      </View>
    </View>
  );
}

export function WorkerStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
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
        headerTintColor: '#10B981',
      }}
    >
      <Stack.Screen
        name="WorkerTabs"
        component={WorkerTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{
          title: '订单详情',
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: '聊天',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: '设置',
        }}
      />
    </Stack.Navigator>
  );
}
