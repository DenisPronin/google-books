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
  
  const onSearch = (searchQuery, category, sorting) => {
    setIsLoading(true);
    bookApi.getBooksCollection(searchQuery, category, sorting).then((response) => {
      setBooks(response.items);
      setTotal(response.totalItems);
      setIsLoading(false);
    });
  }
  
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Header>
              <SearchForm onSearch={onSearch}/>
            </Header>
  
            <Content>
              <BooksContext.Provider value={{ books, total, isLoading }}>
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
