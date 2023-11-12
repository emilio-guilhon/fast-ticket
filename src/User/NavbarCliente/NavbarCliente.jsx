import React from 'react'
import {Link} from 'react-router-dom'

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
            <li>
              <button className='Perfil'>Teste de Perfil</button>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default NavbarCliente