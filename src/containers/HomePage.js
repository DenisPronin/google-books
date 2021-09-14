import BooksList from '../components/books/BooksList';
import { useContext } from 'react';
import { BooksContext } from '../hooks/BooksContext';
import Loader from '../components/common/Loader';

function HomePage () {
  const { books, total, isLoading } = useContext(BooksContext);
  
  return (
    <div>
      <BooksList
        books={books}
        total={total}
      />
  
      {isLoading && <Loader/>}
    </div>
  );
}

export default HomePage;
