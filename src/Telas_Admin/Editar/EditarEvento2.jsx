import React, { useState } from "react";
import NavbarAdminEdits from "../../User/NavbarAdminEdits/NavbarAdminEdits";
import "./EditarEvento2.css";
import backimg from "../../User/Pictures/png-transparent-arrow-back-left-arrow-outline-icon-removebg-preview 3.png";
import { Link, useLocation, useHistory } from "react-router-dom";

function EditarEvento2() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numEndereco, setnumEndereco] = useState("");
  const history = useHistory();
  const location = useLocation();
  const eventoData = location.state?.eventoData || {}; // Acessando dados passados por props
  const { tituloEvento, descricao, data, hora, tipoEvento, bannerImage } =
    eventoData;

  const handleNext = () => {
    const eventoData2 = {
      //const que representa os dados das variáveis de cadastroEvento e cadastroEvento2
      tituloEvento,
      descricao,
      data,
      hora,
      tipoEvento,
      bannerImage,
      cep,
      endereco,
      numEndereco,
    };
    // Navegar para a próxima tela e passar os dados via estado
    /* console.log('titulo: ', tituloEvento);
    console.log('descricao: ', descricao);
    console.log('data: ', data);
    console.log('hora: ', hora);
    console.log('tipo de evento: ', tipoEvento);
    console.log('banner: ', bannerImage);
    console.log('cep: ', cep);
    console.log('endereço: ', endereco);
    console.log('Número: ', numEndereco); */
    history.push("/EditarEvento3", { eventoData2 });
  };

  return (
    <div className="body">
      <NavbarAdminEdits />
      <div className="contend">
        <Link to="/EditarEvento">
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
                onChange={(e) => setnumEndereco(e.target.value)}
              />
            </div>
          </div>
          <div className="botoes">
            <Link to="/homeadmin">
              <button className="cancelar">Cancelar</button>
            </Link>
            <Link to="/EditarEvento3">
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
