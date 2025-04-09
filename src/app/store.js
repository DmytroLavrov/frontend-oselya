import { configureStore } from '@reduxjs/toolkit';

import productReducer from '@features/products/productSlice';
import userReducer from '@features/users/userSlice';
import cartReducer from '@features/cart/cartSlice';
import ordersReducer from '@features/orders/ordersSlice';
import reviewsReducer from '@features/reviews/reviewsSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    orders: ordersReducer,
    reviews: reviewsReducer,
  },
});

export default store;
