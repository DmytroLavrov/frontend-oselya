import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backendUrl } from '../../App';

export const fetchProductReviews = createAsyncThunk(
  'reviews/fetchProductReviews',
  async (productId) => {
    const { data } = await axios.get(`${backendUrl}/product/${productId}`);
    return data;
  }
);

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async ({ productId, rating, comment }) => {
    const { data } = await axios.post(
      `${backendUrl}`,
      { productId, rating, comment },
      {
        headers: {
          Authorization: window.localStorage.getItem('token'),
        },
      }
    );
    return data;
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId) => {
    const { data } = await axios.delete(`${backendUrl}/${reviewId}`, {
      headers: {
        Authorization: window.localStorage.getItem('token'),
      },
    });
    return data;
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    deleteStatus: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteReview.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded';
        state.items = state.items.filter(
          (review) => review._id !== action.payload.reviewId
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default reviewsSlice.reducer;
