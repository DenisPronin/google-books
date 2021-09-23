import { configureStore } from '@reduxjs/toolkit';
import searchForm from './modules/searchForm';
import books from './modules/books';

export const store = configureStore({
  reducer: {
    searchForm,
    books
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
