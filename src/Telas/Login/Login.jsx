import React, { useState } from 'react';
import "./login.css";
import Navbar_LoginCadastro from "../../User/Navbar_LoginCadastro/Navbar_LoginCadastro";
import { Link , useHistory } from "react-router-dom";
import axios from "axios";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        // Login bem-sucedido, armazene o token
        const token = response.data.token;
        localStorage.setItem('token', token);
         console.log(token);
        // Redirecione para a página principal
        console.log('Sucesso');
        history.push('/homecliente');

      }
    } catch (error) {
      console.error('Erro ao realizar o login:', error);
      alert('Erro ao realizar login');
      console.log(email , password);
      
      
      
    }
  };

  return (
    <div className="container">
      <div className="wrap-login">
        <header className="header">
          <Navbar_LoginCadastro />
          <span>Login</span>
        </header>
        <form onSubmit={handleLogin}>
          <div className="inputContainer">
            <label htmlFor="email">E-mail:</label>
            <input
              className="input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="exemplo@email.com"
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="password">Senha:</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="**********"
            />
          </div>
          <button className="Button" type="submit">Entrar</button>
          <div className="underbutton">
            <p>Esqueceu a senha?</p>
            <a>Clique Aqui!</a>
          </div>
          <div className="footer">
            <p>Não possui conta?</p>
            <Link to="/cadastro">
              <a>Cadastre-se</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
