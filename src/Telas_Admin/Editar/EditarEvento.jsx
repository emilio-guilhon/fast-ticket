import React, { useState } from "react";
import NavbarAdminEdits from "../../User/NavbarAdminEdits/NavbarAdminEdits";
import "./EditarEvento.css";
import bannerimg from "../../User/Pictures/receive_96629 1.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

function EditarEvento() {
  const [ setBannerImage] = useState(bannerimg);
  const [ setTituloEvento] = useState("");
  const [ setDescricao] = useState("");
  const [ setData] = useState("");
  const [ setHora] = useState("");
  const [ setTipoEvento] = useState("");
  const history = useHistory();
  const eventoData = JSON.parse(localStorage.getItem('response'));
  const {title,description,date,hour,show_type,priority,banner} = eventoData;

  console.log(eventoData.id ," ",title);


  const handleFileChange = (event) => {
    const file = event.target.files[0]; // pega o arquivo na primeira posição

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBannerImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  /*const handleUpload = () => {
    if (selectedFile) {
      console.log("arquivo armazenado: ", selectedFile);
    } else {
      console.log('nenhum arquivo selecionado');
    }
  } */

  const handleNext = () => {
    // função que exportará as variáveis para o próx arquivo
    const eventoData = {
     title,
     description,
     date,
     hour,
     show_type,
     priority,
     banner,
    };

    // Navegar para a próxima tela e passar os dados via estado
    history.push("/EditarEvento2", { eventoData });
  };


  
  const handleDataChange = (e) => {
    let inputValue = e.target.value;

    // Adiciona barras automaticamente após o dia e o mês
    if (inputValue.length === 2 && date.length === 1) {
      inputValue += "/";
    } else if (inputValue.length === 5 && date.length === 4) {
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
                value={title}
                onChange={(e) => setTituloEvento(e.target.value)}
                readOnly
              />
            </div>

            <div className="input-group">
              <label className="description">Descrição*:</label>
              <textarea
                rows="25"
                cols="70"
                value={description}
                onChange={(e) => setDescricao(e.target.value)}
              ></textarea>
            </div>

            <div className="input-group">
              <label>Data*:</label>
              <input
                type="text"
                value={date}
                placeholder="dd/mm/aaaa"
                maxLength="10"
                onChange={handleDataChange}
              />
            </div>

            <div className="input-group">
              <label>Hora*:</label>
              <input
                type="time"
                class="form-control"
                step="1"
                name="hora"
                id="hora"
                value={hour}
                onChange={handleHoraChange}
              />
            </div>

            <div className="input-group">
              <label>Tipo de Evento*:</label>
              <select
                className="tipoingresso"
                value={show_type}
                onChange={(e) => setTipoEvento(e.target.value)}
              >
                <option value="">Selecione o tipo</option>
                <option value="Comédia">Comédia</option>
                <option value="Musical">Musical</option>
                <option value="Cultural">Cultural</option>
              </select>
            </div>
            <div className="input-group">
              <label className="fileInputContainer">
                Banner do evento*
                <img src={bannerimg} alt="Banner Image" />
                <input type="file" id="fileInput" onChange={handleFileChange} />
              </label>
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
