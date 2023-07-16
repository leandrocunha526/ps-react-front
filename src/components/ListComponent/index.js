import React, { useEffect, useState } from "react";
import { TableStyleComponent } from "../../styles/TableStyleComponent/style";
import api from "../../services/api";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  const [data, setData] = useState([]);

  const valorTotal = (data.reduce((acc, cur) => acc + cur.valor, 0));
  const valorTotalFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valorTotal);

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

  return (
    <>
      <TableStyleComponent>
      <Link to="/">Ir para os filtros</Link>
        <h2>Tabela para listagem de transações</h2>
        <table>
            <thead>
              <tr>
                <th>Saldo total: {valorTotalFormatado}</th>
              </tr>
            </thead>
          </table>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Tipo</th>
              <th>Conta id</th>
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
                  <td>{transaction.contaId}</td>
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
                <td style={{ textAlign: "center" }} colSpan={6}>
                  <h5>Não há nenhuma transação</h5>
                </td>
              </tr>
            )}
          </tfoot>
        </table>
      </TableStyleComponent>
  </>
  );
};

export default HomeComponent;
