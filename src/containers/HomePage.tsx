import { observer } from "mobx-react";
import { Button } from 'react-bootstrap';
import BooksList from '../components/books/BooksList';
import Loader from '../components/common/Loader';
import Error from '../components/common/Error';
import { useStores } from "../stores";

const HomePage = observer(() => {
  const { booksStore } = useStores();
  const { books, total, isLoading, searchError } = booksStore;

  const loadMore = () => {
    booksStore.getBooks();
  }

  const onClearSearchError = () => {
    booksStore.setSearchError('');
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
})

export default HomePage;
