import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';

import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});