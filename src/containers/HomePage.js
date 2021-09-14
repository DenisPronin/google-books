import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { BooksContext } from '../hooks/BooksContext';
import BooksList from '../components/books/BooksList';
import Loader from '../components/common/Loader';

function HomePage () {
  const { books, total, isLoading, loadMore } = useContext(BooksContext);
  
  return (
    <div className='mb-5'>
      <BooksList
        books={books}
        total={total}
      />
  
      <div className='d-flex justify-content-center'>
        {!isLoading && books.length > 0 && (
          <Button variant="outline-secondary" onClick={loadMore}>Load more</Button>
        )}

        {isLoading && <Loader/>}
      </div>
    </div>
  );
}

export default HomePage;
