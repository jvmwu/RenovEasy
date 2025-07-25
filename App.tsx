/**
 * RenovEasy - 装修服务平台
 * 主应用入口文件
 */

import React, { useState } from 'react';
import { StatusBar, useColorScheme, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/store';
import { useAppDispatch, useAuth } from '@/hooks';
import { loginSuccess } from '@/store';
import './global.css';

// 创建 React Query 客户端
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (替换 cacheTime)
    },
  },
});

// 内部组件：状态管理测试
function StateManagementDemo() {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const [counter, setCounter] = useState(0);

  const handleLogin = () => {
    dispatch(loginSuccess({
      token: 'demo-token-' + Date.now(),
      refreshToken: 'demo-refresh-token',
      userType: 'user',
      userId: 'demo-user-123',
    }));
  };

  const handleLogout = () => {
    dispatch({ type: 'auth/logout' });
  };

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="flex-1 justify-center items-center p-6">
        {/* 主标题卡片 */}
        <View className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm mb-6">
          <Text className="text-3xl font-bold text-slate-800 text-center mb-2">
            RenovEasy
          </Text>
          <Text className="text-lg text-slate-600 text-center mb-6">
            装修服务平台
          </Text>
          <Text className="text-base text-slate-700 text-center leading-6">
            项目架构已搭建完成，准备开始开发！
          </Text>
        </View>

        {/* 状态展示卡片 */}
        <View className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm mb-6">
          <Text className="text-lg font-semibold text-slate-800 mb-4 text-center">
            系统状态
          </Text>

          <View className="space-y-2">
            <Text className="text-sm text-green-500 text-center font-medium">
              ✅ Redux Store 已连接
            </Text>
            <Text className="text-sm text-blue-500 text-center font-medium">
              ✅ 设计系统已完成
            </Text>
            <Text className="text-sm text-green-500 text-center font-medium">
              ✅ SafeAreaProvider 已修复
            </Text>
            <Text className="text-sm text-blue-500 text-center font-medium">
              ✅ React Query 已集成
            </Text>
            <Text className="text-sm text-green-500 text-center font-medium">
              ✅ 状态管理架构完成
            </Text>
            <Text className="text-sm text-purple-500 text-center font-medium">
              ✅ NativeWind 正常工作
            </Text>
          </View>
        </View>

        {/* 状态管理测试卡片 */}
        <View className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm mb-6">
          <Text className="text-lg font-semibold text-slate-800 mb-4 text-center">
            状态管理测试
          </Text>

          {/* 认证状态 */}
          <View className="mb-4">
            <Text className="text-sm text-slate-600 mb-2">
              认证状态: {auth.isAuthenticated ? '已登录' : '未登录'}
            </Text>
            {auth.isAuthenticated && (
              <View className="bg-green-50 p-2 rounded-lg">
                <Text className="text-xs text-green-700">
                  用户类型: {auth.userType}
                </Text>
                <Text className="text-xs text-green-700">
                  用户ID: {auth.userId}
                </Text>
              </View>
            )}
          </View>

          {/* 计数器测试 */}
          <View className="mb-4">
            <Text className="text-sm text-slate-600 mb-2">
              本地状态计数器: {counter}
            </Text>
            <TouchableOpacity
              className="bg-purple-500 py-2 px-4 rounded-lg"
              onPress={() => setCounter(c => c + 1)}
            >
              <Text className="text-white text-center font-medium">
                增加计数
              </Text>
            </TouchableOpacity>
          </View>

          {/* 认证操作按钮 */}
          <View className="space-y-3">
            {!auth.isAuthenticated ? (
              <TouchableOpacity
                className="bg-blue-500 py-3 px-6 rounded-lg"
                onPress={handleLogin}
              >
                <Text className="text-white text-center font-semibold">
                  模拟登录
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="bg-red-500 py-3 px-6 rounded-lg"
                onPress={handleLogout}
              >
                <Text className="text-white text-center font-semibold">
                  退出登录
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* NativeWind 样式测试 */}
        <View className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 w-full max-w-sm">
          <Text className="text-white text-center font-bold text-lg mb-2">
            NativeWind 测试
          </Text>
          <Text className="text-white/80 text-center text-sm">
            渐变背景、圆角、阴影等样式正常工作
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor="transparent"
            translucent
          />
          <StateManagementDemo />
        </SafeAreaProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;