import BooksList from '../components/books/BooksList';
import { useContext } from 'react';
import { BooksContext } from '../hooks/BooksContext';

function HomePage () {
  const booksData = useContext(BooksContext);
  
  return (
    <div>
      <BooksList books={booksData.books} total={booksData.total}/>
    </div>
  );
}

export default HomePage;
