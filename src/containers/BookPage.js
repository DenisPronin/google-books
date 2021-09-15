import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import bookApi from '../api/bookApi';
import Loader from '../components/common/Loader';
import BookDetail from '../components/books/BookDetail';

function BookPage () {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState(null);
  
  useEffect(() => {
    setIsLoading(true);
    bookApi.getBook(id).then((response) => {
      setBook(response);
      setIsLoading(false);
    })
  }, [id])
  
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
