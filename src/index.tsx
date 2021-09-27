import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './styles/index.scss';
import App from './App';
import { RootStore, StoresContext } from "./stores";

ReactDOM.render(
  <React.StrictMode>
    <StoresContext.Provider value={new RootStore()}>
      <Router>
        <Switch>
          <App/>
        </Switch>
      </Router>
    </StoresContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
