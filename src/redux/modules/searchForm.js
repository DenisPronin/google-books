import { createSlice } from '@reduxjs/toolkit';

export const searchFormSlice = createSlice({
  name: 'searchForm',
  
  initialState: {
    searchQuery: '',
    category: '',
    sorting: 'relevance'
  },
  
  reducers: {
    onChangeSearchForm: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    }
  }
})



export const { onChangeSearchForm } = searchFormSlice.actions;

export default searchFormSlice.reducer;
