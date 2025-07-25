import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useCallback } from 'react';
import { 
  RootStackParamList, 
  AuthStackParamList, 
  UserStackParamList, 
  WorkerStackParamList,
  UserTabParamList,
  WorkerTabParamList 
} from './types';

// 根导航 Hook
export function useRootNavigation() {
  return useNavigation<StackNavigationProp<RootStackParamList>>();
}

// 认证导航 Hook
export function useAuthNavigation() {
  return useNavigation<StackNavigationProp<AuthStackParamList>>();
}

// 用户端导航 Hook
export function useUserNavigation() {
  return useNavigation<StackNavigationProp<UserStackParamList>>();
}

// 装修工端导航 Hook
export function useWorkerNavigation() {
  return useNavigation<StackNavigationProp<WorkerStackParamList>>();
}

// 用户端标签导航 Hook
export function useUserTabNavigation() {
  return useNavigation<BottomTabNavigationProp<UserTabParamList>>();
}

// 装修工端标签导航 Hook
export function useWorkerTabNavigation() {
  return useNavigation<BottomTabNavigationProp<WorkerTabParamList>>();
}

// 通用路由参数 Hook
export function useRouteParams<T = any>() {
  const route = useRoute();
  return route.params as T;
}

// 页面焦点状态 Hook
export function usePageFocus(callback: () => void, deps: any[] = []) {
  useFocusEffect(
    useCallback(() => {
      callback();
    }, deps)
  );
}

// 导航状态 Hook
export function useNavigationState() {
  const navigation = useNavigation();
  
  return {
    canGoBack: navigation.canGoBack(),
    isFocused: navigation.isFocused(),
    goBack: navigation.goBack,
    navigate: navigation.navigate,
    reset: navigation.reset,
  };
}

// 页面标题设置 Hook
export function usePageTitle(title: string) {
  const navigation = useNavigation();
  
  useCallback(() => {
    navigation.setOptions({ title });
  }, [navigation, title]);
}

// 导航监听 Hook
export function useNavigationListener(
  eventName: 'focus' | 'blur' | 'state' | 'beforeRemove',
  callback: (e: any) => void
) {
  const navigation = useNavigation();
  
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener(eventName, callback);
      return unsubscribe;
    }, [navigation, eventName, callback])
  );
}