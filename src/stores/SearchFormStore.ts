import {makeAutoObservable} from "mobx";

export interface ISearchFormOptions {
  searchQuery?: string;
  category?: string;
  sorting?: string;
}

export interface ISearchFormStore {
  searchQuery: string;
  category: string;
  sorting: string;
}

class SearchForm implements ISearchFormStore {

  searchQuery = '';
  category = '';
  sorting = 'relevance';

  constructor () {
    makeAutoObservable(this);
  }

  onChangeSearchForm (options: ISearchFormOptions) {
    Object.entries(options).forEach(([_key, value]) => {
      const key = _key as keyof typeof options;
      this[key] = value;
    });
  }
}

const SearchFormStore = new SearchForm();

export default SearchFormStore;
