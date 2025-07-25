/**
 * RenovEasy - 装修服务平台
 * 主应用入口文件
 */

import React from 'react';
import { StatusBar, useColorScheme, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@/store';
import './global.css'

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <View className="flex-1 bg-slate-50">
        <View className="flex-1 justify-center items-center px-5">
          <Text className="text-3xl font-bold text-slate-800 mb-2">RenovEasy</Text>
          <Text className="text-lg text-slate-600 mb-6">装修服务平台</Text>
          <Text className="text-base text-slate-700 text-center leading-6">
            项目架构已搭建完成，准备开始开发！
          </Text>
          <Text className="text-sm text-green-500 text-center mt-4 font-medium">
            ✅ Redux Store 已连接
          </Text>
          <Text className="text-sm text-blue-500 text-center mt-2 font-medium">
            ✅ NativeWind 已配置
          </Text>
        </View>
      </View>
    </Provider>
  );
}



export default App;