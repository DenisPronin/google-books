import { Route } from 'react-router-dom';
import HomePage from './containers/HomePage';
import BookPage from './containers/BookPage';

function AppRouter () {
  return (
    <>
      <Route path='/' exact>
        <HomePage />
      </Route>
      
      <Route path='/book/:id' exact>
        <BookPage />
      </Route>
    </>
  );
}

export default AppRouter;
