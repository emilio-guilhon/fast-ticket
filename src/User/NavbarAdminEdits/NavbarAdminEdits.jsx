import React,{useState} from 'react';
import imagem from '../Pictures/image 20.png';
import iconImg from '../Pictures/image 22.png';
import {Link} from 'react-router-dom'

function NavbarAdminEdits() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [areSubitemsVisible, setAreSubitemsVisible] = useState(false); // Novo estado para controlar a visibilidade dos subitens

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };
    
      const toggleSubitems = () => {
        setAreSubitemsVisible(!areSubitemsVisible);
      };
  return (
    <div>
    <nav className="navbar-body">
      <ul>
        <li className="Logo">
          <button onClick={toggleSidebar}>FastTicket.com</button>
        </li>
        <li className="Perfil">
          <img src={imagem} alt="Imagem" className="imagemFt" />

          {/* Adiciona os subitens que serão visíveis quando o estado for true */}
          <div className={`perfil-container ${areSubitemsVisible ? 'open' : ''}`}>
          
            <button className="perfilInfo" onClick={toggleSubitems}>
              Admin
              
            </button>

            <img onClick={toggleSubitems} src={iconImg} alt="mostrarMais" className="mostrarMais" />

            {areSubitemsVisible && (
              <ul className="subitems">
                <li className="logout-item">
                <Link to="/login">Sair</Link>
                </li>
                
              </ul>
            )}
          </div>
        </li>
      </ul>
    </nav>
  </div>
);
}

export default NavbarAdminEdits