import {createAsyncThunk, createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import bookApi, {GoogleBook, GoogleBooks} from '../../api/bookApi';
import {RootState} from "../store";

interface BooksState {
  searchError: string,
  isLoading: boolean,
  books: Array<GoogleBook>,
  total: number,
  bookInfo: {
    isLoading: boolean,
    book: GoogleBook | null,
    error: string
  }
}

export const getBookById = createAsyncThunk(
  'books/getBookById',
  async (bookId: string) => {
    const response = await bookApi.getBook(bookId);
    return response;
  }
)

const initialState: BooksState = {
  searchError: '',
  isLoading: false,
  books: [],
  total: 0,
  bookInfo: {
    isLoading: false,
    book: null,
    error: ''
  }
}

export const booksSlice = createSlice({
  name: 'books',

  initialState,

  reducers: {
    setSearchError: (state, action: PayloadAction<string>) => {
      state.searchError = action.payload;
    },

    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setBooks: (state, action: PayloadAction<Array<GoogleBook>>) => {
      state.books = action.payload;
    },

    clearBooks: (state) => {
      state.books = [];
    },

    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },

    setBooksInfoError: (state, action: PayloadAction<string>) => {
      state.bookInfo.error = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getBookById.pending, (state) => {
        state.bookInfo.isLoading = true;
      })
      .addCase(
        getBookById.fulfilled,
        (state, action) => {
          state.bookInfo.book = action.payload;
          state.bookInfo.isLoading = false;
          state.bookInfo.error = '';
        }
      )
      .addCase(getBookById.rejected, (state) => {
        state.bookInfo.isLoading = false;
        state.bookInfo.error = 'Something going wrong!';
      })
  }
});

export const { setSearchError, setIsLoading, setBooks, setTotal, clearBooks, setBooksInfoError } = booksSlice.actions;

export const getBooks = () => async (dispatch: Dispatch, getState: () => RootState) => {
  try {
    const { books } = getState().books;
    const {searchQuery, category, sorting} = getState().searchForm;

    if (searchQuery === '') {
      dispatch(setSearchError('Search query is required!'));
      return false;
    }

    dispatch(setIsLoading(true));

    const response: GoogleBooks = await bookApi.getBooksCollection(searchQuery, category, sorting, books.length);

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
