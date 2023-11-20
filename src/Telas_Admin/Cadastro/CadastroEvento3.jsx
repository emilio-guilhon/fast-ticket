import React, { useState } from "react";
import NavbarAdminEdits from "../../User/NavbarAdminEdits/NavbarAdminEdits";
import "./CadastroEvento3.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import backimg from '../../User/Pictures/png-transparent-arrow-back-left-arrow-outline-icon-removebg-preview 3.png'

function CadastroEvento3() {
  const [tipoIngresso, setTipoIngresso] = useState("");
  const [Quantidade, setQuantidade] = useState("");

  return (
    <div className="body">
      <NavbarAdminEdits />
      <div className="contend">
      <Link to='/cadastroeventos2'><img src={backimg} alt ='backimg' className="voltarIcon"></img></Link>
        <h1>Cadastrar Evento</h1>
        <div className="forms">
          <div className="infoingresso">
            <div className="input-group">
              <p>Tipos de Ingressos:</p>
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
              <input type="number" />
            </div>

             <div className="addIngresso">
                 <button>Adicionar ingresso +</button>
             </div>

          </div>
          <div className="botoes">
            <Link to="/homeadmin">
              <button className="cancelar">Cancelar</button>
            </Link>
            <Link to="/homeadmin">
              <button className="proximo">Confirmar</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroEvento3;
