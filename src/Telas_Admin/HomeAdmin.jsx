import React, { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import './ModalCadastro.css';
import './HomeAdmin.css';
import NavbarAdmin from '../User/NavbarAdmin/NavbarAdmin';
import Modal from 'react-modal';
import axios from 'axios';


Modal.setAppElement('#root');

function HomeAdmin() {


  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost:5000/show')
      .then(response => {
        setEventos(response.data);
        console.log( 'eventos : ' + response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar eventos:', error);
      });
  }, []); // O array vazio assegura que o efeito só é executado uma vez, similar a componentDidMount
   
  const [modalIsOpen,setIsOpen] =useState(false);

  function handleOpenModal(){ //abre a modal
    setIsOpen(true);
  }
  function handleCloseModal(){ //fecha a modal
    setIsOpen(false);
  }

  return (
    <div className="home_body">
      <NavbarAdmin />
      <div className="eventos">
        <div className="cadastro">
          <Link to='/cadastroeventos'><button>Cadastro +</button></Link>
          <Modal
           isOpen={modalIsOpen}
           onRequestClose={handleCloseModal}
           className='modal-contend'
           shouldCloseOnOverlayClick={true}
          >
            <h1 className='modalCadastroTitulo'>Teste</h1>
            <form action="">
              <input type="text" />
            
            </form>
          </Modal>
        </div>
        
        <p className='Eventos-titulo'>Eventos:</p> 
        <div className="container_eventos">
        <table className='tabela'>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Título</th>
            <th>Data</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
          </table>
        </div>
      </div>
    </div>
  )
}

export default HomeAdmin