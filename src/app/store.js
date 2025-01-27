import { configureStore } from '@reduxjs/toolkit';

import productReducer from '@features/products/productSlice';
import userReducer from '@features/users/userSlice';
import cartReducer from '@features/cart/cartSlice';
import orderReducer from '@features/orders/orderSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;
