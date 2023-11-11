import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../User/Navbar/Navbar";
import "./Home_visitante.css"


function Home_Visitante() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        
        const response = await axios.get("http://localhost:5000/eventos");
        setEventos(response.data);
        console.log('dfwfewfwfwewfbwe')
        console.log('dados: ',response.data);
      } catch (error) {
        console.log("Erro na solicitação GET:", error);
      }
    };

    fetchEventos();
  }, []);
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