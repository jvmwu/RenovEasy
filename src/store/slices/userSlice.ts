import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '@/types';

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setProfile, updateProfile, setError, clearProfile } = userSlice.actions;
export default userSlice.reducer;
