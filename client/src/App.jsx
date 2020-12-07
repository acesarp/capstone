
import './main.css';
import Header from './components/Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path="/"/>
          
          <Route />
      </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
