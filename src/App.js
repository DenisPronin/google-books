import AppRouter from './AppRouter';
import Header from './components/layout/Header';
import SearchForm from './components/search/SearchForm';
import Content from './components/layout/Content';

function App() {
  return (
    <div className="App">
      <Header>
        <SearchForm/>
      </Header>
      
      <Content>
        <AppRouter />
      </Content>
    </div>
  );
}

export default App;
