import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ModalCadastro.css";
import "./HomeAdmin.css";
import NavbarAdmin from "../User/NavbarAdmin/NavbarAdmin";
import Modal from "react-modal";
import axios from "axios";
import deleteIcon from "./../User/Pictures/deletteIcon.png";
import editIcon from "./../User/Pictures/editIcon.png";

Modal.setAppElement("#root");

function HomeAdmin() {
  const [eventos, setEventos] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [eventoDelete, setEventDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/show");
        setEventos(response.data.items); // assuming the data is an array of events inside 'items'
        console.log(response.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (eventId) => {
    setEventDelete(eventId);
    setIsOpen(true);
    console.log("id do evento: ", eventId);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDeleteShow = async (eventId) => {
    setEventDelete(eventId);
    alert("Show deletado com sucesso!");
    console.log("id do evento asasdda: ", eventId);
  };

  const handleGetInfos = async (eventoId) => {
    try {
      const showId = eventoId;
      console.log(showId);
  
      const response = await axios.get(`http://localhost:5000/show/${showId}`);

      
      
      // Armazenar as informações do show no localStorage com uma chave única
      localStorage.setItem(`response`, JSON.stringify(response.data));
  
      console.log('Dados armazenados no localStorage:', response.data);
      
    } catch (error) {
      console.error('Erro ao obter informações do evento:', error.message);
    }
  };

  return (
    <div className="home_body">
      <NavbarAdmin />
      <div className="eventos">
        <div className="cadastro">
          <Link to="/cadastroeventos">
            <button>Cadastro +</button>
          </Link>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            className="modal-contend"
            shouldCloseOnOverlayClick={true}
          >
            <div className="modal-header">
              <h1 className="modalCancelarTitulo">Cancelar</h1>
            </div>
            <form action="" className="modalInfos">
              <p>Tem certeza que deseja cancelar o evento?</p>
              <button
                onClick={handleDeleteShow}
                className="cancelamentoConfirma"
              >
                Sim
              </button>
              <button className="cancelamentoNega">Não</button>
            </form>
          </Modal>
        </div>

        <p className="Eventos-titulo">Eventos:</p>
        <div className="container_eventos">
          <table className="tabela">
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Título</th>
                <th>Data</th>
                <th>Endereço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((evento) => (
                <tr key={evento.id}>
                  <td>{evento.imagem}</td>
                  <td>{evento.title}</td>
                  <td>{evento.date}</td>
                  <td>
                    {evento.address.street + " - " + evento.address.number}
                  </td>
                  <td>
                    <div className="acoesBotoes">
                      <Link to="/editareventos">
                      <img src={editIcon} alt="" onClick={() => handleGetInfos(evento.id)} />
                      </Link>
                      <img
                        src={deleteIcon}
                        onClick={() => handleOpenModal(evento.id)}
                        alt="Excluir"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;
