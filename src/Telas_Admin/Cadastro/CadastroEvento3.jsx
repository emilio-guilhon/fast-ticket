import React, { useState } from "react";
import NavbarAdminEdits from "../../User/NavbarAdminEdits/NavbarAdminEdits";
import "./CadastroEvento2.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function CadastroEvento3() {
  const [tipoIngresso, setTipoIngresso] = useState("");

  return (
    <div className="body">
      <NavbarAdminEdits />
      <div className="contend">
        <h1>Cadastrar Evento</h1>
        <div className="forms">
          <p>Tipos de Ingressos:</p>
          <div className="infoingresso"></div>
          <div className="input-group">
            <label>Tipo de Ingresso*:</label>
            <select
              className="tipoingresso"
              value={tipoIngresso}
              onChange={(e) => setTipoIngresso(e.target.value)}
            >
              <option value="">Selecione o tipo</option>
              <option value="Meia">Meia</option>
              <option value="Meia Solidária">Meia Solidária</option>
              <option value="Inteira">Inteira</option>
            </select>
          </div>
          <div className="input-group">
            <label>Quantidade*:</label>
            <select
              className="numeroingressos"
              value={quantidade}
              onChange={(e) => setQuantidade(parseInt(e.target.value))}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </div>
          <div className="botoes">
            <Link to="/homeadmin">
              <button className="cancelar">Cancelar</button>
            </Link>
            <Link to="/">
              <button className="proximo">Próximo</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroEvento3;
