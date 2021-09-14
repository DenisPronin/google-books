import Book from './Book';
import { Col, Row } from 'react-bootstrap';

function BooksList ({books, total}) {
  return (
    <div className='text-center'>
      <h4 className='mb-3'>Found {total} results</h4>
      
      <Row xs={1} md={4} className='books-list g-4 mb-5'>
        {books.map((book, i) => {
          return (
            <Col key={`book-${book.id}-${i}`}>
              <Book book={book} isExtended={false} />
            </Col>
          );
        })}
      </Row>
    </div>
  )
}

export default BooksList;
