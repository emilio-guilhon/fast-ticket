import React, { useState, useEffect } from "react";
import NavbarAdminEdits from "../../User/NavbarAdminEdits/NavbarAdminEdits";
import "./CadastroEvento3.css";
import { Link } from "react-router-dom";
import backimg from "../../User/Pictures/png-transparent-arrow-back-left-arrow-outline-icon-removebg-preview 3.png";
import axios from "axios";

function CadastroEvento3() {
  const [tipoIngresso, setTipoIngresso] = useState("");
  const [Quantidade, setQuantidade] = useState("");
  const [ingressosAdicionados, setIngressosAdicionados] = useState([]);
  const eventoData2 = JSON.parse(localStorage.getItem("eventoData2")) || {};
  const {
    tituloEvento,
    descricao,
    data,
    hora,
    tipoEvento,
    cep,
    street,
    number,
    prioridade,
  } = eventoData2;

  const handleAddTicket = () => {
    // Verifica se ambos os campos estão preenchidos
    if (tipoIngresso && Quantidade) {
      // Verifica se já existe um ingresso do mesmo tipo na lista
      const ingressoExistente = ingressosAdicionados.find(
        (ingresso) => ingresso.tipoIngresso === tipoIngresso
      );

      // Se já existe, atualiza a quantidade
      if (ingressoExistente) {
        const novosIngressos = ingressosAdicionados.map((ingresso) =>
          ingresso.tipoIngresso === tipoIngresso
            ? {
                ...ingresso,
                Quantidade:
                  parseInt(ingresso.Quantidade) + parseInt(Quantidade),
              }
            : ingresso
        );

        setIngressosAdicionados(novosIngressos);
      } else {
        // Se não existe, adiciona um novo ingresso
        const novoIngresso = {
          tipoIngresso,
          Quantidade,
        };
        setIngressosAdicionados([...ingressosAdicionados, novoIngresso]);
      }

      // Limpa os campos após adicionar
      setTipoIngresso("");
      setQuantidade("");
    } else {
      alert("Preencha todos os campos");
    }
  };

  //ao clicar no icone da lixeira ela apagará a respectiva linha da tabela
  const handleDeleteTicket = (index) => {
    const updatedIngressos = [...ingressosAdicionados];
    updatedIngressos.splice(index, 1);
    setIngressosAdicionados(updatedIngressos);
  };

  const district = "string";
  const city = "Fortaleza";
  const handleNext = async (e) => {
    e.preventDefault();
    const eventoData3 = {
      title: tituloEvento,
      description: descricao,
      date: data,
      hour: hora,
      show_type: tipoEvento,
      priority: prioridade,
      adress: {
        cep,
        district,
        number,
        street,
        city,
      },
      tickets: ingressosAdicionados.map((ingresso) => ({
        ticket_type: ingresso.tipoIngresso,
        total_quantity: parseInt(ingresso.Quantidade),
      })),
    };

    //envia os dados para a API
    const jsonData = JSON.stringify(eventoData3);
    const bearer =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImV4cCI6MzA0ODQ4ODY5NDl9.o0d1AIzyF9GSRQG6abcAijkaWx_jaRq0RD4Ka3tjQIQ";
    try {
      console.log("Enviando solicitação:", jsonData);
      const response = await axios.post(
        "http://localhost:5000/show",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Resposta recebida:", response.data);
      alert("Cadastro feito com sucesso!");
    } catch (error) {
      if (error.response) {
        console.error(
          "Erro na solicitação - Resposta do servidor:",
          error.response.data
        );
      } else if (error.request) {
        console.error("Erro na solicitação - Sem resposta do servidor");
      } else {
        console.error("Erro na solicitação:", error.message);
      }
    }
  };
  return (
    <div className="body">
      <NavbarAdminEdits />
      <div className="contend">
        <Link to="/cadastroeventos2">
          <img src={backimg} alt="backimg" className="voltarIcon"></img>
        </Link>
        <h1>Cadastrar Evento</h1>
        <div className="forms">
          <div className="infoingresso">
            <div className="input-group">
              <p>Tipos de Ingressos:</p>
              <label>Tipo de Ingresso*:</label>
              <select
                className="tipoingresso"
                value={tipoIngresso}
                onChange={(e) => setTipoIngresso(e.target.value)}
              >
                <option value="">Selecione o tipo</option>
                <option value="Meia">Meia</option>
                <option value="Meia Solidária">Meia Solidária</option>
                <option value="Inteira">Inteira</option>
              </select>
            </div>
            <div className="input-group">
              <label>Quantidade*:</label>
              <input
                type="number"
                value={Quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
              />
            </div>

            <div className="addIngresso">
              <button onClick={handleAddTicket}>Adicionar ingresso +</button>
            </div>
          </div>

          <div className="infosGeral">
            <p className="addIngressosTitulo">Ingressos adicionados: </p>
            <div className="tabela-container">
              <div className="tabela">
                <table>
                  <thead>
                    <tr>
                      <th className="th-tipo-ingresso">Tipo de Ingresso</th>
                      <th className="th-quantidade">
                        Quantidade disponibilizada
                      </th>
                      <th className="th-deletar">Deletar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingressosAdicionados.map((ingresso, index) => (
                      <tr key={index}>
                        <td>{ingresso.tipoIngresso}</td>
                        <td>{ingresso.Quantidade}</td>
                        <td>
                          <button
                            className="th-buttton"
                            onClick={() => handleDeleteTicket(index)}
                          ></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="botoes">
            <Link to="/homeadmin">
              <button className="cancelar">Cancelar</button>
            </Link>

            <button onClick={handleNext} className="proximo">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroEvento3;
