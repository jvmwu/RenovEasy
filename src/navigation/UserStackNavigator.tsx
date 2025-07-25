import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { UserStackParamList } from './types';
import { UserTabNavigator } from './UserTabNavigator';

const Stack = createStackNavigator<UserStackParamList>();

// 临时屏幕组件
function CreateOrderScreen({ route }: any) {
  const { location } = route.params || {};
  
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold text-slate-800 mb-4">
        创建订单
      </Text>
      <Text className="text-base text-slate-600 text-center">
        发布您的装修需求
      </Text>
      {location && (
        <View className="mt-4 p-4 bg-slate-100 rounded-lg">
          <Text className="text-sm text-slate-700">
            位置: {location.address}
          </Text>
        </View>
      )}
    </View>
  );
}

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
    </View>
  );
}

function WorkerDetailScreen({ route }: any) {
  const { workerId } = route.params;
  
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold text-slate-800 mb-4">
        装修工详情
      </Text>
      <Text className="text-base text-slate-600">
        装修工ID: {workerId}
      </Text>
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
    </View>
  );
}

export function UserStackNavigator() {
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
        headerBackTitleVisible: false,
        headerTintColor: '#3B82F6',
      }}
    >
      <Stack.Screen
        name="UserTabs"
        component={UserTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateOrder"
        component={CreateOrderScreen}
        options={{
          title: '发布需求',
          presentation: 'modal',
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
        name="WorkerDetail"
        component={WorkerDetailScreen}
        options={{
          title: '装修工详情',
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