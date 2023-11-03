import React from "react";
import "./navbar.css";

function Navbar(){
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
              <a href="/">Acesse sua conta</a>
            </li>
            <li className="cadastro">
              <button>Cadastre-se</button>
            </li>
          </ul>
        </nav>
      );
}

export default Navbar;