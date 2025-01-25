import { configureStore } from '@reduxjs/toolkit';

import productReducer from '@features/products/productSlice';
import userReducer from '@features/users/userSlice';
import cartReducer from '@features/cart/cartSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
