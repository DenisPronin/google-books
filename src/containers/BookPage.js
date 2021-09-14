import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import bookApi from '../api/bookApi';
import Book from '../components/books/Book';

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
  }, [])
  
  return (
    <div>
      {isLoading && <div>loading..</div>}
      
      {book && !isLoading && (
        <Book book={book} isExtended/>
      )}
    </div>
  );
}

export default BookPage;
