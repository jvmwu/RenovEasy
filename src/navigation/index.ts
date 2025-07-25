// 导航系统统一导出

// 导航器组件
export { RootNavigator } from './RootNavigator';
export { AuthNavigator } from './AuthNavigator';
export { UserStackNavigator } from './UserStackNavigator';
export { WorkerStackNavigator } from './WorkerStackNavigator';
export { UserTabNavigator } from './UserTabNavigator';
export { WorkerTabNavigator } from './WorkerTabNavigator';

// 类型定义
export type {
  RootStackParamList,
  AuthStackParamList,
  UserStackParamList,
  WorkerStackParamList,
  UserTabParamList,
  WorkerTabParamList,
} from './types';

// 导航工具
export { NavigationUtils, NavigationGuards, TransitionPresets } from './navigationUtils';
export { navigationRef } from './navigationUtils';

// 导航 Hooks
export {
  useRootNavigation,
  useAuthNavigation,
  useUserNavigation,
  useWorkerNavigation,
  useUserTabNavigation,
  useWorkerTabNavigation,
  useRouteParams,
  usePageFocus,
  useNavigationState,
  usePageTitle,
  useNavigationListener,
} from './hooks';