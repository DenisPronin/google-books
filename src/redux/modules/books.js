import { createSlice } from '@reduxjs/toolkit';
import bookApi from '../../api/bookApi';

export const booksSlice = createSlice({
  name: 'books',
  
  initialState: {
    searchError: '',
    isLoading: false,
    books: [],
    total: 0
  },
  
  reducers: {
    setSearchError: (state, { payload }) => {
      state.searchError = payload;
    },
    
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  
    setBooks: (state, { payload }) => {
      state.books = payload;
    },
  
    setTotal: (state, { payload }) => {
      state.total = payload;
    }
  }
});

export const { setSearchError, setIsLoading, setBooks, setTotal } = booksSlice.actions;

export const getBooks = (
  searchQuery,
  category,
  sorting,
  startIndex = 0
) => async (dispatch, getState) => {
  try {
    if (searchQuery === '') {
      dispatch(setSearchError('Search query is required!'));
      return false;
    }
  
    dispatch(setIsLoading(true));
    if (startIndex === 0) {
      dispatch(setBooks([]));
    }
    
    const response = await bookApi.getBooksCollection(searchQuery, category, sorting, startIndex);
    
    if (response.items) {
      const { books } = getState().books;
      let booksArr = startIndex > 0 ? books : [];
      booksArr = booksArr.concat(response.items);
      dispatch(setBooks(booksArr));
    }
    
    dispatch(setTotal(response.totalItems));
    dispatch(setSearchError(''));
    dispatch(setIsLoading(false));
    
    return response;
  } catch (error) {
    dispatch(setSearchError('Something going wrong!'));
    dispatch(setIsLoading(false));
  }
}


export default booksSlice.reducer;
