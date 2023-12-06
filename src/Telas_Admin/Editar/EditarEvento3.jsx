import React, { useState, useCallback, useEffect } from "react";
import NavbarAdminEdits from "../../User/NavbarAdminEdits/NavbarAdminEdits";
import "./EditarEvento3.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import backimg from "../../User/Pictures/png-transparent-arrow-back-left-arrow-outline-icon-removebg-preview 3.png";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
function EditarEvento3() {
  const [tipoIngresso, setTipoIngresso] = useState("");
  const [Quantidade, setQuantidade] = useState("");
  const [ingressosAdicionados, setIngressosAdicionados] = useState([]);
  const [tiposEQuantidades, setTiposEquantidades] = useState([]);
  const location = useLocation();
  const eventoDataFull = location.state?.eventoDataFull;
  const eventoData3 = JSON.parse(localStorage.getItem("response")) || {};
  const {
    title,
    description,
    date,
    hour,
    show_type,
    priority,
    banner,
    cep,
    street,
    number,
    tickets,
  } = eventoData3;
  useEffect(() => {
    const tiposEQuantidadesAtualizados = tickets.map((ingresso) => ({
      tipoIngresso: ingresso.ticket_type,
      quantidadeDisponivel: ingresso.total_quantity,
    }));
    setTiposEquantidades(tiposEQuantidadesAtualizados);
  }, [tickets]);
  const handleDeleteTicket = useCallback(
    (index) => {
      const updatedTiposEQuantidades = tiposEQuantidades.filter(
        (_, i) => i !== index
      );
      setTiposEquantidades(updatedTiposEQuantidades);
    },
    [tiposEQuantidades, setTiposEquantidades]
  );
  const handleAddTicket = useCallback(() => {
    if (tipoIngresso && Quantidade) {
      const ingressoExistente = ingressosAdicionados.find(
        (ingresso) => ingresso.tipoIngresso === tipoIngresso
      );
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
        const novoIngresso = {
          tipoIngresso,
          Quantidade,
        };
        setIngressosAdicionados([...ingressosAdicionados, novoIngresso]);
      }
      setTipoIngresso("");
      setQuantidade("");
    } else {
      alert("Preencha todos os campos");
    }
  }, [
    tipoIngresso,
    Quantidade,
    ingressosAdicionados,
    setIngressosAdicionados,
    setTipoIngresso,
    setQuantidade,
  ]);
  const eventoId = localStorage.getItem("idShow");
  const district = "string";
  const handleNext = async (e) => {
    e.preventDefault();
    const eventoData3 = {
      title: title,
      description: description,
      date: date,
      hour: hour,
      show_type: show_type,
      priority: priority,
      banner: banner,

      address: {
        cep,
        district,
        number,
        street,
      },
      tickets: ingressosAdicionados.map((ingresso) => ({
        ticket_type: ingresso.tipoIngresso,
        total_quantity: parseInt(ingresso.Quantidade),
      })),
    };
    const jsonData = JSON.stringify(eventoData3);
    const bearer =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImV4cCI6MzA0ODQ4ODY5NDl9.o0d1AIzyF9GSRQG6abcAijkaWx_jaRq0RD4Ka3tjQIQ";
    const eventoId = localStorage.getItem("idShow");
    try {
      console.log("Enviando solicitação:", jsonData);
      const response = await axios.patch(
        `http://localhost:5000/show/${eventoId}`,
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearer}`,
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
        <Link to="/editareventos2">
          <img src={backimg} alt="backimg" className="voltarIcon"></img>
        </Link>
        <h1>Editar Evento</h1>
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
                    {tiposEQuantidades.map((ingresso, index) => (
                      <tr key={index}>
                        <td>{ingresso.tipoIngresso}</td>
                        <td>{ingresso.quantidadeDisponivel}</td>
                        <td>
                          <button
                            className="th-buttton"
                            onClick={() => handleDeleteTicket(index)}
                          >
                            Deletar
                          </button>
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

export default EditarEvento3;
