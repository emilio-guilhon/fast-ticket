import React from "react";
import NavbarAdminEdits from "../../User/NavbarAdminEdits/NavbarAdminEdits";
import "./CadastroEvento.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function CadastroEvento() {
  return (
    <div className="body">
      <NavbarAdminEdits />
      <div className="contend">
        <h1>Cadastrar Evento</h1>
        <div className="forms">
          <div className="infos">
          <p className="infogeral">Informações Gerais:</p>
            <div className="input-group">
              <label>Título do Evento*:</label>
              <input type="text" className="tituloevento" />
            </div>

            <div className="input-group">
              <label className="description">Descrição*:</label>
              <textarea rows="25" cols="70"></textarea>
            </div>

            <div className="input-group">
              <label>Data*:</label>
              <input type="date" />
            </div>

            <div className="input-group">
              <label>Hora*:</label>
              <input type="time" />
            </div>

            <div className="input-group">
              <label>Tipo de Evento*:</label>
              <select
                className="tipoingresso"
              >
                <option value="">Selecione o tipo</option>
                <option value="comedia">Comédia</option>
                <option value="teatro">Teatro</option>
                <option value="cinema">Cinema</option>
                <option value="festival">Festival </option>
                <option value="musica">Música</option>
              </select>
            </div>
          </div>
          <div className="botoes">
            <Link to="/homeadmin">
              <button className="cancelar">Cancelar</button>
            </Link>
            <Link to="/cadastroeventos2">
              <button className="proximo">Próximo</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroEvento;
