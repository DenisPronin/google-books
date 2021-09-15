import { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AppRouter from './AppRouter';
import Header from './components/layout/Header';
import SearchForm from './components/search/SearchForm';
import Content from './components/layout/Content';
import bookApi from './api/bookApi';
import { BooksContext } from './hooks/BooksContext';
import { useHistory } from 'react-router-dom';

function App() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  
  const [searchFormState, setSearchFormState] = useState({
    searchQuery: '',
    category: '',
    sorting: 'relevance'
  });
  
  const [searchError, setSearchError] = useState('');
  
  const clearSearchError = () => {
    setSearchError('');
  };
  
  const onChangeSearchForm = (name, value) => {
    setSearchFormState({
      ...searchFormState,
      [name]: value
    });
  };
  
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
  }, [history, searchFormState]);
  
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
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Header>
              <SearchForm
                formState={searchFormState}
                onChangeForm={onChangeSearchForm}
                onSearch={onSearch}
              />
            </Header>
  
            <Content>
              <BooksContext.Provider value={{
                books,
                total,
                isLoading,
                searchError,
                loadMore,
                clearSearchError
              }}>
                <AppRouter/>
              </BooksContext.Provider>
            </Content>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
