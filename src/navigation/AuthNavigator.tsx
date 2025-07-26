import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { loginSuccess } from '@/store';
import { useAppDispatch } from '@/hooks';
import { storageService } from '@/services';
import { AuthStackParamList } from './types';

const Stack = createStackNavigator<AuthStackParamList>();

// 临时屏幕组件
function WelcomeScreen({ navigation }: any) {
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <View className="items-center mb-12">
        <Text className="text-4xl font-bold text-slate-800 mb-4">RenovEasy</Text>
        <Text className="text-lg text-slate-600 text-center">
          专业装修服务平台
        </Text>
        <Text className="text-base text-slate-500 text-center mt-2">
          连接用户与优质装修工
        </Text>
      </View>

      <View className="w-full max-w-sm space-y-4">
        <TouchableOpacity
          className="bg-blue-500 py-4 px-6 rounded-xl"
          onPress={() => navigation.navigate('PhoneInput')}
        >
          <Text className="text-white text-center font-semibold text-lg">
            手机号登录
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="py-4 px-6">
          <Text className="text-slate-600 text-center">
            微信登录（暂未开放）
          </Text>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-12 left-6 right-6">
        <Text className="text-xs text-slate-400 text-center">
          登录即表示同意《用户协议》和《隐私政策》
        </Text>
      </View>
    </View>
  );
}

function PhoneInputScreen({ navigation }: any) {
  return (
    <View className="flex-1 bg-white px-6 pt-12">
      <View className="mb-8">
        <Text className="text-2xl font-bold text-slate-800 mb-2">
          输入手机号
        </Text>
        <Text className="text-base text-slate-600">
          我们将发送验证码到您的手机
        </Text>
      </View>

      <View className="mb-8">
        <View className="border border-slate-300 rounded-xl px-4 py-4 mb-4">
          <Text className="text-base text-slate-800">
            +86 138 0013 8000 (示例)
          </Text>
        </View>

        <TouchableOpacity
          className="bg-blue-500 py-4 px-6 rounded-xl"
          onPress={() => navigation.navigate('VerificationCode', {
            phone: '+86 138 0013 8000',
            type: 'login'
          })}
        >
          <Text className="text-white text-center font-semibold text-lg">
            获取验证码
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-sm text-slate-500 text-center">
        未注册的手机号将自动创建账户
      </Text>
    </View>
  );
}

function VerificationCodeScreen({ navigation, route }: any) {
  
  const { phone, /* type */ } = route.params;

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      <View className="mb-8">
        <Text className="text-2xl font-bold text-slate-800 mb-2">
          输入验证码
        </Text>
        <Text className="text-base text-slate-600">
          验证码已发送至 {phone}
        </Text>
      </View>

      <View className="mb-8">
        <View className="flex-row justify-between mb-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <View
              key={index}
              className="w-12 h-12 border border-slate-300 rounded-lg justify-center items-center"
            >
              <Text className="text-xl font-semibold text-slate-800">
                {index <= 4 ? '8' : ''}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          className="bg-blue-500 py-4 px-6 rounded-xl"
          onPress={() => navigation.navigate('UserTypeSelection', {
            phone,
            verificationCode: '888888'
          })}
        >
          <Text className="text-white text-center font-semibold text-lg">
            验证并继续
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="py-2">
        <Text className="text-blue-500 text-center">
          重新发送验证码 (60s)
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function UserTypeSelectionScreen({ navigation: _navigation, route: _route }: any) {

  // const { phone, verificationCode } = route.params;
  const dispatch = useAppDispatch();

  const handleUserTypeSelect = async (userType: 'user' | 'worker') => {
    try {
      // 模拟登录 API 调用
      const mockLoginResponse = {
        token: `demo-token-${Date.now()}`,
        refreshToken: `demo-refresh-${Date.now()}`,
        userType,
        userId: `demo-${userType}-${Date.now()}`,
      };

      // 保存到本地存储
      await Promise.all([
        storageService.setAuthToken(mockLoginResponse.token),
        storageService.setRefreshToken(mockLoginResponse.refreshToken),
        storageService.setUserType(mockLoginResponse.userType),
        storageService.setUserId(mockLoginResponse.userId),
      ]);

      // 更新 Redux 状态
      dispatch(loginSuccess(mockLoginResponse));

      console.log('Login successful:', mockLoginResponse);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      <View className="mb-12">
        <Text className="text-2xl font-bold text-slate-800 mb-2">
          选择身份类型
        </Text>
        <Text className="text-base text-slate-600">
          请选择您的使用身份
        </Text>
      </View>

      <View className="space-y-4">
        <TouchableOpacity
          className="border-2 border-blue-500 rounded-xl p-6"
          onPress={() => handleUserTypeSelect('user')}
        >
          <View className="items-center">
            <Text className="text-4xl mb-3">🏠</Text>
            <Text className="text-xl font-semibold text-slate-800 mb-2">
              我是用户
            </Text>
            <Text className="text-sm text-slate-600 text-center">
              寻找装修服务，发布装修需求
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="border-2 border-green-500 rounded-xl p-6"
          onPress={() => handleUserTypeSelect('worker')}
        >
          <View className="items-center">
            <Text className="text-4xl mb-3">👷</Text>
            <Text className="text-xl font-semibold text-slate-800 mb-2">
              我是装修工
            </Text>
            <Text className="text-sm text-slate-600 text-center">
              提供装修服务，接收订单需求
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="mt-8">
        <Text className="text-xs text-slate-400 text-center">
          您可以在设置中随时更改身份类型
        </Text>
      </View>
    </View>
  );
}

export function AuthNavigator() {
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

        headerTintColor: '#3B82F6',
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PhoneInput"
        component={PhoneInputScreen}
        options={{
          title: '手机登录',
        }}
      />
      <Stack.Screen
        name="VerificationCode"
        component={VerificationCodeScreen}
        options={{
          title: '验证码',
        }}
      />
      <Stack.Screen
        name="UserTypeSelection"
        component={UserTypeSelectionScreen}
        options={{
          title: '选择身份',
          headerLeft: () => null, // 禁用返回按钮
        }}
      />
    </Stack.Navigator>
  );
}