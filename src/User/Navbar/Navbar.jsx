import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar-body">
      <ul>
        <li className="Logo">
          <button>FastTicket.com</button>
        </li>
        <li className="pesquisa">
          <input type="text" placeholder="..." className="texto-pesquisar" />
        </li>
        <li className="acessar-conta">
          <Link to="/login">Acesse sua conta</Link>
        </li>
        <li className="cadastroButtton">
          <button>
            <Link to="/cadastro">Cadastre-se</Link>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
