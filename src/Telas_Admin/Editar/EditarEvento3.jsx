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
  const { tickets } = eventoData3;
  useEffect(() => {
    const tiposEQuantidadesAtualizados = tickets.map((ingresso) => ({
      tipoIngresso: ingresso.ticket_type,
      quantidadeDisponivel: ingresso.total_quantity,
    }));
    setTiposEquantidades(tiposEQuantidadesAtualizados);
  }, []);
  const handleDeleteTicket = useCallback(
    (tipoIngressoParaDeletar) => {
      const novosIngressos = ingressosAdicionados.filter(
        (ingresso) => ingresso.tipoIngresso !== tipoIngressoParaDeletar
      );
      setIngressosAdicionados(novosIngressos);

      const novosTiposEQuantidades = tiposEQuantidades.filter(
        (ingresso) => ingresso.tipoIngresso !== tipoIngressoParaDeletar
      );
      setTiposEquantidades(novosTiposEQuantidades);
    },
    [ingressosAdicionados, tiposEQuantidades]
  );
  const handleAddTicket = useCallback(() => {
    if (tipoIngresso && Quantidade) {
      const ingressoExistenteIndex = tiposEQuantidades.findIndex(
        (ingresso) => ingresso.tipoIngresso === tipoIngresso
      );
      let novosTiposEQuantidades = [...tiposEQuantidades];

      if (ingressoExistenteIndex !== -1) {
        // Atualiza a quantidade do ingresso existente
        novosTiposEQuantidades[ingressoExistenteIndex] = {
          ...novosTiposEQuantidades[ingressoExistenteIndex],
          quantidadeDisponivel:
            parseInt(
              novosTiposEQuantidades[ingressoExistenteIndex]
                .quantidadeDisponivel
            ) + parseInt(Quantidade),
        };
      } else {
        // Adiciona um novo ingresso
        novosTiposEQuantidades.push({
          tipoIngresso,
          quantidadeDisponivel: parseInt(Quantidade),
        });
      }

      setTiposEquantidades(novosTiposEQuantidades);
      setTipoIngresso("");
      setQuantidade("");
    } else {
      alert("Preencha todos os campos");
    }
  }, [tipoIngresso, Quantidade, tiposEQuantidades]);
  const handleNext = async (e) => {
    e.preventDefault();
    const eventoData3 = {
      ...eventoDataFull,
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
                    {tiposEQuantidades.map((ingresso) => (
                      <tr key={ingresso.tipoIngresso}>
                        <td>{ingresso.tipoIngresso}</td>
                        <td>{ingresso.quantidadeDisponivel}</td>
                        <td>
                          <button
                            className="th-buttton"
                            onClick={() =>
                              handleDeleteTicket(ingresso.tipoIngresso)
                            }
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
