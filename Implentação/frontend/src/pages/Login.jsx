import React, { useState, useEffect } from 'react';
import { TextField, Card, Typography, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './Register.sass'

import api from '../api';

export default function Login() {

    const usertypes = [
        { title: 'Aluno', type: 'aluno' },
        { title: 'Professor', type: 'professor' },
        { title: 'Empresa', type: 'empresa' },
    ]

    const [value, setValue] = React.useState(usertypes[0]);
    const [inputValue, setInputValue] = React.useState('');

    const [user, setUser] = useState(
        {
            login: "",
            password: "",
            tipo: ""
        }
    );
    function typeIsValid(currentType) {
        return usertypes.filter((optionType) => currentType === optionType.type);
    }
    function verifyEmptyField(text) {
        return text === "";
    }
    async function handleStoreUser(e) {
        e.preventDefault();
        if (!typeIsValid()) {
            window.alert("Selecione uma entidade válida um aluno um professor ou uma empresa!");
            return;
        }
        if (verifyEmptyField(user.login) || verifyEmptyField(user.password)) {
            window.alert("campos vazios");
            return;
        }
        try {
            const response = await api.post('/login', user);
            if (response.data.response === "true") {
                window.alert("Usuário logado com sucesso!");
                window.location.href = '/saldo';
            } 
        } catch {
            window.alert("Erro no login!");
        }
    }

    return (
        <div className="page">
            <Typography color="primary" variant="h4" align="left">Login</Typography>
            <Card className="flex-to-start account-card" elevation="10">
                <form onSubmit={handleStoreUser}>
                    <TextField
                        variant="outlined"
                        placeholder="Login"
                        value={user.login}
                        onChange={(e) => setUser({ ...user, login: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Senha"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    <Autocomplete
                        id="user-tipo"
                        options={usertypes}
                        getOptionLabel={(usertype) => usertype.type}
                        onChange={(_, content) => {
                            if (content) {
                                setUser({ ...user, tipo: `${(content ? content.type : '')}`});
                                setValue(content);
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="Selecionar tipo" variant="outlined" />}
                        />
                    <Button color="primary" type="submit"align="center">Logar</Button>
                </form>
                
            </Card>
        </div>
    )
}
