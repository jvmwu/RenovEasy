import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// TODO: 导入各个 slice
// import authSlice from './slices/authSlice';
// import userSlice from './slices/userSlice';
// import workerSlice from './slices/workerSlice';
// import orderSlice from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    // TODO: 添加 reducers
    // auth: authSlice,
    // user: userSlice,
    // worker: workerSlice,
    // order: orderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// 启用 RTK Query 的 refetchOnFocus/refetchOnReconnect 行为
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;