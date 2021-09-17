import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './modules/counter';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})
