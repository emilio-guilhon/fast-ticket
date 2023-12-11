import React, { useState } from 'react';
import NavbarCliente from "../../User/NavbarCliente/NavbarCliente";
import './EventosDetalhes.css';
import relogioIcon from './../../User/Pictures/relogioIcon.png';
import enderecoIcon from './../../User/Pictures/enderecoIcon.png';
import tipoShowIcon from './../../User/Pictures/showTypeIcon.png';
import addTicketIcon from './../../User/Pictures/addTicketIcon.png';
import Modal from 'react-modal';
import axios from 'axios';

function EventosDetalhesCliente() {
  const infoShow = JSON.parse(localStorage.getItem('infoShow'));
  const { id,title, description, date, hour, show_type, priority, banner, address, tickets } = (infoShow.data);
  const { cep, street, number } = address;
  const [eventoInfo] = useState(infoShow.data || []);
  const [ticketsInfo] = useState([]);
  const [countInteira, setCountInteira] = useState(0);
  const [countMeia, setCountMeia] = useState(0);
  const [countMeiaSolidaria,setCountMeiaSolidaria] = useState(0);
  const [ticket_qnt,setTicket_qnt] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('UserToken');
  const [selectedTicketType, setSelectedTicketType] = useState('');

 console.log(eventoInfo)


  const handleOpenModal =()=>{
    setIsOpen(true);
  }
  const handleCloseModal=()=>{
    setIsOpen(false);
  }
  const handleShowTicket = (ticket_type) => {
    setSelectedTicketType(ticket_type);
    // Verificar se o total de ingressos selecionados é menor que 2
    if (countInteira + countMeia + countMeiaSolidaria < 2) {
      if (ticket_type === 'Inteira') {
        setCountInteira(countInteira + 1);
      } else if (ticket_type === 'Meia') {
        setCountMeia(countMeia + 1);
      } else if (ticket_type === 'Meia Solidária') {
        setCountMeiaSolidaria(countMeiaSolidaria + 1);
      }
    }
  
    // Restrição adicional para a combinação de ingressos
    if (countInteira === 1 && countMeia === 1) {
      setCountInteira(0);
      setCountMeiaSolidaria(0);
    }
    if (countMeia === 1 && countMeiaSolidaria === 1) {
      setCountMeia(0);
    }
    if (countMeiaSolidaria === 1 && countInteira === 1) {
      setCountMeiaSolidaria(0);
      setCountMeia(0);
    }
  };
  //função que vai enviar os dados para a Api
  const handleSendRequest = async () => {
    // Cria um array para armazenar objetos de ingresso
    const ingressosArray = [];
  
    // Verifica se há ingressos Inteira selecionados
    if (countInteira > 0) {
      ingressosArray.push({
        ticket_type: 'Inteira',
        quantity: countInteira,
      });
    }
  
    // Verifica se há ingressos Meia selecionados
    if (countMeia > 0) {
      ingressosArray.push({
        ticket_type: 'Meia',
        quantity: countMeia,
      });
    }
    //Verifica se há ingressos Meia Solidária selecionados
    if (countMeiaSolidaria > 0) {
      ingressosArray.push({
        ticket_type: 'Meia Solidária',
        quantity: countMeiaSolidaria,
      });
    }
  
    // Enviar para a Api
    console.log(ingressosArray);
    const userToken = `Bearer + ${token}`
    try {
      const response = await axios.post(`http://localhost:5000/show/${id}/ticket`, { tickets: ingressosArray }, {
        headers: {
          Authorization: 'Bearer '+ token,
        },
      });
      console.log('resposta: ',response.data);
      console.log('Bearer ' + token)
      console.log('user token : ',userToken);
      if (response.status === 200 || response.status ===201) {
        console.log('Sucesso!');
      }
    } catch (error) {
      console.log('Erro:', error);
    }
    handleOpenModal(true);
  };
  
  return (
    <div className="body">
      <NavbarCliente />
      <Modal
        isOpen ={modalIsOpen}
        onRequestClose={handleCloseModal}
        className='modal-contend'
      >
        <p>Ingressos adicionados com sucesso!</p>
        <button onClick={handleCloseModal}>Ok</button>
      </Modal>
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
          <div className="ingressosTable">
            <p className='IngressosTitulo'>Ingressos disponíveis: </p>
            {tickets.map((ticket, index) => (
  <div key={index}>
    <div className={`ticketContainer ${ticket.ticket_type === 'Inteira' ? 'inteiraBotao' : (ticket.ticket_type === 'Meia' ? 'meiaBotao' : 'meiaSolidariaBotao')}`} onClick={() => handleShowTicket(ticket.ticket_type)}>
      <div className='ticketInfo'>
        {ticket.ticket_type === 'Meia Solidária' ? 'Meia Solidária' : (ticket.ticket_type === 'Meia' ? 'Meia' : 'Inteira')}: Grátis <br />
        Ingressos disponíveis: {ticket.total_quantity} <br />
      </div>
      <div className='ticketAdd'>
        <img className='ticketAddIcon' src={addTicketIcon} alt="" />
      </div>
      <div className="countTicket">
        {ticket.ticket_type === 'Meia Solidária' ? countMeiaSolidaria : (ticket.ticket_type === 'Meia' ? countMeia : countInteira)}
      </div>
    </div>
  </div>
))}
            <p className='obs'>Obs: Só é possível garantir dois ingressos por usuário</p>
            <button className='salvarCompra' onClick={()=>handleSendRequest(countInteira,countMeia)}>Salvar compra</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventosDetalhesCliente;
