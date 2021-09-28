import { makeAutoObservable, runInAction } from "mobx";
import bookApi, { GoogleBook, GoogleBooks } from "../api/bookApi";
import { IRootStore } from "./index";

interface IBookInfo {
  isLoading: boolean,
  book: GoogleBook | null,
  error: string
}

export interface IBooksStore {
  searchError: string;
  isLoading: boolean;
  books: Array<GoogleBook>;
  total: number;
  bookInfo: IBookInfo;

  clearBooks: () => void;
  getBooks: () => Promise<GoogleBooks | void>;
  setSearchError: (error: string) => void;
  setBooksInfoError: (error: string) => void;
  getBookById: (id: string) => void;
}

class BooksStore implements IBooksStore {

  root: IRootStore;
  searchError = '';
  isLoading = false;
  books: Array<GoogleBook> = [];
  total = 0;

  bookInfo: IBookInfo = {
    isLoading: false,
    book: null,
    error: ''
  }

  constructor (root: IRootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  setSearchError = (error: string) => {
    this.searchError = error;
  }

  setBooksInfoError = (error: string) => {
    this.bookInfo.error = error;
  }

  clearBooks = () => {
    this.books = [];
  }

  getBooks = async () => {
    const { searchQuery, category, sorting } = this.root.searchFormStore
    if (searchQuery === '') {
      this.searchError = 'Search query is required!';
      return Promise.reject();
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

      return Promise.reject();
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

export default BooksStore;
