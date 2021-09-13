import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './containers/HomePage';
import BookPage from './containers/BookPage';

function AppRouter () {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/book/:id' exact>
          <BookPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
