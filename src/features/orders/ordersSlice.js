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
    return data.newOrder;
  }
);

export const getOrdersByUser = createAsyncThunk(
  'order/getOrdersByUser',
  async (orderData) => {
    const token = localStorage.getItem('token');

    const { data } = await axios.post(backendUrl + '/orders/user', orderData, {
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
    latestOrder: null,
    status: 'loading',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.latestOrder = action.payload;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(getOrdersByUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOrdersByUser.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.orderItems = action.payload;
      })
      .addCase(getOrdersByUser.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export default orderSlice.reducer;
export const selectLatestOrder = (state) => state.order.latestOrder;
