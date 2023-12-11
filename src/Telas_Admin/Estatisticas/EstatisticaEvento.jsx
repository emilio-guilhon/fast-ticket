import React, { useState, useEffect } from 'react';
import NavbarAdmin from '../../User/NavbarAdmin/NavbarAdmin';
import './EstatisticaEvento.css';
import { useLocation,Link } from 'react-router-dom';
import relogioIcon from './../../User/Pictures/relogioIcon.png';
import enderecoIcon from './../../User/Pictures/enderecoIcon.png';
import tipoShowIcon from './../../User/Pictures/showTypeIcon.png';
import axios from 'axios';

function EstatisticaEvento() {
  const location = useLocation();
  const id = location.state?.eventId || {};
  const [tituloEvento, setTituloEvento] = useState('');
  const [dataEvento, setDataEvento] = useState('');
  const [hora, setHora] = useState('');
  const [bannerEvento, setBannerEvento] = useState('');
  const [cepEvento, setCepEvento] = useState('');
  const [streetEvento, setStreetEvento] = useState('');
  const [numero, setNumero] = useState('');
  const [tipoShow, setTipoShow] = useState('');
  const [ingressos, setIngressos] = useState([]);
  const [ingressoVendido,setIngressoVendido] =useState('');
  const [ingressoCancelado, setIngressoCancelado] = useState(0);
  const cancelados =useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/show/${id}/statistics`, {
          headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImV4cCI6MzA0ODQ4ODY5NDl9.o0d1AIzyF9GSRQG6abcAijkaWx_jaRq0RD4Ka3tjQIQ',
          },
          
        });
         
        const {
          title,
          date,
          hour,
          banner,
          address: { cep, street, number },
          show_type,
          tickets,
          tickets_sold,
          tickets_canceled
        } = response.data;

        setTituloEvento(title);
        setDataEvento(date);
        setHora(hour);
        setBannerEvento(banner);
        setCepEvento(cep);
        setStreetEvento(street);
        setNumero(number);
        setTipoShow(show_type);
        setIngressos(tickets);
        setIngressoVendido(tickets_sold);
        setIngressoCancelado(tickets_canceled);

      } catch (error) {
        console.error('Erro na requisição:', error.message);
      }
    };

    fetchData();

  }, [id]);

  
  return (
    <div className='body'>
      <NavbarAdmin />
      <div className="conteudo">
        <div className="container-estatistica">
          <h1>Estatísticas do evento</h1>
          <div className="infosEstatistica">
            <img src={bannerEvento} alt="" className='bannerEstatistica' />
            <p className='informacoesTitulo'>Informações:</p>
            <div className='informacoes'>
                <div className="infoRow1">
                <p><img src={relogioIcon} className='img' alt="" /> {`${dataEvento} às ${hora}`}</p>
                <p><img src={enderecoIcon} className='img' alt="" /> {` ${streetEvento} - ${numero}, Fortaleza-CE, ${cepEvento}`}</p>
                </div>
                <div className="infoRow2">
                <p><img className='img' src={tipoShowIcon} alt="" />{tipoShow}</p>
                </div>
            
            </div>
            <p className='ingressosTitulo'>Ingressos:</p>
            <div className="ingressos">
              <table className='tabela'>
                <thead>
                  <tr>
                    <th>Tipo de ingresso</th>
                    <th>Nº de ingressos disponibilizados</th>
                    <th>Nº de ingressos comprados</th>
                    <th>Nº de ingressos cancelados</th>
                  </tr>
                </thead>
                <tbody>
                      {ingressos.map((ingresso, index) => (
                        <tr key={index}>
                          <td>{ingresso.ticket_type}</td>
                          <td>{ingresso.total_quantity}</td>
                          <td>{ingresso.total_sold}</td>
                          <td>{ingressoCancelado}</td>
                        </tr>
                      ))}
                    </tbody>
              </table>
            </div>
            <div className="botaoVoltar">
                <Link to='/homeadmin'>
                <button className='voltar'>Voltar</button>
                </Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EstatisticaEvento;
