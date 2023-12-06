import React, { useState, useEffect } from "react";
import NavbarAdminEdits from "../../User/NavbarAdminEdits/NavbarAdminEdits";
import "./EditarEvento.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

function EditarEvento() {
  const [tituloEvento, setTituloEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [tipoEvento, setTipoEvento] = useState("");
  const history = useHistory();
  const priority = useState("");

  useEffect(() => {
    const eventoData = JSON.parse(localStorage.getItem("response"));
    if (eventoData) {
      setTituloEvento(eventoData.title || "");
      setDescricao(eventoData.description || "");
      setData(eventoData.date || "");
      setHora(eventoData.hour || "");
      setTipoEvento(eventoData.show_type || "");
    }
  }, []);

  const handleNext = () => {
    const eventoData = {
      title: tituloEvento,
      description: descricao,
      date: data,
      hour: hora,
      show_type: tipoEvento,
      priority: priority[0],
    };
    history.push("/editareventos2", { eventoData });
  };

  const handleDataChange = (e) => {
    let inputValue = e.target.value;
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
        <h1>Editar Evento</h1>
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
                value={hora}
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
                <option value="">{tipoEvento}</option>
              </select>
            </div>
          </div>
          <div className="botoes">
            <Link to="/homeadmin">
              <button className="cancelar">Cancelar</button>
            </Link>
            <Link to="/editareventos2">
              <button className="proximo" onClick={handleNext}>
                Próximo
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarEvento;
