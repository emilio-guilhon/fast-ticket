import React from "react";
import "./cadastro.css";
import Navbar_LoginCadastro from "../../User/Navbar_LoginCadastro/Navbar_LoginCadastro";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

function Cadastro() {
  const [FormData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    password: "",
    confirmarSenha: "",
  });

  //atualiza os dados do formulario de cadastro
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //envia os dados para a API/banco
  const handleSubmit = (e) => {
    e.preventDefault();
    const { nomeCompleto, email, password, confirmarSenha } = FormData;

    const jsonData = JSON.stringify({
      name: nomeCompleto,
      email: email,
      password: password,
      repeat_password: confirmarSenha,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("http://localhost:5000/user", jsonData, config)
      .then((response) => {
        console.log(response.data);
        alert("Cadastro realizado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro no cadastro:", error);
      });
  };

  return (
    <div className="container">
      <div className="wrap-cadastro">
        <header className="header">
          <Navbar_LoginCadastro />
          <span>Criar conta</span>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="inputContainer">
            <label htmlFor="nomeCompleto">Nome Completo:</label>
            <input
              className="input"
              type="text"
              name="nomeCompleto"
              value={FormData.nomeCompleto}
              onChange={handleChange}
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
              value={FormData.email}
              onChange={handleChange}
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
              value={FormData.password}
              onChange={handleChange}
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
              value={FormData.confirmarSenha}
              onChange={handleChange}
              id="confirmarSenha"
              placeholder="Confirme sua Senha"
            />
          </div>
          <button className="Button" type="submit">
            Cadastrar
          </button>
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
