import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home_Visitante from './Telas/Home_Visitante/Home_Visitante';
import Login from './Telas/Login/Login';
import Cadastro from './Telas/Cadastro/Cadastro';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/cadastro" component={Cadastro} />
            <Route path="/" component={Home_Visitante} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;