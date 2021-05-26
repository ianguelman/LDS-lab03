import React, {useState, useEffect} from 'react'
import api from '../api';
import { FormControl, InputLabel, Select, TextField, Button } from '@material-ui/core';
import Extrato from '../components/Extrato/Extrato';
export default function Saldo() {
    
    const [loginAluno, setLoginAluno] = useState("");
    const [value, setValue] = useState(0);
    const [saldo, setSaldo] = useState(0);
    const [alunos, setAlunos] = useState([{}]);
    const [motivo, setMotivo] = useState("")

    async function getSaldo() {
      const response = await api.post('/saldo/', JSON.parse(window.localStorage.getItem('user')));
      setSaldo(response.data.saldo);
    }
    
    async function getAlunos(){
      const response = await api.get('/alunos');
      setAlunos(response.data);
    }

    useEffect(() => {

      async function didMount() {
        await getAlunos()
        await getSaldo()
      }

      didMount()
    }, [])

    function defineTransaction(){
      return(
        {
          id: 0,
          loginRemetente: JSON.parse(window.localStorage.getItem('user')).login,
          loginDestinatario: loginAluno,
          valor: value,
          motivo: motivo,   
        })
    }

    function verifyDataIntegrity() {
      if (value < 0 || value > saldo) {
        return false;
      }
      return true;
    }

    return (
      saldo && alunos &&
      <>
        <div className="page saldo">
            <h1>Saldo: {saldo}</h1>
        </div>
        <div>
        <FormControl variant="outlined" className="form">
        {
        <>
          <InputLabel htmlFor="outlined-age-native-simple">Aluno a receber:</InputLabel>
            <Select
              native
              value={loginAluno}
              onChange={(event)=>{
                setLoginAluno(event.target.value)
              }}
              label="Age"
              inputProps={{
                name: 'age',
                id: 'outlined-age-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              {alunos.map((aluno => <option key={aluno.login} value={aluno.login}>{aluno.login}</option>))}
            </Select>
            <TextField 
              value={value}
              type="number"
              onChange={(event)=>{
                setValue(event.target.value)
                }}
              variant="outlined"
              placeholder="Valor"/>
              <TextField 
              value={motivo}
              onChange={(event)=>{
                setMotivo(event.target.value)
                }}
              variant="outlined"
              placeholder="Motivo"/>
            <Button onClick={async ()=>{
                console.log({transacao: defineTransaction(), user: JSON.parse(window.localStorage.getItem('user'))})
                if (verifyDataIntegrity()) {
                  try {
                    await api.post('/transacao', {transacao: defineTransaction(), user: JSON.parse(window.localStorage.getItem('user'))});
                    alert('Transação feita com sucesso!');
                    window.location.reload()
                  } catch {
                    alert('Erro na transação')
                  }
                } else {
                  alert('Valor inválido! Verifique se se possui saldo suficiente ou se é um valor inteiro positivo');
                }
            }}>Transferir </Button>
          </>
        }
        </FormControl>
        </div>

        <h1>Extrato</h1>
        <Extrato />
      </>
    )
}
