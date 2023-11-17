import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home_Visitante from './Telas/Home_Visitante/Home_Visitante';
import Login from './Telas/Login/Login';
import Cadastro from './Telas/Cadastro/Cadastro';
import HomeCliente from './Telas/HomeCliente/HomeCliente';
import HomeAdmin from './Telas_Admin/HomeAdmin';
import CadastroEvento from './Telas_Admin/Cadastro/CadastroEvento';
import CadastroEvento2 from './Telas_Admin/Cadastro/CadastroEvento2';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path ='/cadastroeventos2' component ={CadastroEvento2}/>
            <Route path ="/cadastroeventos" component={CadastroEvento}/>
            <Route path="/homeadmin" component={HomeAdmin}/>
            <Route path ="/homecliente" component ={HomeCliente}/>
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