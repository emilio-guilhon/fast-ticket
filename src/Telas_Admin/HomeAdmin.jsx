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
  const [modalConfirmIsOpen,setModalConfirmIsOpen] = useState(false);
  const [eventoDelete, setEventDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/show/adm");
        setEventos(response.data.items);
  
        // Acessar a propriedade 'canceled' em cada item de 'items'
        const canceledItems = response.data.items.map(item => item.canceled);
        console.log(canceledItems)
        //console.log('O  show foi cancelado?: ', canceledItems);
        for (let i = 0; i<=canceledItems.length;i++){
          let id = i + 1
          let status = canceledItems[i]
          if(status ===false){
            console.log('id: ', id,'status: ', status)
          }
        }
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleOpenModal = (eventId) => {
    setEventDelete(eventId);
    setIsOpen(true);
  };

  const handleOpenModalConfirm = () =>{
    setModalConfirmIsOpen(true);
  }
  const handleCloseModalConfirm = ()=>{
    setModalConfirmIsOpen(false);
      // Recarregar a página
      window.location.reload();
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  
  const handleDeleteShow = async () => {
    console.log('id do evento: ',eventoDelete);

    try {
      // Use o eventoDelete diretamente para obter o ID do evento
      const response = await axios.patch(`http://localhost:5000/show/${eventoDelete}/cancel`);
      console.log('Resposta ao excluir:', response.data);

      // Atualize a lista de eventos após excluir
      

      // Feche o modal
      handleCloseModal();
      handleOpenModalConfirm();
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
    }
  };


  const handleGetInfos = async (eventoId) => {
    try {
      const showId = eventoId;
      console.log(showId);
  
     
    const response = await axios.get(`http://localhost:5000/show/${showId}`);
    
    localStorage.clear();
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
        <div className="modalInfos">
          <p>Tem certeza que deseja cancelar o evento?</p>
          <button
            onClick={handleDeleteShow}
            className="cancelamentoConfirma"
          >
            Sim
          </button>
          <button className="cancelamentoNega" onClick={handleCloseModal}>Não</button>
        </div>
      </Modal>
      <Modal
       isOpen={modalConfirmIsOpen}
       onRequestClose={handleCloseModalConfirm}
       className="modal-contend"
       shouldCloseOnOverlayClick={true}
       >
        <div className="modal-header">
          <h1 className="modalCancelarTitulo">Cancelar</h1>
        </div>
        <div className="modalInfos">
        <form action="">
          <p>Evento cancelado com sucesso!</p>

          <button className="cancelamentoNega" onClick={handleCloseModalConfirm}>Ok</button>
          </form>
        </div>
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
                  <td><img className="bannerImg" src={evento.banner} alt="" /></td>
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
