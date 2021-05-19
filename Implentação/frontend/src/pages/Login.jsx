import React, { useState, useEffect } from 'react'

import { TextField, Card, Paper, Typography, Button } from '@material-ui/core';
import './Register.sass'

import api from '../api';

export default function Login() {
    const [userType, setUserType] = userState(); 
    const [user, setUser] = useState(
        {
            login: "",
            senha: "",
            type: ""
        }
    );
    async function handleStoreUser(e) {
        e.preventDefault();
        try {
            await api.post('/login', user);
            window.alert("Usuário logado com sucesso!");
            window.location.href = '/saldo';
        } catch {
            window.alert("Erro no cadastro do user!");
        }
    }
    return (
        <div className="page">
            <Typography color="primary" variant="h4" align="left">Login</Typography>
            <Card className="flex-to-start account-card" elevation="10">
                <form onSubmit={handleStoreUser}>
                    <TextField
                        variant="outlined"
                        placeholder="CPF"
                        value={user.cpf}
                        onChange={(e) => setUser({ ...user, cpf: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Username"
                        value={user.login}
                        onChange={(e) => setUser({ ...user, login: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Email"
                        value={aluno.type}
                        onChange={(e) => setUser({ ...aluno, email: e.target.value })}
                    />

                    <Button color="primary" type="submit"align="center">REGISTRAR</Button>
                </form>
                
            </Card>
        </div>
    )
}
