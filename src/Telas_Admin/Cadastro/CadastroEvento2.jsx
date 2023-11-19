import React from "react";
import NavbarAdminEdits from "../../User/NavbarAdminEdits/NavbarAdminEdits";
import "./CadastroEvento2.css";
import backimg from '../../User/Pictures/png-transparent-arrow-back-left-arrow-outline-icon-removebg-preview 3.png'
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function CadastroEvento2() {
  return (
    <div className="body">
      <NavbarAdminEdits />
      <div className="contend">
        <Link to='/cadastroeventos'><img src={backimg} className="voltarIcon"></img></Link>
        <h1>Cadastrar Evento</h1>
        <div className="forms">
          <div className="infoaddress">
            <div className="endereco-titulo">
               <p>Endereço</p>
            </div>
            <div className="input-group">
              <label>CEP*:</label>
              <input type="number" className="cepevento" />
            </div>
            <div className="input-group">
              <label>Endereço*:</label>
              <textarea rows="2" cols="70" className="endereço"></textarea>
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
