import React, { useState } from "react";
import NavbarAdminEdits from "../../User/NavbarAdminEdits/NavbarAdminEdits";
import "./EditarEvento2.css";
import backimg from "../../User/Pictures/png-transparent-arrow-back-left-arrow-outline-icon-removebg-preview 3.png";
import { Link, useHistory } from "react-router-dom";

function EditarEvento2() {
  const [setCep] = useState("");
  const [setEndereco] = useState("");
  const [setnumEndereco] = useState("");
  const history = useHistory();
  const eventoData2 = JSON.parse(localStorage.getItem("response"));
  const { address } = eventoData2;
  const { cep, street, number } = address;

  const handleNext = () => {
    const eventoDataFull = {
      //const que representa os dados das variáveis de cadastroEvento e cadastroEvento2
      cep,
      street,
      number,
    };
    // Navegar para a próxima tela e passar os dados via estado

    history.push("/EditarEvento3", { eventoDataFull });
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
                value={street}
                onChange={(e) => setEndereco(e.target.value)}
              ></textarea>
            </div>

            <div className="input-group">
              <label>Número*:</label>
              <input
                type="number"
                className="numeroendereco"
                value={number}
                onChange={(e) => setnumEndereco(e.target.value)}
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
