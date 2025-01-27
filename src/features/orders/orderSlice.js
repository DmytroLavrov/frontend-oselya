import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { backendUrl } from '../../App';

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderData) => {
    const token = localStorage.getItem('token');
    const { data } = await axios.post(backendUrl + '/orders/place', orderData, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderItems: [],
    status: 'loading',
    // totalQuantity: 0,
    // totalPrice: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.orderItems = action.payload;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export default orderSlice.reducer;
