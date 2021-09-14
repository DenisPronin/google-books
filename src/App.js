import { useState } from 'react';
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
  
  const onChangeSearchForm = (event) => {
    setSearchFormState({
      ...searchFormState,
      [event.target.name]: event.target.value
    })
  };
  
  const onSearch = (startIndex = 0) => {
    const {searchQuery, category, sorting} = searchFormState;
    setIsLoading(true);
    bookApi.getBooksCollection(searchQuery, category, sorting, startIndex)
      .then((response) => {
        const prevBooks = startIndex > 0 ? books : [];
        setBooks(prevBooks.concat(response.items));
        setTotal(response.totalItems);
        setIsLoading(false);
      });
  }
  
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
