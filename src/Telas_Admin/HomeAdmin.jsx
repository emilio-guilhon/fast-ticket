import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./ModalCadastro.css";
import "./HomeAdmin.css";
import NavbarAdmin from "../User/NavbarAdmin/NavbarAdmin";
import Modal from "react-modal";
import axios from "axios";
import deleteIcon from "./../User/Pictures/deletteIcon.png";
import editIcon from "./../User/Pictures/editIcon.png";
import Estatistic from "./../User/Pictures/feedback img 1.png";

Modal.setAppElement("#root");

function HomeAdmin() {
  const [eventos, setEventos] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false);
  const [modalBannerIsOpen, setModalBannerIsOpen] = useState(false);
  const [eventoDelete, setEventDelete] = useState(null);
  const admToken =
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImV4cCI6MzA0ODQ4ODY5NDl9.o0d1AIzyF9GSRQG6abcAijkaWx_jaRq0RD4Ka3tjQIQ";
  const history = useHistory();
  const [statusEventos, setStatusEventos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/show/adm");
        setEventos(response.data.items);

        const canceledItems = response.data.items.map((item) => item.canceled);

        // Atualizar os status e armazenar em statusEventos
        const novosStatus = canceledItems.map((isCanceled, index) => {
          const novoStatus = isCanceled ? "Cancelado" : "Ativo";
          return novoStatus;
        });
        setStatusEventos(novosStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckBanner = (bannerData) => {
    try {
      if (bannerData === null) {
        setSelectedBanner(bannerData);
        setModalBannerIsOpen(true);
      }
    } catch (error) {
      console.error("Erro ao verificar banner:", error);
    }
  };

  const handleUpload = async (event) => {
    // Lógica para processar o upload da imagem
    const novaImagem = event.target.files[0];
    const idShow = localStorage.getItem("idShow");
    console.log(idShow);

    // Crie um objeto FormData
    const formData = new FormData();
    formData.append("banner", novaImagem); // O nome 'banner' deve corresponder ao esperado pelo servidor
    console.log(formData);
    // Adicione o token de autorização ao cabeçalho
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImV4CI6MzA0ODQ4ODY5NDl9.o0d1AIzyF9GSRQG6abcAijkaWx_jaRq0RD4Ka3tjQIQ",
    };

    try {
      // Envie a solicitação Patch usando axios
      const response = await axios.patch(
        `http://localhost:5000/show/${idShow}/banner`,
        formData,
        { headers }
      );

      // Lide com a resposta
      console.log("Resposta do servidor:", response.data);
    } catch (error) {
      // Lide com erros
      console.error("Erro ao enviar solicitação:", error);
    }
  };

  const handleOpenModal = (eventId) => {
    setEventDelete(eventId);
    setIsOpen(true);
  };

  const handleOpenModalConfirm = () => {
    setModalConfirmIsOpen(true);
  };

  const handleOpenModalBanner = () => {
    setModalBannerIsOpen(true);
  };
  const handleCloseModalConfirm = () => {
    setModalConfirmIsOpen(false);
    // Recarregar a página
    window.location.reload();
  };

  const handleCloseModalBanner = () => {
    setModalBannerIsOpen(false);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDeleteShow = async () => {
    console.log("id do evento: ", eventoDelete);

    try {
      const response = await axios.patch(
        `http://localhost:5000/show/${eventoDelete}/cancel`,
        {
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImV4cCI6MzA0ODQ4ODY5NDl9.o0d1AIzyF9GSRQG6abcAijkaWx_jaRq0RD4Ka3tjQIQ",
          },
        }
      );

      console.log("Resposta ao excluir:", response.data);

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
      localStorage.setItem("idShow", JSON.stringify(showId)); //salva o id o evento para ser usado em outras funções
      localStorage.setItem(`response`, JSON.stringify(response.data));
      console.log("Dados armazenados no localStorage:", response.data);
    } catch (error) {
      console.error("Erro ao obter informações do evento:", error.message);
    }
  };

  const handleEstatistic = (eventId) => {
    history.push("/estatisticas", { eventId });
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
              <button className="cancelamentoNega" onClick={handleCloseModal}>
                Não
              </button>
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

                <button
                  className="cancelamentoNegaConfirma"
                  onClick={handleCloseModalConfirm}
                >
                  Ok
                </button>
              </form>
            </div>
          </Modal>
          <Modal
            isOpen={modalBannerIsOpen}
            onRequestClose={handleCloseModalBanner}
            className="modal-contend"
            shouldCloseOnOverlayClick={true}
          >
            <div className="modalFile">
              <input type="file" onChange={handleUpload} />
              <button onClick={handleCloseModalBanner}>Enviar</button>
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
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((evento, index) => (
                <tr key={evento.id}>
                  <td>
                    {" "}
                    <img
                      className="bannerImg"
                      src={evento.banner}
                      onClick={() => handleCheckBanner(evento.banner)}
                      alt=""
                    />
                  </td>
                  <td>{evento.title}</td>
                  <td>{evento.date}</td>
                  <td>
                    {evento.address.street + " - " + evento.address.number}
                  </td>
                  <td>{statusEventos[index]}</td>
                  <td>
                    <div className="acoesBotoes">
                      <Link to="/editareventos">
                        <img
                          src={editIcon}
                          alt=""
                          onClick={() => handleGetInfos(evento.id)}
                        />
                      </Link>
                      <img
                        src={deleteIcon}
                        onClick={() => handleOpenModal(evento.id)}
                        alt="Excluir"
                      />

                      <img
                        src={Estatistic}
                        alt=""
                        onClick={() => handleEstatistic(evento.id)}
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
