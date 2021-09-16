import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSearchForm } from './SearchFormContext';
import useError from './useError';
import bookApi from '../api/bookApi';

export const BooksContext = React.createContext();

export const useBooks = () => {
  return useContext(BooksContext);
};

export const BooksProvider = ({ children }) => {
  const history = useHistory();
  
  const { searchFormState } = useSearchForm();
  
  const [searchError, setSearchError, clearSearchError] = useError();
  
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  
  const onSearch = useCallback(async (startIndex = 0) => {
    try {
      const {searchQuery, category, sorting} = searchFormState;
      if (searchQuery === '') {
        setSearchError('Search query is required!');
        return false;
      }
      
      setIsLoading(true);
      if (startIndex === 0) {
        setBooks([]);
      }
      
      const response = await bookApi.getBooksCollection(searchQuery, category, sorting, startIndex)
      
      if (response.items) {
        setBooks((prevBooks) => {
          const booksArr = startIndex > 0 ? prevBooks : [];
          return booksArr.concat(response.items);
        });
      }
      
      setTotal(response.totalItems);
      setSearchError('');
      setIsLoading(false);
      
      if (history.location.pathname !== '/') {
        history.push('/');
      }
    } catch (error) {
      setSearchError('Something going wrong!');
      setIsLoading(false);
    }
  }, [history, searchFormState, setSearchError]);
  
  const didMount = useRef(false);
  
  useEffect(() => {
    if (didMount.current) {
      onSearch(0);
    } else {
      didMount.current = true;
    }
  }, [onSearch, searchFormState]);
  
  const loadMore = () => {
    onSearch(books.length);
  }
  
  return (
    <BooksContext.Provider value={{
      isLoading,
      books,
      total,
      searchError,
      clearSearchError,
      loadMore
    }}>
      {children}
    </BooksContext.Provider>
  );
};
