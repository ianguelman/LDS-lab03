import React, { useState, useEffect } from 'react'

import { TextField, Card, Typography, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './Register.sass'

import api from '../api';

export default function Login() {

    const usertypes = [
        { title: 'Aluno', type: 'aluno' },
        { title: 'Professor', type: 'professor' },
        { title: 'Empresa', type: 'empresa' }
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
    async function handleStoreUser(e) {
        e.preventDefault();
        try {
            await api.post('/login', user);
            window.alert("Usuário logado com sucesso!");
            window.location.href = '/saldo';
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
                        value={user.senha}
                        onChange={(e) => setUser({ ...user, senha: e.target.value })}
                    />
                    <Autocomplete
                        id="user-tipo"
                        options={usertypes}
                        getOptionLabel={(usertypes) => usertypes.title}
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue)
                            setUser({ ...user, tipo: value.type })
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue)
                            setUser({ ...user, tipo: value.type })
                        }}
                        renderInput={(params) => <TextField {...params} label="Selecionar tipo" variant="outlined" />}
                        />
                    <Button color="primary" type="submit"align="center">Logar</Button>
                </form>
                
            </Card>
        </div>
    )
}
