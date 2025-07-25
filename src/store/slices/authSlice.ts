import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@/types';

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  userType: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{
      token: string;
      refreshToken: string;
      userType: 'user' | 'worker';
      userId: string;
    }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.userType = action.payload.userType;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.userType = null;
      state.userId = null;
    },
    updateToken: (state, action: PayloadAction<{
      token: string;
      refreshToken?: string;
    }>) => {
      state.token = action.payload.token;
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
      }
    },
    setUserType: (state, action: PayloadAction<'user' | 'worker'>) => {
      state.userType = action.payload;
    },
  },
});

export const { loginSuccess, logout, updateToken, setUserType } = authSlice.actions;
export default authSlice.reducer;