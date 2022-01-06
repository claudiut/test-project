import { configureStore } from '@reduxjs/toolkit';

import checkoutReducer from 'src/features/checkout/slice';

export default configureStore({
  reducer: {
    checkout: checkoutReducer,
  },
});
