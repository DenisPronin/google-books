import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bookApi from '../../api/bookApi';

export const getBookById = createAsyncThunk(
  'books/getBookById',
  async (bookId) => {
    const response = await bookApi.getBook(bookId);
    return response;
  }
)

export const booksSlice = createSlice({
  name: 'books',
  
  initialState: {
    searchError: '',
    isLoading: false,
    books: [],
    total: 0,
    bookInfo: {
      isLoading: false,
      book: null,
      error: ''
    }
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
    },
    
    setBooksInfoError: (state, { payload }) => {
      state.bookInfo.error = payload;
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getBookById.pending, (state) => {
        state.bookInfo.isLoading = true;
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.bookInfo.book = action.payload;
        state.bookInfo.isLoading = false;
        state.bookInfo.error = '';
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.bookInfo.isLoading = false;
        state.bookInfo.error = 'Something going wrong!';
      })
  }
});

export const { setSearchError, setIsLoading, setBooks, setTotal, clearBooks, setBooksInfoError } = booksSlice.actions;

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
