import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderStatus } from '@/types';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  filters: {
    status?: OrderStatus;
    category?: string;
    minBudget?: number;
    maxBudget?: number;
    distance?: number;
  };
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  filters: {},
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    updateOrder: (state, action: PayloadAction<{ id: string; updates: Partial<Order> }>) => {
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = { ...state.orders[index], ...action.payload.updates };
      }
      if (state.currentOrder?.id === action.payload.id) {
        state.currentOrder = { ...state.currentOrder, ...action.payload.updates };
      }
    },
    removeOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
      if (state.currentOrder?.id === action.payload) {
        state.currentOrder = null;
      }
    },
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<OrderState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.currentOrder = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { 
  setLoading, 
  setOrders, 
  addOrder, 
  updateOrder, 
  removeOrder, 
  setCurrentOrder, 
  setFilters, 
  clearFilters, 
  setError, 
  clearOrders 
} = orderSlice.actions;
export default orderSlice.reducer;
