import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { backendUrl } from '../../App';

// Асинхронні дії для реєстрації та входу
export const signUp = createAsyncThunk('user/signUp', async (userData) => {
  // console.log('Sending sign up request with data:', userData);
  const { data } = await axios.post(backendUrl + '/auth/register', userData);
  // console.log('Response received:', data);
  return data;
});

export const signIn = createAsyncThunk('user/signIn', async (userData) => {
  // console.log('Sending sign in request with data:', userData);
  const { data } = await axios.post(backendUrl + '/auth/login', userData);
  // console.log('Response received:', data);
  return data;
});

export const getMe = createAsyncThunk('user/getMe', async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // throw new Error('No token found');
    return;
  }

  const { data } = await axios.get(backendUrl + '/auth/me', {
    headers: {
      // Authorization: `Bearer ${token}`,
      Authorization: token,
    },
  });

  // console.log(data);

  return data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: 'loading',
    data: null,
    // error: null,
  },
  reducers: {
    logout: (state) => {
      state.data = null;
      // localStorage.removeItem('token');
      localStorage.removeItem('selectedShipping');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
        // localStorage.setItem('token', JSON.stringify(action.payload));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signUp.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      })
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
        // localStorage.setItem('token', JSON.stringify(action.payload));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signIn.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      })
      .addCase(getMe.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(getMe.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.user.data);

export default userSlice.reducer;

export const { logout } = userSlice.actions;
