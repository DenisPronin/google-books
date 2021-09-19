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
    
    clearBooks: (state) => {
      state.books = [];
    },
  
    setTotal: (state, { payload }) => {
      state.total = payload;
    }
  }
});

 export const { setSearchError, setIsLoading, setBooks, setTotal, clearBooks } = booksSlice.actions;

export const getBooks = () => async (dispatch, getState) => {
  try {
    const { books } = getState().books;
    const {searchQuery, category, sorting} = getState().searchForm;

    if (searchQuery === '') {
      dispatch(setSearchError('Search query is required!'));
      return false;
    }
 
    dispatch(setIsLoading(true));
    
    const response = await bookApi.getBooksCollection(searchQuery, category, sorting, books.length);
    
    if (response.items) {
      let booksArr = books.concat(response.items);
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
