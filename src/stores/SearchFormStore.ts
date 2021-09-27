import { makeAutoObservable } from "mobx";
import { IRootStore } from "./index";

export interface ISearchFormOptions {
  searchQuery?: string;
  category?: string;
  sorting?: string;
}

export interface ISearchFormStore {
  searchQuery: string;
  category: string;
  sorting: string;
  onChangeSearchForm: Function;
}

class SearchFormStore implements ISearchFormStore {

  root: IRootStore;
  searchQuery = '';
  category = '';
  sorting = 'relevance';

  constructor (root: IRootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  onChangeSearchForm (options: ISearchFormOptions) {
    Object.entries(options).forEach(([_key, value]) => {
      const key = _key as keyof typeof options;
      this[key] = value;
    });
  }
}

export default SearchFormStore;
