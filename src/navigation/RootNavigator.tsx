import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { loginSuccess } from '@/store';
import { storageService } from '@/services';
import { RootStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { navigationRef } from './navigationUtils';
import { UserStackNavigator } from './UserStackNavigator';
import { WorkerStackNavigator } from './WorkerStackNavigator';
import { useAuth, useAppDispatch } from '@/hooks';

const Stack = createStackNavigator<RootStackParamList>();

// 启动屏幕
function SplashScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-blue-500">
      <Text className="text-4xl font-bold text-white mb-4">RenovEasy</Text>
      <Text className="text-lg text-white/80">装修服务平台</Text>
      <View className="mt-8">
        <View className="w-8 h-8 bg-white/30 rounded-full animate-pulse" />
      </View>
    </View>
  );
}

// 导航守卫组件
function NavigationGuard({ children }: { children: React.ReactNode }) {

  const dispatch = useAppDispatch();
  const auth = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // 检查本地存储的认证信息
    const checkAuthStatus = async () => {
      try {
        const [token, refreshToken, userType, userId] = await Promise.all([
          storageService.getAuthToken(),
          storageService.getRefreshToken(),
          storageService.getUserType(),
          storageService.getUserId(),
        ]);

        if (token && userType && userId) {
          // 恢复认证状态
          dispatch(loginSuccess({
            token,
            refreshToken: refreshToken || '',
            userType,
            userId,
          }));
        }
      } catch (error) {
        console.error('Failed to restore auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}

// 根导航器
function RootStackNavigator() {
  const auth = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // 添加页面转场动画
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      {!auth.isAuthenticated ? (
        // 未认证状态 - 显示认证流程
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{
            animationTypeForReplace: 'pop',
          }}
        />
      ) : auth.user?.userType === 'user' ? (
        // 用户端应用
        <Stack.Screen
          name="UserApp"
          component={UserStackNavigator}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      ) : (
        // 装修工端应用
        <Stack.Screen
          name="WorkerApp"
          component={WorkerStackNavigator}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      )}
    </Stack.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <NavigationGuard>
        <RootStackNavigator />
      </NavigationGuard>
    </NavigationContainer>
  );
}
