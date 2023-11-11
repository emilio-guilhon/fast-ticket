import React from "react";
import "./cadastro.css";
import Navbar_LoginCadastro from "../../User/Navbar_LoginCadastro/Navbar_LoginCadastro";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Cadastro() {
  return (
    <div className="container">
      <div className="wrap-cadastro">
        <header className="header">
          <Navbar_LoginCadastro />
          <span>Criar conta</span>
        </header>
        <form>
          <div className="inputContainer">
            <label htmlFor="nomeCompleto">Nome Completo:</label>
            <input
              className="input"
              type="text"
              name="nomeCompleto"
              id="nomeCompleto"
              placeholder="Seu Nome"
            />
          </div>

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

          <div className="inputContainer">
            <label htmlFor="confirmarSenha">Confirmar Senha:</label>
            <input
              className="input"
              type="password"
              name="confirmarSenha"
              id="confirmarSenha"
              placeholder="Confirme sua Senha"
            />
          </div>
          <button className="Button">Cadastrar</button>
          <div className="footer">
            <p>Já possui cadastro?</p>
            <Link to="/login">
              <a>Clique Aqui</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
