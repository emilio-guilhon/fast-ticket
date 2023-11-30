import React, { useState, useEffect } from "react";
import "./HomeCliente.css";
import NavbarCliente from "../../User/NavbarCliente/NavbarCliente";
import axios from "axios";
import { Link } from "react-router-dom";

function HomeCliente() {
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

        setEventosPrioritarios(prioritarios);
        setEventosRegulares(regulares);
      } catch (error) {
        console.log('erro : ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <>
        <NavbarCliente />
        <>
          <div className="body">
            <div className="Eventos">
              <p className="titulo-principal">Eventos em destaque :</p>
              <div className="Evento-principal">
                  {eventosPrioritarios.map((evento) => (
                    <div key={evento.id} className="evento-container">
                      <img src={evento.banner} className="eventoBanner" alt="" />
                      <div className="infosPrioridade">
                        <p className="dataPrioridade">{evento.date}</p> {/* Substitua isso pela propriedade correta */}
                        <p className="tituloPrioridade">{evento.title}</p>
                        <p className="enderecoPrioridade">{evento.address.street}</p>
                        <Link to ="infosevento"><button className="verDetalhesPrioridade">Ver detalhes</button></Link>
                      </div>
                    </div>
                  ))}
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
      </>
    </div>
  );
}

export default HomeCliente;
