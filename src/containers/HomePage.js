import { Button } from 'react-bootstrap';
import { useBooks } from '../hooks/BooksContext';
import BooksList from '../components/books/BooksList';
import Loader from '../components/common/Loader';
import Error from '../components/common/Error';

function HomePage () {
  const {
    books,
    total,
    isLoading,
    searchError,
    loadMore,
    clearSearchError
  } = useBooks();
  
  if (searchError) {
    return <Error error={searchError} clearError={clearSearchError} />
  }
  
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
