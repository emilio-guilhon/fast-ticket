import React, { useState } from "react";
import NavbarAdminEdits from "../../User/NavbarAdminEdits/NavbarAdminEdits";
import "./CadastroEvento2.css";
import backimg from "../../User/Pictures/png-transparent-arrow-back-left-arrow-outline-icon-removebg-preview 3.png";
import { Link, useLocation, useHistory } from "react-router-dom";

function CadastroEvento2() {
  const [cep, setCep] = useState("");
  const [street, setEndereco] = useState("");
  const [number, setnumEndereco] = useState("");
  const history = useHistory();
  const location = useLocation();
  const eventoData = location.state?.eventoData || {}; // Acessando dados passados por props
  const { tituloEvento, descricao, data, hora, tipoEvento, prioridade } =
    eventoData;

  const handleNext = () => {
    const eventoData2 = {
      //const que representa os dados das variáveis de cadastroEvento e cadastroEvento2
      tituloEvento,
      descricao,
      data,
      hora,
      tipoEvento,
      prioridade,
      cep,
      street,
      number,
    };

    // Navegar para a próxima tela e passar os dados via estado
    history.push("/cadastroeventos3");
    // Armazenar temporariamente no localStorage
    localStorage.setItem("eventoData2", JSON.stringify(eventoData2));
    console.log(eventoData2);
  };

  return (
    <div className="body">
      <NavbarAdminEdits />
      <div className="contend">
        <Link to="/cadastroeventos">
          <img src={backimg} className="voltarIcon"></img>
        </Link>
        <h1>Cadastrar Evento</h1>
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
                className="endereco"
                value={street}
                onChange={(e) => setEndereco(e.target.value)}
              ></textarea>
            </div>

            <div className="input-group">
              <label>Número*:</label>
              <input
                type="text"
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
            <Link to="/cadastroeventos3">
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

export default CadastroEvento2;
