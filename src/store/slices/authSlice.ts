import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthUser, LoginRequest, RegisterRequest } from '@/types/auth';
import { storageService } from '@/services/storage';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  refreshToken: null,
  loading: false,
  error: null,
};

// 异步 thunk actions
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      // 这里应该调用实际的API，暂时使用模拟数据
      const response = {
        user: {
          id: '1',
          phone: credentials.phone,
          name: '测试用户',
          userType: credentials.userType || 'user',
          status: 'active' as const,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as AuthUser,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
      };

      // 保存到本地存储
      await storageService.setUserData(response.user);
      await storageService.setAuthToken(response.token);
      await storageService.setRefreshToken(response.refreshToken);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || '登录失败');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      // 这里应该调用实际的API，暂时使用模拟数据
      const response = {
        user: {
          id: '1',
          phone: userData.phone,
          name: userData.name || '新用户',
          userType: userData.userType,
          status: 'active' as const,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as AuthUser,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
      };

      // 保存到本地存储
      await storageService.setUserData(response.user);
      await storageService.setAuthToken(response.token);
      await storageService.setRefreshToken(response.refreshToken);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || '注册失败');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // 清除本地存储
      await storageService.clearAuthData();
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || '登出失败');
    }
  }
);

export const initializeAuth = createAsyncThunk(
  'auth/initializeAuth',
  async (_, { rejectWithValue }) => {
    try {
      const user = await storageService.getUserData();
      const token = await storageService.getAuthToken();
      if (token && user) {
        return {
          user,
          token,
          refreshToken: await storageService.getRefreshToken(),
        };
      }
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || '初始化认证失败');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 更新token
    updateToken: (state, action: PayloadAction<{
      token: string;
      refreshToken?: string;
    }>) => {
      state.token = action.payload.token;
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
      }
    },
    // 更新用户信息
    updateUser: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    // 清除错误
    clearError: (state) => {
      state.error = null;
    },
    // 设置加载状态
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    //TODO: 直接设置登录成功状态（用于模拟登录, 后期删除）
    loginSuccess: (state, action: PayloadAction<{
      token: string;
      refreshToken: string;
      userType: 'user' | 'worker';
      userId: string;
    }>) => {
      state.isAuthenticated = true;
      state.user = {
        id: action.payload.userId,
        phone: '', // 可以从其他地方获取
        name: action.payload.userType === 'user' ? '用户' : '装修工',
        userType: action.payload.userType,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // 登录
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.loading = false;
        state.error = action.payload as string;
      });

    // 注册
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.loading = false;
        state.error = action.payload as string;
      });

    // 登出
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        // 即使登出失败，也清除本地状态
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.loading = false;
        state.error = action.payload as string;
      });

    // 初始化认证
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  updateToken, 
  updateUser,
  clearError,
  setLoading,
  loginSuccess
} = authSlice.actions;

export default authSlice.reducer;
