import React from 'react';
import imagem from '../Pictures/image 20.png';
import iconImg from '../Pictures/image 22.png';
import "./NavbarCliente.css";

function NavbarCliente() {
    return (
      <div>
        <nav className="navbar-body">
          <ul>
            <li className="Logo">
              <button>FastTicket.com</button>
            </li>
            <li className="pesquisa">
              <input type="text" placeholder="..." className="texto-pesquisar" />
            </li>
            <li className='Perfil'>
              <img src={imagem} alt="Imagem" className='imagemFt' />
              <button className='perfilInfo'>Informações do Usuário</button>
              <img src={iconImg} alt='mostrarMais' className='mostrarMais'/>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
  
  export default NavbarCliente;
  