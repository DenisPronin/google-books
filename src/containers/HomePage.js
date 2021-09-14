import BooksList from '../components/books/BooksList';

function HomePage ({books, total}) {
  console.log({books, total});
  return (
    <div>
      <BooksList books={books} total={total}/>
    </div>
  );
}

export default HomePage;
