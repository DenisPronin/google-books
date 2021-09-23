import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AppRouter from './AppRouter';
import Header from './components/layout/Header';
import SearchForm from './components/search/SearchForm';
import Content from './components/layout/Content';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Header>
              <SearchForm/>
            </Header>

            <Content>
              <AppRouter/>
            </Content>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
