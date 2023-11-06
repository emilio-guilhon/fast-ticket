import React from "react";
import "./login.css";
import Navbar_LoginCadastro from "../../User/Navbar_LoginCadastro/Navbar_LoginCadastro";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Login() {
  return (

    <div className="container">
      <div className="wrap-login">
        <header className="header">
        <Navbar_LoginCadastro/>
          <span>Login</span>
        </header>
        <form>
          <div className="inputContainer">
            <label htmlFor="email">E-mail:</label>
            <input
              className="input"
              type="text"
              name="email"
              id="email"
              placeholder="exemplo@email.com"
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="password">Senha:</label>
            <input
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="**********"
            />
          </div>
          <button className="Button">Entrar</button>
          <div className="underbutton">
            <p>Esqueceu a senha?</p>
            <a href="/">Clique Aqui!</a>
          </div>
          <div className="footer">
            <p>Não possui conta?</p>
            <Link to='/cadastro'><a>Cadastre-se</a></Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
