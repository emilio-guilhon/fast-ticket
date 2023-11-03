import React from "react";
import Navbar from "../../User/Navbar/Navbar";
import "./Home_visitante.css"

function Home_Visitante(){
    return(
  <div>
    <Navbar/>
     <>
     <div className="body">
      <div className="Eventos">
        <p className="titulo-principal">Eventos em destaque :</p>
         <div className="Evento-principal">
            
         </div>
      </div>
     </div>
     </>
  </div>
    );
}


export default Home_Visitante;