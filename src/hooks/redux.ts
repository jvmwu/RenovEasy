import { 
  useDispatch, 
  useSelector, 
  TypedUseSelectorHook 
} from 'react-redux';
import type { RootState, AppDispatch } from '@/store';

// 使用类型化的 hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 认证相关 hooks
export const useAuth = () => {
  return useAppSelector((state) => state.auth);
};

export const useIsAuthenticated = () => {
  return useAppSelector((state) => state.auth.isAuthenticated);
};

export const useUserType = () => {
  return useAppSelector((state) => state.auth.user?.userType);
};

export const useUserId = () => {
  return useAppSelector((state) => state.auth.user?.id);
};

export const useCurrentUser = () => {
  return useAppSelector((state) => state.auth.user);
};

export const useAuthLoading = () => {
  return useAppSelector((state) => state.auth.loading);
};

export const useAuthError = () => {
  return useAppSelector((state) => state.auth.error);
};

// 便利的组合 hooks
export const useIsUser = () => {
  return useAppSelector((state) => state.auth.user?.userType === 'user');
};

export const useIsWorker = () => {
  return useAppSelector((state) => state.auth.user?.userType === 'worker');
};

// 用户相关 hooks
export const useUser = () => {
  return useAppSelector((state) => state.user);
};

export const useUserProfile = () => {
  return useAppSelector((state) => state.user.profile);
};

// 装修工相关 hooks
export const useWorker = () => {
  return useAppSelector((state) => state.worker);
};

export const useWorkerProfile = () => {
  return useAppSelector((state) => state.worker.profile);
};

export const useWorkerAvailability = () => {
  return useAppSelector((state) => state.worker.isAvailable);
};

// 订单相关 hooks
export const useOrders = () => {
  return useAppSelector((state) => state.order);
};

export const useCurrentOrder = () => {
  return useAppSelector((state) => state.order.currentOrder);
};

export const useOrderFilters = () => {
  return useAppSelector((state) => state.order.filters);
};
