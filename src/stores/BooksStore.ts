import {makeAutoObservable, runInAction} from "mobx";
import bookApi, {GoogleBook, GoogleBooks} from "../api/bookApi";

interface IBookInfo {
  isLoading: boolean,
  book: GoogleBook | null,
  error: string
}

export interface IBooks {
  searchError: string,
  isLoading: boolean,
  books: Array<GoogleBook>,
  total: number,
  bookInfo: IBookInfo
}

class Books implements IBooks {

  searchError = '';
  isLoading = false;
  books: Array<GoogleBook> = [];
  total = 0;

  bookInfo: IBookInfo = {
    isLoading: false,
    book: null,
    error: ''
  }

  constructor () {
    makeAutoObservable(this);
  }

  setSearchError (searchError: string) {
    this.searchError = searchError;
  }

  setBooksInfoError (error: string) {
    this.bookInfo.error = error;
  }

  clearBooks () {
    this.books = [];
  }

  getBooks = async (searchQuery: string, category: string, sorting: string) => {
    if (searchQuery === '') {
      this.searchError = 'Search query is required!';
      return false;
    }

    this.isLoading = true;
    try {
      const response: GoogleBooks = await bookApi.getBooksCollection(
        searchQuery,
        category,
        sorting,
        this.books.length
      );

      runInAction(() => {
        if (response.items) {
          this.books = this.books.concat(response.items);
        }

        this.total = response.totalItems;
        this.searchError = '';
        this.isLoading = false;
      });

      return response;
    } catch (error) {
      runInAction(() => {
        this.searchError = 'Something going wrong!';
        this.isLoading = false;
      });
    }
  }

  getBookById = async (id: string) => {
    this.bookInfo.isLoading = true;
    try {
      const response = await bookApi.getBook(id);
      runInAction(() => {
        this.bookInfo.book = response;
        this.bookInfo.isLoading = false;
        this.bookInfo.error = '';
      });
    } catch (error) {
      runInAction(() => {
        this.bookInfo.isLoading = false;
        this.bookInfo.error = 'Something going wrong!';
      });
    }
  }
}

const BooksStore = new Books();

export default BooksStore;
