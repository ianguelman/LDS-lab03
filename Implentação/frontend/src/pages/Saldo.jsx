import React, {useState, useEffect} from 'react'
import api from '../api';
import { FormControl, InputLabel, Select, TextField, Button } from '@material-ui/core';
export default function Saldo() {
    
    const [loginAluno, setLoginAluno] = useState("");
    const [value, setValue] = useState(0);
    const [saldo, setSaldo] = useState(0);
    const [alunos, setAlunos] = useState([{}]);

    const [transaction, setTransaction] = useState();

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

    function defineTransaction(value){
      setValue(value)
      setTransaction(
        {
          'id': 0,
          'loginProfessor': JSON.parse(window.localStorage.getItem('user')).login,
          'loginAluno': loginAluno,
          'valor': value       
        })
    }

    return (
      saldo && alunos &&
      <>
        <div className="saldo">
            <h1>Saldo: {saldo}</h1>
        </div>
        <div>
        <FormControl variant="outlined" className="form">
        {
        JSON.parse(window.localStorage.getItem('user')).tipo == 'professor' &&
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
              onChange={(event)=>{
                defineTransaction(event.target.value)
                }}
              variant="outlined"
              placeholder="Valor"/>
            <Button onClick={()=>{
                api.post('/transacao', transaction);
                alert('Transação feita com sucesso!');
                window.location.reload()
            }}>Transferir </Button>
          </>
        }
        </FormControl>
        </div>
      </>
    )
}
