import { configureStore } from '@reduxjs/toolkit';

import cartReducer from 'src/features/cart/slice';

export const store = configureStore({
  reducer: {
    cart: cartReducer
  },
});
