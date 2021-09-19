import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/common/Loader';
import BookDetail from '../components/books/BookDetail';
import Error from '../components/common/Error';
import { getBookById, setBooksInfoError } from '../redux/modules/books';

function BookPage () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, book, error } = useSelector(state => state.books.bookInfo);
  
  const clearError = () => {
    dispatch(setBooksInfoError(''));
  }
  
  useEffect(() => {
    dispatch(getBookById(id));
  }, [dispatch, id])
  
  if (error) {
    return <Error error={error} clearError={clearError} />
  }
  
  return (
    <div>
      {isLoading && (
        <div className='d-flex justify-content-center mt-5'>
          <Loader />
        </div>
      )}
      
      {book && !isLoading && (
        <BookDetail book={book}/>
      )}
    </div>
  );
}

export default BookPage;
