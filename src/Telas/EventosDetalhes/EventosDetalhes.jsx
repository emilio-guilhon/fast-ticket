import React, { useState } from 'react'
import Navbar from '../../User/Navbar/Navbar';
import './EventosDetalhes.css';
import relogioIcon from './../../User/Pictures/relogioIcon.png';
import enderecoIcon from './../../User/Pictures/enderecoIcon.png';
import  tipoShowIcon  from './../../User/Pictures/showTypeIcon.png';


function EventosDetalhes() {
  const infoShow = JSON.parse(localStorage.getItem('infoShow'));
  const { title, description, date, hour, show_type, priority,banner, address, tickets } = (infoShow.data);
  const {cep,street,number} =address;
  const [eventoInfo] = useState(infoShow.data || []);
  console.log('evento: ', eventoInfo);
  
     
  return (
    <div className="body">
    <Navbar />
    <div className="infosContainer">
      <div className="BannerEButton">
      <img src={banner} alt="" className='Banner' />
       
      </div>
        <div className="enderecoInfo">
          <p className='enderecoInfoTitulo'>Informações: </p>
          <div className="infoRow1">
        <p><img src={relogioIcon} className='img' alt="" /> {`${date} às ${hour}`}</p>
        <p><img src={enderecoIcon} className='img' alt="" /> {` ${street} - ${number}, Fortaleza-CE, ${cep}`}</p>
      </div>
      <div className="infoRow">
        <p><img className='img' src={tipoShowIcon} alt="" />{show_type}</p>
        </div>
        <div className='Descricao'>
          <p className='DescricaoTitulo'>Descrição do evento: </p>
          {description}</div>
    </div>
    </div>
  </div>
  )
}

export default EventosDetalhes