import React from "react";
import NavbarAdminEdits from "../../User/NavbarAdminEdits/NavbarAdminEdits";
import "./CadastroEvento2.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function CadastroEvento2() {
  return (
    <div className="body">
      <NavbarAdminEdits />
      <div className="contend">
        <h1>Cadastrar Evento</h1>
        <div className="forms">
          <p>Endereço:</p>
          <div className="infoaddress">
            <div className="input-group">
              <label>CEP*:</label>
              <input type="number" className="cepevento" />
            </div>
            <div className="input-group">
              <label>Endereço*:</label>
              <input type="text" className="endereco" />
              <textarea rows="3"></textarea>
            </div>
            <div className="input-group">
              <label>Número*:</label>
              <input type="number" className="numeroendereco" />
            </div>
          </div>
          <div className="botoes">
            <Link to="/homeadmin">
              <button className="cancelar">Cancelar</button>
            </Link>
            <Link to="/cadastroeventos3">
              <button className="proximo">Próximo</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroEvento2;
