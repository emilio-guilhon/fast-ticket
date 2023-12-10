import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../User/Navbar/Navbar";
import "./Home_visitante.css";

function Home_Visitante() {
  const [eventosPrioritarios, setEventosPrioritarios] = useState([]);
  const [eventosRegulares, setEventosRegulares] = useState([]);

  useEffect(() => {
    const bearer = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImV4cCI6MzA0ODQ4ODY5NDl9.o0d1AIzyF9GSRQG6abcAijkaWx_jaRq0RD4Ka3tjQIQ';

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/show', {});
        console.log(response.data.items);
        

        // Organiza os eventos com base na prioridade
        const eventos = response.data.items || [];
        const prioritarios = eventos.filter((evento) => evento.priority === true);
        console.log('prioritarios', prioritarios)
        const regulares = eventos.filter((evento) => evento.priority !== true);
        console.log('Regulares: ',regulares);

        setEventosPrioritarios(prioritarios);
        setEventosRegulares(regulares);
      } catch (error) {
        console.log('erro : ', error);
      }
    };

    fetchData();
  }, []);

  const handleGetinfos =async(eventId)=> {
    console.log(eventId);

    const response = await axios.get(`http://localhost:5000/show/${eventId}`);
    console.log(response.data);
    localStorage.setItem('infoShow',JSON.stringify(response));
  }
  return (
    <div>
      <Navbar />
      <>
      <div className="body">
            <div className="Eventos">
              <p className="titulo-principal">Eventos em destaque :</p>
              <div className="Evento-principal">
                  {eventosPrioritarios.map((evento) => (
                    <div key={evento.id} className="evento-container">
                      <img src={evento.banner} className="eventoBanner" alt="" />
                      <div className="infosPrioridade">
                        <p className="dataPrioridade">{evento.date}</p> 
                        <p className="tituloPrioridade">{evento.title}</p>
                        <p className="enderecoPrioridade">{evento.address.street}</p>
                        <Link to="/infosevento"><button className="verDetalhesPrioridade" onClick={()=>handleGetinfos(evento.id)}>Ver detalhes</button></Link>
                      </div>
                    </div>
                  ))}
                </div>
              <p className="titulo-demaisEventos">Demais eventos:</p>
              <div className="Demais-eventos">
                      {eventosRegulares.map((evento, index) => (
                        <div key={index} className={`evento evento-${index}`}>
                          <img src={evento.banner} className="eventobannerRegular" alt="eventoBannerRegular" />
                          <p className="dataRegular">{evento.date}</p>
                          <p className="tituloRegular">{evento.title}</p>
                          <p className="enderecoRegular">{evento.address.street}</p>
                          <Link to="/infosevento"><button className="verDetalhesRegular" onClick={()=>handleGetinfos(evento.id)}>Ver detalhes</button></Link>
                         
                        </div>
                      ))}
                    </div>
            </div>
          </div>
        </>
      
    </div>
  );
}

export default Home_Visitante;
