import { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AppRouter from './AppRouter';
import Header from './components/layout/Header';
import SearchForm from './components/search/SearchForm';
import Content from './components/layout/Content';
import bookApi from './api/bookApi';
import { BooksContext } from './hooks/BooksContext';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  
  const [searchFormState, setSearchFormState] = useState({
    searchQuery: '',
    category: '',
    sorting: 'relevance'
  });
  
  const onChangeSearchForm = (name, value) => {
    setSearchFormState({
      ...searchFormState,
      [name]: value
    })
  };
  
  const onSearch = useCallback((startIndex = 0) => {
    const {searchQuery, category, sorting} = searchFormState;
    setIsLoading(true);
    bookApi.getBooksCollection(searchQuery, category, sorting, startIndex)
      .then((response) => {
        if (response.items) {
          setBooks((prevBooks) => {
            const booksArr = startIndex > 0 ? prevBooks : [];
            return booksArr.concat(response.items);
          });
        }
        setTotal(response.totalItems);
        setIsLoading(false);
      });
  }, [searchFormState]);
  
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
                loadMore
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
