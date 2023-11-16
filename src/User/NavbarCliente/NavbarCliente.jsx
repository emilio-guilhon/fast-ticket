import React, { useEffect, useState } from 'react';
import imagem from '../Pictures/image 20.png';
import iconImg from '../Pictures/image 22.png';
import "./NavbarCliente.css";
import axios from 'axios';
import { useParams ,Link } from 'react-router-dom';
import { idUser } from '../../Telas/Login/Login';

axios.interceptors.request.use(
  (config) => {
    const bearer =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImV4cCI6MzA0ODQ4ODY5NDl9.o0d1AIzyF9GSRQG6abcAijkaWx_jaRq0RD4Ka3tjQIQ';
    //console.log(bearer);
    if (bearer) {
      config.headers.Authorization = `Bearer ${bearer}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function NavbarCliente() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [areSubitemsVisible, setAreSubitemsVisible] = useState(false); // Novo estado para controlar a visibilidade dos subitens
  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${idUser}`);
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUser();
  }, [userId]);

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
          <li className="pesquisa">
            <input type="text" placeholder="..." className="texto-pesquisar" />
          </li>
          <li className="Perfil">
            <img src={imagem} alt="Imagem" className="imagemFt" />

            {/* Adiciona os subitens que serão visíveis quando o estado for true */}
            <div className={`perfil-container ${areSubitemsVisible ? 'open' : ''}`}>
              <button className="perfilInfo" onClick={toggleSubitems}>
                {user ? user.name : 'Carregando...'}
              </button>

              <img onClick={toggleSubitems} src={iconImg} alt="mostrarMais" className="mostrarMais" />

              {areSubitemsVisible && (
                <ul className="subitems">
                  <li>Meus ingressos</li>
                  <li>Meus histórico</li>
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

export default NavbarCliente