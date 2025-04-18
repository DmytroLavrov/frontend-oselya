import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { backendUrl } from '../../App';

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (productData) => {
    const token = localStorage.getItem('token');

    const { data } = await axios.post(backendUrl + '/cart/add', productData, {
      headers: {
        Authorization: token,
      },
    });

    return data;
  }
);

export const getUserCart = createAsyncThunk('cart/getUserCart', async () => {
  const token = localStorage.getItem('token');

  const { data } = await axios.get(backendUrl + '/cart/get', {
    headers: {
      Authorization: token,
    },
  });

  return data;
});

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async (productData) => {
    const token = localStorage.getItem('token');

    const { data } = await axios.post(
      backendUrl + '/cart/update',
      productData,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return data;
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productData) => {
    const token = localStorage.getItem('token');

    const { data } = await axios.post(
      backendUrl + '/cart/delete',
      productData,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'loading',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.items = action.payload;
      })
      .addCase(getUserCart.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
        // state.items = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state) => {
        state.status = 'error';
        state.items = null;
      })
      .addCase(updateCart.pending, (state) => {
        state.status = 'loading';
        // state.items = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.items = action.payload;
      })
      .addCase(updateCart.rejected, (state) => {
        state.status = 'error';
        state.items = null;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.items = action.payload;
        // localStorage.getItem('token', action.payload.token);
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export default cartSlice.reducer;
