import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';

function SearchForm () {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="search">
          <InputGroup>
            <Form.Control/>
            <Button variant="outline-secondary" id="button-addon1">
              Search
            </Button>
          </InputGroup>
        </Form.Group>
        
        <Row>
          <Form.Group as={Col} controlId="categories">
            <Form.Select>
              <option value="all">All</option>
              <option value="art">Art</option>
              <option value="biography">Biography</option>
              <option value="computers">Computers</option>
              <option value="history">History</option>
              <option value="medical">Medical</option>
              <option value="poetry">Poetry</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group as={Col} controlId="sorting">
            <Form.Select>
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
