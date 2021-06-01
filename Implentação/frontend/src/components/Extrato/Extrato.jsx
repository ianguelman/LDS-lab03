import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import api from "../../api"

export default function Extrato() {

  const [transacoes, setTransacoes] = useState([{
    "loginRemetente": "Bananao",
    "motivo": "teste",
    "loginDestinatario": "Bananinha",
    "valor": 66.0,
    "id": 1
  }]);

  useEffect(() => {
    async function getExtrato() {
      const response = await api.post('/extrato/', JSON.parse(window.localStorage.getItem('user')));
      setTransacoes(response.data);
    }

    getExtrato();
  }, [])

  return ( 
    <TableContainer component={Paper}>
      <Table size="small" aria-label="extrato">
        <TableHead>
          <TableRow>
            <TableCell align="right"><b>Remetente</b></TableCell>
            <TableCell align="right"><b>Destinatario</b></TableCell>
            <TableCell align="right"><b>Valor</b></TableCell>
            <TableCell align="right"><b>Motivo</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transacoes.map((transacao) => (
            <TableRow key={transacao.id}>
              <TableCell align="right">{transacao.loginRemetente}</TableCell>
              <TableCell align="right">{transacao.loginDestinatario}</TableCell>
              <TableCell align="right">{transacao.valor}</TableCell>
              <TableCell align="right">{transacao.motivo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
