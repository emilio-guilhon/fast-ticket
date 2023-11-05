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
        <p className="titulo-demaisEventos">Demais eventos:</p>
         <div className="Demais-eventos">
            <div className="x"></div>
            <div className="y"></div>
            <div className="z"></div>
            
         </div>
      </div>
     </div>
     </>
  </div>
    );
}


export default Home_Visitante;