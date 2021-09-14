import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import bookApi from '../api/bookApi';
import Book from '../components/books/Book';
import Loader from '../components/common/Loader';

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
      {isLoading && <Loader />}
      
      {book && !isLoading && (
        <Book book={book} isExtended/>
      )}
    </div>
  );
}

export default BookPage;
