import { useEffect } from 'react';
import { observer } from "mobx-react";
import { useParams } from 'react-router-dom';
import Loader from '../components/common/Loader';
import BookDetail from '../components/books/BookDetail';
import Error from '../components/common/Error';
import { useStores } from "../stores";

interface ParamTypes {
  id: string
}

const BookPage = observer(() => {
  const { id } = useParams<ParamTypes>();
  const { booksStore } = useStores();
  const { bookInfo: { isLoading, book, error } } = booksStore;

  const clearError = () => {
    booksStore.setBooksInfoError('');
  }

  useEffect(() => {
    booksStore.getBookById(id);
  }, [booksStore, id])

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
