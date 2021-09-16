import React, { useContext, useState } from 'react';

export const SearchFormContext = React.createContext();

export const useSearchForm = () => {
  return useContext(SearchFormContext);
};

export const SearchFormProvider = ({ children }) => {
  const [searchFormState, setSearchFormState] = useState({
    searchQuery: '',
    category: '',
    sorting: 'relevance'
  });
  
  const onChangeSearchForm = (options) => {
    setSearchFormState({
      ...searchFormState,
      ...options
    });
  };
  
  return (
    <SearchFormContext.Provider value={{
      searchFormState,
      onChangeSearchForm,
    }}>
      {children}
    </SearchFormContext.Provider>
  );
  
};
