import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SearchFormOptions {
  searchQuery?: string;
  category?: string;
  sorting?: string;
}

interface SearchFormState {
  searchQuery: string;
  category: string;
  sorting: string;
}

const initialState: SearchFormState = {
  searchQuery: '',
  category: '',
  sorting: 'relevance'
}

export const searchFormSlice = createSlice({
  name: 'searchForm',

  initialState,

  reducers: {
    onChangeSearchForm: (state, action: PayloadAction<SearchFormOptions>) => {
      return {
        ...state,
        ...action.payload
      };
    }
  }
})



export const { onChangeSearchForm } = searchFormSlice.actions;

export default searchFormSlice.reducer;
