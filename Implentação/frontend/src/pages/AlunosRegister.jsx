import React, { useState } from 'react'

import { TextField, Card, Typography, Button, Select } from '@material-ui/core';
import './Register.sass'

import api from '../api';

export default function AlunosRegister() {
    const [aluno, setAluno] = useState(
        {
            cpf: "",
            login: "",
            email: "",
            senha: "",
            rg: "",
            endereco: "",
            instituicaoEnsino: "",
            curso: "",
            saldo: ""
        }
    );

    const instituicoes = ["PUC MG", "PUC Rio", "UFRS", "USP", "FAVESP", "UNIESQUINA", "UFMG", "IBMEC" ]    

    async function handleStoreAluno(e) {
        e.preventDefault();
        try {
            await api.post('/alunos', aluno);
            window.alert("Aluno cadastrado com sucesso!");
        } catch {
            window.alert("Erro no cadastro do aluno!");
        }
    }
    return (
        <div className="page">
            <Typography color="primary" variant="h4" align="left">Registrar Aluno</Typography>
            <Card className="flex-to-start account-card" elevation="10">
                <form onSubmit={handleStoreAluno}>
                    <TextField
                        variant="outlined"
                        placeholder="CPF"
                        value={aluno.cpf}
                        onChange={(e) => setAluno({ ...aluno, cpf: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Username"
                        value={aluno.login}
                        onChange={(e) => setAluno({ ...aluno, login: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Email"
                        value={aluno.email}
                        onChange={(e) => setAluno({ ...aluno, email: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Senha"
                        value={aluno.senha}
                        onChange={(e) => setAluno({ ...aluno, senha: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Rg"
                        value={aluno.rg}
                        onChange={(e) => setAluno({ ...aluno, rg: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Endereço"
                        value={aluno.endereco}
                        onChange={(e) => setAluno({ ...aluno, endereco: e.target.value })}
                    />
                    <Select
                        native
                        value={aluno.instituicaEnsino}
                        onChange={(e)=>{
                            setAluno({ ...aluno, instituicaoEnsino: e.target.value })
                        }}
                        label="Instituição de Ensino"
                        inputProps={{
                            name: 'instituicaoEnsino',
                            id: 'outlined-age-native-simple',
                        }}
                        variant="outlined"
                        >
                        {instituicoes.map((instituicao => <option key={instituicao} value={instituicao}>{instituicao}</option>))}
                    </Select>
                    <TextField
                        variant="outlined"
                        placeholder="Curso"
                        value={aluno.curso}
                        onChange={(e) => setAluno({ ...aluno, curso: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Saldo"
                        value={aluno.saldo}
                        onChange={(e) => setAluno({ ...aluno, saldo: e.target.value })}
                    />
                    <Button color="primary" type="submit"align="center">REGISTRAR</Button>
                </form>
                
            </Card>
        </div>
    )
}
