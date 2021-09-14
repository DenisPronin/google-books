import Book from './Book';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function BooksList ({books, total}) {
  return (
    <div>
      {total > 0 && (
        <h4 className='mb-3'>Found {total} results</h4>
      )}
      
      <Row xs={1} md={4} className='books-list g-4 mb-5'>
        {books.map((book, i) => {
          return (
            <Col key={`book-${book.id}-${i}`}>
              <Link to={`/book/${book.id}`} className='book-link'>
                <Book book={book} isExtended={false} />
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  )
}

export default BooksList;
