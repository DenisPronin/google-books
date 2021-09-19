import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { onChangeSearchForm } from '../../redux/modules/searchForm';
import { clearBooks, getBooks } from '../../redux/modules/books';

function SearchForm () {
  const history = useHistory();
  const dispatch = useDispatch();
  const formState = useSelector(state => state.searchForm)
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const onChangeQuery = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const onSearch = (options) => {
    dispatch(onChangeSearchForm(options));
    dispatch(clearBooks());
    dispatch(getBooks()).then(() => {
      if (history.location.pathname !== '/') {
        history.push('/');
      }
    })
  };
  
  const handleChangeForm = (event) => {
    const options = {
      [event.target.name]: event.target.value
    };
  
    if (formState.searchQuery !== searchQuery) {
      options.searchQuery = searchQuery;
    }
    
    onSearch(options);
  };
  
  const handleSearch = () => {
    onSearch({ searchQuery });
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };
  
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="search">
          <InputGroup>
            <Form.Control
              value={searchQuery}
              name='searchQuery'
              onChange={onChangeQuery}
              onKeyPress={handleKeyPress}
            />
            <Button variant="outline-secondary" onClick={handleSearch}>
              Search
            </Button>
          </InputGroup>
        </Form.Group>
        
        <Row>
          <Form.Group as={Col} controlId="categories">
            <Form.Select
              value={formState.category}
              name='category'
              onChange={handleChangeForm}
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
              onChange={handleChangeForm}
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
