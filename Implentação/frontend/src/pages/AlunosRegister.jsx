import React, { useState, useEffect } from 'react'

import { TextField, Card, Paper, Typography, Button } from '@material-ui/core';
import './AlunosRegister.sass'

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
            curso: ""
        }
    );
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
                    <TextField
                        variant="outlined"
                        placeholder="Instituição de ensino"
                        value={aluno.instituicaoEnsino}
                        onChange={(e) => setAluno({ ...aluno, instituicaoEnsino: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Curso"
                        value={aluno.curso}
                        onChange={(e) => setAluno({ ...aluno, curso: e.target.value })}
                    />

                    <Button color="primary" type="submit"align="center">REGISTRAR</Button>
                </form>
                
            </Card>
        </div>
    )
}
