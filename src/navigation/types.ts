import { NavigatorScreenParams } from '@react-navigation/native';

// 认证导航参数
export type AuthStackParamList = {
  Welcome: undefined;
  PhoneInput: undefined;
  VerificationCode: {
    phone: string;
    type: 'register' | 'login';
  };
  UserTypeSelection: {
    phone: string;
    verificationCode: string;
  };
};

// 用户端标签导航参数
export type UserTabParamList = {
  UserHome: undefined;
  UserNearby: undefined;
  UserOrders: undefined;
  UserProfile: undefined;
};

// 装修工端标签导航参数
export type WorkerTabParamList = {
  WorkerHome: undefined;
  WorkerOrders: undefined;
  WorkerProfile: undefined;
};

// 用户端堆栈导航参数
export type UserStackParamList = {
  UserTabs: NavigatorScreenParams<UserTabParamList>;
  CreateOrder: {
    location?: {
      latitude: number;
      longitude: number;
      address: string;
    };
  };
  OrderDetail: {
    orderId: string;
  };
  WorkerDetail: {
    workerId: string;
  };
  Chat: {
    orderId: string;
    targetId: string;
    targetType: 'user' | 'worker';
  };
  Settings: undefined;
};

// 装修工端堆栈导航参数
export type WorkerStackParamList = {
  WorkerTabs: NavigatorScreenParams<WorkerTabParamList>;
  OrderDetail: {
    orderId: string;
  };
  Chat: {
    orderId: string;
    targetId: string;
    targetType: 'user' | 'worker';
  };
  Settings: undefined;
};

// 根导航参数
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  UserApp: NavigatorScreenParams<UserStackParamList>;
  WorkerApp: NavigatorScreenParams<WorkerStackParamList>;
};

// 导航 props 类型
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
