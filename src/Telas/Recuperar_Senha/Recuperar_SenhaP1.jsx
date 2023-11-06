import React from "react";
import "./Recuperar_SenhaP1.css";

function RecuperarSenhaP1() {
  return (
    <div className="container">
      <div className="wrap">
        <header className="header">
          <span>Recuperar Senha</span>
        </header>
        <form>
          <div className="inputContainer">
            <label htmlFor="nomeCompleto">Digite seu email cadastrado:</label>
            <input
              className="input"
              type="text"
              name="email"
              id="email"
              placeholder="exemplo@email.com"
            />
          </div>
          <span>Um código de recuperação será enviado para o seu email.</span>
          <button className="Button">Enviar</button>
          <a href="">Reenviar código!</a>
        </form>
        <div className="footer"></div>
      </div>
    </div>
  );
}
export default RecuperarSenhaP1;
