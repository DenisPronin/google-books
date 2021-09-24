import { observer } from "mobx-react";
import { Button } from 'react-bootstrap';
import BooksList from '../components/books/BooksList';
import Loader from '../components/common/Loader';
import Error from '../components/common/Error';
import BooksStore from "../stores/BooksStore";
import SearchFormStore from "../stores/SearchFormStore";

const HomePage = observer(() => {
  const { books, total, isLoading, searchError } = BooksStore;
  const { category, searchQuery, sorting } = SearchFormStore;

  const loadMore = () => {
    BooksStore.getBooks(searchQuery, category, sorting);
  }

  const onClearSearchError = () => {
    BooksStore.setSearchError('');
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
