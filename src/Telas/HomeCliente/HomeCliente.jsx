import React from "react";
import NavbarCliente from "../../User/NavbarCliente/NavbarCliente";

function HomeCliente() {
  return (
    <div>
      <>
        <NavbarCliente />
        <>
          <div className="body">
            <div className="Eventos">
              <p className="titulo-principal">Eventos em destaque :</p>
              <div className="Evento-principal"></div>
              <p className="titulo-demaisEventos">Demais eventos:</p>
              <div className="Demais-eventos">
                <div className="x"></div>
                <div className="y"></div>
                <div className="z"></div>
              </div>
            </div>
          </div>
        </>
      </>
    </div>
  );
}

export default HomeCliente;
