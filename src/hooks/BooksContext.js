import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../redux/modules/books';

export const BooksContext = React.createContext();

export const useBooks = () => {
  return useContext(BooksContext);
};

export const BooksProvider = ({ children }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const searchFormState = useSelector(state => state.searchForm)
  const books = useSelector(state => state.books.books)
  
  const onSearch = useCallback(async (startIndex = 0) => {
    const {searchQuery, category, sorting} = searchFormState;

    dispatch(getBooks(searchQuery, category, sorting, startIndex)).then(() => {
      if (history.location.pathname !== '/') {
        history.push('/');
      }
    })
  }, [dispatch, history, searchFormState]);
  
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
      loadMore
    }}>
      {children}
    </BooksContext.Provider>
  );
};
