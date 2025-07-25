/**
 * RenovEasy - 装修服务平台
 * 主应用入口文件
 */

import React, { useState } from 'react';
import { StatusBar, useColorScheme, View, Text, ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from '@/store';
import { Button, Card, Input, NavigationBar } from '@/components';
import { colors, spacing } from '@/styles';
import './global.css'

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [inputValue, setInputValue] = useState('');

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        
        <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
          {/* 导航栏 */}
          <NavigationBar
            title="RenovEasy"
            leftButton={{
              text: '返回',
              onPress: () => console.log('返回'),
            }}
            rightButton={{
              text: '设置',
              onPress: () => console.log('设置'),
            }}
          />

          {/* 内容区域 */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              padding: spacing[4],
              gap: spacing[4],
            }}
          >
            {/* 欢迎卡片 */}
            <Card variant="elevated">
              <Text className="text-2xl font-bold text-slate-800 mb-2">RenovEasy</Text>
              <Text className="text-base text-slate-600 mb-4">装修服务平台</Text>
              <Text className="text-sm text-green-500 mb-2">✅ Redux Store 已连接</Text>
              <Text className="text-sm text-blue-500 mb-2">✅ NativeWind 已配置</Text>
              <Text className="text-sm text-purple-500">✅ UI 组件系统已完成</Text>
            </Card>

            {/* 按钮展示 */}
            <Card>
              <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: spacing[3], color: colors.text.primary }}>
                按钮组件
              </Text>
              <View style={{ gap: spacing[2] }}>
                <Button title="主要按钮" variant="primary" onPress={() => console.log('主要按钮')} />
                <Button title="次要按钮" variant="secondary" onPress={() => console.log('次要按钮')} />
                <Button title="轮廓按钮" variant="outline" onPress={() => console.log('轮廓按钮')} />
                <Button title="加载中..." variant="primary" loading onPress={() => {}} />
              </View>
            </Card>

            {/* 输入框展示 */}
            <Card>
              <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: spacing[3], color: colors.text.primary }}>
                输入框组件
              </Text>
              <View style={{ gap: spacing[3] }}>
                <Input
                  label="用户名"
                  placeholder="请输入用户名"
                  value={inputValue}
                  onChangeText={setInputValue}
                  required
                />
                <Input
                  label="密码"
                  placeholder="请输入密码"
                  secureTextEntry
                  variant="filled"
                />
                <Input
                  placeholder="搜索..."
                  variant="outline"
                  error="这是一个错误提示"
                />
              </View>
            </Card>

            {/* 状态信息 */}
            <Card variant="filled">
              <Text style={{ fontSize: 16, color: colors.text.secondary, textAlign: 'center' }}>
                设计系统和 UI 基础组件已完成！
              </Text>
            </Card>
          </ScrollView>
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;