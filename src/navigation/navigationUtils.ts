import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './types';

// 导航引用，用于在组件外部进行导航
export const navigationRef = React.createRef<NavigationContainerRef<RootStackParamList>>();

// 导航工具函数
export const NavigationUtils = {
  // 导航到指定路由
  navigate: (name: keyof RootStackParamList, params?: any) => {
    navigationRef.current?.navigate(name, params);
  },

  // 返回上一页
  goBack: () => {
    navigationRef.current?.goBack();
  },

  // 重置导航栈
  reset: (routeName: keyof RootStackParamList, params?: any) => {
    navigationRef.current?.reset({
      index: 0,
      routes: [{ name: routeName as never, params: params as never }],
    });
  },

  // 获取当前路由名称
  getCurrentRouteName: () => {
    return navigationRef.current?.getCurrentRoute()?.name;
  },

  // 检查是否可以返回
  canGoBack: () => {
    return navigationRef.current?.canGoBack() ?? false;
  },
};

// 导航守卫配置
export const NavigationGuards = {
  // 需要认证的路由
  protectedRoutes: ['UserApp', 'WorkerApp'],

  // 仅限未认证用户的路由
  guestOnlyRoutes: ['Auth'],

  // 检查路由访问权限
  canAccess: (routeName: string, isAuthenticated: boolean) => {
    if (NavigationGuards.protectedRoutes.includes(routeName)) {
      return isAuthenticated;
    }
    if (NavigationGuards.guestOnlyRoutes.includes(routeName)) {
      return !isAuthenticated;
    }
    return true;
  },
};

// 页面转场动画配置
export const TransitionPresets = {
  // iOS 风格水平滑动
  slideFromRight: {
    gestureDirection: 'horizontal' as const,
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {
          duration: 300,
        },
      },
      close: {
        animation: 'timing',
        config: {
          duration: 300,
        },
      },
    },
    cardStyleInterpolator: ({ current, layouts }: any) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  },

  // 模态框从底部弹出
  modalFromBottom: {
    gestureDirection: 'vertical' as const,
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {
          duration: 300,
        },
      },
      close: {
        animation: 'timing',
        config: {
          duration: 300,
        },
      },
    },
    cardStyleInterpolator: ({ current, layouts }: any) => {
      return {
        cardStyle: {
          transform: [
            {
              translateY: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.height, 0],
              }),
            },
          ],
        },
      };
    },
  },

  // 淡入淡出
  fadeInOut: {
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {
          duration: 200,
        },
      },
      close: {
        animation: 'timing',
        config: {
          duration: 200,
        },
      },
    },
    cardStyleInterpolator: ({ current }: any) => {
      return {
        cardStyle: {
          opacity: current.progress,
        },
      };
    },
  },
};
