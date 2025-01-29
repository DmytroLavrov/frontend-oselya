import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { backendUrl } from '../../App';

export const signUp = createAsyncThunk('user/signUp', async (userData) => {
  const { data } = await axios.post(backendUrl + '/auth/register', userData);
  return data;
});

export const signIn = createAsyncThunk('user/signIn', async (userData) => {
  const { data } = await axios.post(backendUrl + '/auth/login', userData);
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
      Authorization: token,
    },
  });

  return data;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.patch(
        backendUrl + `/auth/edit/${userData.id}`,
        userData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return data;
    } catch (error) {
      // Якщо є помилка з email, повертаємо її для обробки в компоненті
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || 'An error occurred'
        );
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async ({ formData, userId }) => {
    const token = localStorage.getItem('token');

    const { data } = await axios.patch(
      backendUrl + `/auth/edit/avatar/${userId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      }
    );
    return data;
  }
);

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
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(updateAvatar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(updateAvatar.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.user.data);

export default userSlice.reducer;

export const { logout } = userSlice.actions;
