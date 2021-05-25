import React, { useState, useEffect } from 'react'

import { TextField, Card, Paper, Typography, Button } from '@material-ui/core';
import './Register.sass'

import api from '../api';

export default function EmpresasRegister() {
    const [empresa, setEmpresa] = useState(
        {
            cnpj: "",
            nome: "",
            vantagens: 0
        }
    );
    async function handleStoreEmpresa(e) {
        e.preventDefault();
        try {
            await api.post('/empresas', empresa);
            window.alert("Empresa cadastrado com sucesso!");
        } catch {
            window.alert("Erro no cadastro da empresa!");
        }
    }
    return (
        <div className="page">
            <Typography color="primary" variant="h4" align="left">Registrar Empresa</Typography>
            <Card className="flex-to-start account-card" elevation="10">
                <form onSubmit={handleStoreEmpresa}>
                    <TextField
                        variant="outlined"
                        placeholder="CNPJ"
                        value={empresa.cnpj}
                        onChange={(e) => setEmpresa({ ...empresa, cnpj: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Nome Fantasia"
                        value={empresa.nome}
                        onChange={(e) => setEmpresa({ ...empresa, nome: e.target.value })}
                    />

                    <Button color="primary" type="submit"align="center">REGISTRAR</Button>
                </form>
                
            </Card>
        </div>
    )
}
