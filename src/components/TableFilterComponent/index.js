import React, { useEffect, useState } from "react";
import { TableStyleComponent } from "../../styles/TableStyleComponent/style";
import { Container, Form } from "./styles";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { ButtonComponent } from "../ButtonComponent";

const TableFilterComponent = () => {
  const [data, setData] = useState([]);
  const [nomeOperador, setNomeOperador] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [getValor, setGetValor] = useState([]);
  useEffect(() => {
    api
      .get("/list")
      .then((response) => {
        const data = response.data;
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    api.get("/list").then(({ data }) => {
      setGetValor(data);
    });
  }, []);
  const valor = getValor.reduce((acc, cur) => acc + cur.valor, 0);
  const valorFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);

  const valorTotal = data.reduce((acc, cur) => acc + cur.valor, 0);
  const valorTotalFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valorTotal);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `/filters?nomeOperador=${nomeOperador}&dataInicio=${dataInicio}&dataFim=${dataFim}`;
      const response = await api.get(url);
      const transaction = response.data;
      setData(transaction);
    } catch (error) {
      alert(
        "Sinto muito, nenhuma transação foi encontrada. Código 404. Error: " +
          error
      );
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="nomeOperador">Nome do operador</label>
          <input
            type="text"
            placeholder="Nome do operador"
            id="nomeOperador"
            name="nomeOperador"
            onChange={(e) => setNomeOperador(e.target.value)}
          />

          <label htmlFor="dataIncio">Data do início</label>
          <input
            type="date"
            id="dataInicio"
            name="dataInicio"
            onChange={(e) => setDataInicio(e.target.value)}
          />

          <label htmlFor="dataFim">Data do fim</label>
          <input
            type="date"
            id="dataFim"
            name="dataFim"
            onChange={(e) => setDataFim(e.target.value)}
          />
          <ButtonComponent texto="Filtrar" />
        </Form>
      </Container>
      <TableStyleComponent>
        <Link to="/list">Ir para a tabela apenas listagem</Link>
        <h2>Tabela para listagem de transações</h2>
        <table>
          <thead>
            <tr>
              <th>Saldo total: {valorFormatado}</th>
              <th>Saldo total no período: {valorTotalFormatado}</th>
              <th>Quantidade de transações: {data.length}</th>
            </tr>
          </thead>
        </table>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Nome do operador</th>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.tipo}</td>
                  <td>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(transaction.valor)}
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("pt-BR", {
                      dateStyle: "full",
                      timeStyle: "short",
                      timeZone: "America/Sao_Paulo",
                    }).format(new Date(transaction.dataTranferencia))}
                  </td>
                  <td>{transaction.nomeOperadorTransacao || "NULL"}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            {!data.length && (
              <tr>
                <td style={{ textAlign: "center" }} colSpan={5}>
                  <h5>Por enquanto não há dados para listagem</h5>
                </td>
              </tr>
            )}
          </tfoot>
        </table>
      </TableStyleComponent>
    </>
  );
};

export default TableFilterComponent;
