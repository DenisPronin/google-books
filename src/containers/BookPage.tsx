import { useEffect } from 'react';
import { observer } from "mobx-react";
import { useParams } from 'react-router-dom';
import Loader from '../components/common/Loader';
import BookDetail from '../components/books/BookDetail';
import Error from '../components/common/Error';
import BooksStore from "../stores/BooksStore";

interface ParamTypes {
  id: string
}

const BookPage = observer(() => {
  const { id } = useParams<ParamTypes>();
  const { bookInfo: { isLoading, book, error } } = BooksStore;

  const clearError = () => {
    BooksStore.setBooksInfoError('');
  }

  useEffect(() => {
    BooksStore.getBookById(id);
  }, [id])

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
});

export default BookPage;
