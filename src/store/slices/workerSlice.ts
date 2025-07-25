import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkerProfile } from '@/types';

interface WorkerState {
  profile: WorkerProfile | null;
  loading: boolean;
  error: string | null;
  isAvailable: boolean;
  workRadius: number;
}

const initialState: WorkerState = {
  profile: null,
  loading: false,
  error: null,
  isAvailable: true,
  workRadius: 10, // 默认10公里工作半径
};

const workerSlice = createSlice({
  name: 'worker',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setProfile: (state, action: PayloadAction<WorkerProfile>) => {
      state.profile = action.payload;
      state.isAvailable = action.payload.isAvailable;
      state.workRadius = action.payload.workRadius;
      state.loading = false;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<WorkerProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    setAvailability: (state, action: PayloadAction<boolean>) => {
      state.isAvailable = action.payload;
      if (state.profile) {
        state.profile.isAvailable = action.payload;
      }
    },
    setWorkRadius: (state, action: PayloadAction<number>) => {
      state.workRadius = action.payload;
      if (state.profile) {
        state.profile.workRadius = action.payload;
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
      state.isAvailable = true;
      state.workRadius = 10;
    },
  },
});

export const { 
  setLoading, 
  setProfile, 
  updateProfile, 
  setAvailability, 
  setWorkRadius, 
  setError, 
  clearProfile 
} = workerSlice.actions;
export default workerSlice.reducer;