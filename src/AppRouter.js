import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './containers/HomePage';
import BookPage from './containers/BookPage';

function AppRouter ({books, total}) {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <HomePage
            books={books}
            total={total}
          />
        </Route>
        
        <Route path='/book/:id' exact>
          <BookPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
