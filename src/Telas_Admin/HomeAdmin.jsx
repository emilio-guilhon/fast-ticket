import React from 'react';
import './HomeAdmin.css';
import NavbarAdmin from '../User/NavbarAdmin/NavbarAdmin';

function HomeAdmin() {

  const teste =()=> alert('teste');
  return (
    <div className="home_body">
      <NavbarAdmin />
      <div className="eventos">
        <div className="cadastro">
          <button className='cadastroButton' onClick={teste}>Cadastro +</button>
        </div>
        <p className='Eventos-titulo'>Eventos:</p> 
        <div className="container_eventos">
            
        </div>
      </div>
    </div>
  )
}

export default HomeAdmin