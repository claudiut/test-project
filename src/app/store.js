import { configureStore } from '@reduxjs/toolkit';

import cartReducer from 'src/features/cart/slice';

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
