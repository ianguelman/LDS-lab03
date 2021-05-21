import React, { useState, useEffect } from 'react'

import { TextField, Card, Paper, Typography, Button } from '@material-ui/core';
import './Register.sass'

import api from '../api';

export default function ProfessoresRegister() {
    const [professor, setProfessor] = useState(
        {
            login: "",
            senha: "",
            cpf: "",
            intituicaoEnsino: "",
            departamento: ""
        }
    );
    async function handleStoreProfessor(e) {
        e.preventDefault();
        try {
            await api.post('/professores', professor);
            window.alert("Professor cadastrado com sucesso!");
        } catch {
            window.alert("Erro no cadastro do professor!");
        }
    }
    return (
        <div className="page">
            <Typography color="primary" variant="h4" align="left">Registrar Professor</Typography>
            <Card className="flex-to-start account-card" elevation="10">
                <form onSubmit={handleStoreProfessor}>
                    <TextField
                        variant="outlined"
                        placeholder="Login"
                        value={professor.login}
                        onChange={(e) => setProfessor({ ...professor, login: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="CPF"
                        value={professor.cpf}
                        onChange={(e) => setProfessor({ ...professor, cpf: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Instituição de Ensino"
                        value={professor.instituicaoEnsino}
                        onChange={(e) => setProfessor({ ...professor, instituicaoEnsino: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Departamento"
                        value={professor.departamento}
                        onChange={(e) => setProfessor({ ...professor, departamento: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Senha"
                        value={professor.senha}
                        onChange={(e) => setProfessor({ ...professor, senha: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Saldo"
                        value={professor.saldo}
                        onChange={(e) => setProfessor({ ...professor, saldo: e.target.value })}
                    />

                    <Button color="primary" type="submit"align="center">REGISTRAR</Button>
                </form>
                
            </Card>
        </div>
    )
}
