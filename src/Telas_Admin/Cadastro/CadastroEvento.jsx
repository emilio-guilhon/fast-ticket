import React, { useState } from "react";
import NavbarAdminEdits from "../../User/NavbarAdminEdits/NavbarAdminEdits";
import "./CadastroEvento.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

function CadastroEvento() {
  const [tituloEvento, setTituloEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [tipoEvento, setTipoEvento] = useState("");
  const [prioridade, setPrioridade] = useState(false);
  const history = useHistory();

  
  const handlePrioridadeChange = () => {
    setPrioridade((prevState) => !prevState);
  };

  const handleNext = () => {
    // função que exportará as variáveis para o próx arquivo
    const eventoData = {
      tituloEvento,
      descricao,
      data,
      hora,
      tipoEvento,
      prioridade,
    };
     console.log(eventoData)
    // Navegar para a próxima tela e passar os dados via estado
    history.push("/cadastroeventos2", { eventoData });
  };

  const handleDataChange = (e) => {
    let inputValue = e.target.value;

    // Adiciona barras automaticamente após o dia e o mês
    if (inputValue.length === 2 && data.length === 1) {
      inputValue += "/";
    } else if (inputValue.length === 5 && data.length === 4) {
      inputValue += "/";
    }

    setData(inputValue);
  };
  const handleHoraChange = (e) => {
    const inputValue = e.target.value;
    setHora(inputValue);
  };

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
              <input
                type="text"
                className="tituloevento"
                value={tituloEvento}
                onChange={(e) => setTituloEvento(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="description">Descrição*:</label>
              <textarea
                rows="25"
                cols="70"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              ></textarea>
            </div>

            <div className="input-group">
              <label>Data*:</label>
              <input
                type="text"
                value={data}
                placeholder="dd/mm/aaaa"
                maxLength="10"
                onChange={handleDataChange}
              />
            </div>

            <div className="input-group">
              <label>Hora*:</label>
              <input
                type="time"
                
                step="1"
                name="hora"
                id="hora"
                onChange={handleHoraChange}
              />
            </div>

            <div className="input-group">
              <label>Tipo de Evento*:</label>
              <select
                className="tipoingresso"
                value={tipoEvento}
                onChange={(e) => setTipoEvento(e.target.value)}
              >
                <option value="">Selecione o tipo</option>
                <option value="Comédia">Comédia</option>
                <option value="Musical">Musical</option>
                <option value="Cultural">Cultural</option>
              </select>
            </div>

            <div className="input-group">
              <label>Prioridade*:</label>
              <input
                type="checkbox"
                checked={prioridade}
                onChange={handlePrioridadeChange}
              />
            </div>
          </div>
          <div className="botoes">
            <Link to="/homeadmin">
              <button className="cancelar">Cancelar</button>
            </Link>
            <button className="proximo" onClick={handleNext}>
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroEvento;
