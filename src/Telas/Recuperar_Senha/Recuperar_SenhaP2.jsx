import React from "react";
import "./Recuperar_SenhaP2.css";

function RecuperarSenhaP2() {
  return (
    <div className="container">
      <div className="wrap">
        <header className="header">
          <span>Recuperar Senha</span>
        </header>
        <form>
          <div className="inputContainer">
            <label htmlFor="password">Nova Senha:</label>
            <input
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="*********"
            />
          </div>

          <div className="inputContainer">
            <label htmlFor="confirmarSenha">Confirmar Senha:</label>
            <input
              className="input"
              type="password"
              name="confirmarSenha"
              id="confirmarSenha"
              placeholder="*********"
            />
          </div>
          <button className="Button">Salvar</button>
        </form>
        <div className="footer"></div>
      </div>
    </div>
  );
}
export default RecuperarSenhaP2;
