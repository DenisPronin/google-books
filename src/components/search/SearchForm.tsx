import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from "mobx-react";
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { ISearchFormOptions } from "../../stores/SearchFormStore";
import { useStores } from "../../stores";

const SearchForm = observer(() => {
  const { searchFormStore, booksStore } = useStores();
  const { category, searchQuery, sorting } = searchFormStore;

  const [localSearchQuery, setLocalSearchQuery] = useState('');

  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(event.target.value);
  };

  const history = useHistory();

  const onSearch = (options: ISearchFormOptions) => {
    searchFormStore.onChangeSearchForm(options);
    booksStore.clearBooks();
    booksStore.getBooks()
      .then(() => {
        if (history.location.pathname !== '/') {
          history.push('/');
        }
      });
  };

  const handleChangeForm = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = {
      [event.target.name]: event.target.value
    };

    if (searchQuery !== localSearchQuery) {
      options.searchQuery = localSearchQuery;
    }

    onSearch(options);
  };

  const handleSearch = () => {
    onSearch({ searchQuery: localSearchQuery });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
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
              value={localSearchQuery}
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
              value={category}
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
              value={sorting}
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
})

export default SearchForm;
