import React from "react";
import SearchFormStore, { ISearchFormStore } from './SearchFormStore';
import BooksStore, { IBooksStore } from './BooksStore';

export interface IRootStore {
  searchFormStore: ISearchFormStore;
  booksStore: IBooksStore;
}

export class RootStore implements IRootStore {
  searchFormStore: ISearchFormStore;
  booksStore: IBooksStore;

  constructor() {
    this.searchFormStore = new SearchFormStore(this);
    this.booksStore = new BooksStore(this);
  }
}

export const StoresContext = React.createContext<IRootStore>(new RootStore());

export const useStores = () => React.useContext(StoresContext);
