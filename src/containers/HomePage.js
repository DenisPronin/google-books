import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import BooksList from '../components/books/BooksList';
import Loader from '../components/common/Loader';
import Error from '../components/common/Error';
import { getBooks, setSearchError } from '../redux/modules/books';

function HomePage () {
  const dispatch = useDispatch();
  
  const { books, total, isLoading, searchError } = useSelector(state => state.books);
  
  const loadMore = () => {
    dispatch(getBooks());
  }
  
  const onClearSearchError = () => {
    dispatch(setSearchError(''));
  };
  
  if (searchError) {
    return <Error error={searchError} clearError={onClearSearchError} />
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
