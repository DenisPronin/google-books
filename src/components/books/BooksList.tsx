import {FC} from "react";
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Book from './Book';
import {GoogleBook} from "../../api/bookApi";

interface Props {
  books: Array<GoogleBook>,
  total: number
}

const BooksList: FC<Props> = ({books, total}) => {
  return (
    <div>
      {total > 0 && (
        <h4 className='mb-3'>Found {total} results</h4>
      )}

      <Row xs={1} md={4} lg={4} className='books-list g-4 mb-5'>
        {books.map((book, i) => {
          return (
            <Col key={`book-${book.id}-${i}`} className='d-flex align-items-stretch'>
              <Link to={`/book/${book.id}`} className='hide-link-decoration'>
                <Book book={book} />
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  )
}

export default BooksList;
