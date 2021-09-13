import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import bookApi from '../../api/bookApi';
import { useState } from 'react';

function SearchForm () {
  const [formState, setFormState] = useState({
    searchQuery: '',
    category: '',
    sorting: 'relevance'
  });
  
  const onChangeForm = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    })
  };

  const onSearch = () => {
    const { searchQuery, category, sorting } = formState;
    bookApi.getBooksCollection(searchQuery, category, sorting).then((response) => {
      console.log(response);
    });
  }
  
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="search">
          <InputGroup>
            <Form.Control
              value={formState.searchQuery}
              name='searchQuery'
              onChange={onChangeForm}
            />
            <Button variant="outline-secondary" onClick={onSearch}>
              Search
            </Button>
          </InputGroup>
        </Form.Group>
        
        <Row>
          <Form.Group as={Col} controlId="categories">
            <Form.Select
              value={formState.category}
              name='category'
              onChange={onChangeForm}
            >
              <option value="">All</option>
              <option value="art">Art</option>
              <option value="biography">Biography</option>
              <option value="computers">Computers</option>
              <option value="history">History</option>
              <option value="medical">Medical</option>
              <option value="poetry">Poetry</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group as={Col} controlId="sorting">
            <Form.Select
              value={formState.sorting}
              name='sorting'
              onChange={onChangeForm}
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
            </Form.Select>
          </Form.Group>
        </Row>
        
      </Form>
    </div>
  );
}

export default SearchForm;
