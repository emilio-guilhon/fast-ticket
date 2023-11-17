import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './ModalCadastro.css';
import './HomeAdmin.css';
import NavbarAdmin from '../User/NavbarAdmin/NavbarAdmin';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function HomeAdmin() {
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
            
        </div>
      </div>
    </div>
  )
}

export default HomeAdmin