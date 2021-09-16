import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bookApi from '../api/bookApi';
import Loader from '../components/common/Loader';
import BookDetail from '../components/books/BookDetail';
import Error from '../components/common/Error';
import useError from '../hooks/useError';

function BookPage () {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [error, setError, clearError] = useError()
  
  useEffect(() => {
    const getBook = async () => {
      setIsLoading(true);
      
      try {
        const response = await bookApi.getBook(id);
        setBook(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError('Something going wrong!')
        setIsLoading(false);
      }
    };
    
    getBook();
  }, [id, setError])
  
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
