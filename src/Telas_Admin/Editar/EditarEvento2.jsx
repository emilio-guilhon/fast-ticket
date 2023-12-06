import React, { useState, useEffect } from "react";
import NavbarAdminEdits from "../../User/NavbarAdminEdits/NavbarAdminEdits";
import "./EditarEvento2.css";
import backimg from "../../User/Pictures/png-transparent-arrow-back-left-arrow-outline-icon-removebg-preview 3.png";
import { Link, useHistory, useLocation } from "react-router-dom";

function EditarEvento2() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numEndereco, setNumEndereco] = useState("");
  const history = useHistory();
  const location = useLocation();
  const eventoData = location.state?.eventoData;

  useEffect(() => {
    const eventoData2 = JSON.parse(localStorage.getItem("response"));
    if (eventoData2 && eventoData2.address) {
      setCep(eventoData2.address.cep || "");
      setEndereco(eventoData2.address.street || "");
      setNumEndereco(eventoData2.address.number || "");
    }
  }, []);

  const handleNext = () => {
    const eventoDataFull = {
      ...eventoData,
      cep,
      endereco,
      numEndereco,
    };
    history.push("/editareventos3", { eventoDataFull });
  };

  return (
    <div className="body">
      <NavbarAdminEdits />
      <div className="contend">
        <Link to="/editareventos">
          <img src={backimg} className="voltarIcon"></img>
        </Link>
        <h1>Editar Evento</h1>
        <div className="forms">
          <div className="infoaddress">
            <div className="endereco-titulo">
              <p>Endereço</p>
            </div>
            <div className="input-group">
              <label>CEP*:</label>
              <input
                type="number"
                className="cepevento"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Endereço*:</label>
              <textarea
                rows="2"
                cols="70"
                className="endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              ></textarea>
            </div>

            <div className="input-group">
              <label>Número*:</label>
              <input
                type="number"
                className="numeroendereco"
                value={numEndereco}
                onChange={(e) => setNumEndereco(e.target.value)}
              />
            </div>
          </div>
          <div className="botoes">
            <Link to="/homeadmin">
              <button className="cancelar">Cancelar</button>
            </Link>
            <Link to="/editareventos3">
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

export default EditarEvento2;
