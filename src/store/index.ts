import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// 导入各个 slice
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import workerSlice from './slices/workerSlice';
import orderSlice from './slices/orderSlice';

// 导入 API
import { baseApi } from './api/baseApi';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    worker: workerSlice,
    order: orderSlice,
    // 添加 API reducer
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(baseApi.middleware),
});

// 启用 RTK Query 的 refetchOnFocus/refetchOnReconnect 行为
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * 导出 actions 以便在组件中使用
 */
// Auth actions
export { 
  loginUser, 
  registerUser, 
  logoutUser, 
  initializeAuth,
  updateToken, 
  updateUser, 
  clearError, 
  setLoading 
} from './slices/authSlice';

// User actions
export { 
  setLoading as setUserLoading, 
  setProfile as setUserProfile, 
  updateProfile as updateUserProfile, 
  setError as setUserError, 
  clearProfile as clearUserProfile 
} from './slices/userSlice';

// Worker actions
export { 
  setLoading as setWorkerLoading, 
  setProfile as setWorkerProfile, 
  updateProfile as updateWorkerProfile, 
  setAvailability, 
  setWorkRadius, 
  setError as setWorkerError, 
  clearProfile as clearWorkerProfile 
} from './slices/workerSlice';

// Order actions
export { 
  setLoading as setOrderLoading, 
  setOrders, 
  addOrder, 
  updateOrder, 
  removeOrder, 
  setCurrentOrder, 
  setFilters, 
  clearFilters, 
  setError as setOrderError, 
  clearOrders 
} from './slices/orderSlice';
