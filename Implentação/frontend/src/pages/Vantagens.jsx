import React, { useState, useEffect } from 'react';
import { TextField, Card, Typography, Button, Avatar } from '@material-ui/core';
import api from '../api';

function Vantagens() {
    const [vantagens, setVantagens] = useState([]);
    
    async function getVantagens() {
        try {
            const response = await api.get('/vantagens');
            setVantagens(response.data);
        } catch {
            window.alert("Erro ao retornar as vantagens!");
        }
    }

    async function handleReceiveVantagem(idVantagem, custo, loginEmpresa, descricao) {
        let login = JSON.parse(window.localStorage.getItem('user')).login;
        try {
            await api.post('/vantagens/resgatar', {
                resgatadoPor: login,
                idVantagem,
                custo,
                destinatario: loginEmpresa,descricao });
            alert("Resgate efetuado com sucesso! Utilize o código a seguir para utilizar a vantagem: " + idVantagem + custo + loginEmpresa)
        } catch {
            window.alert('Error, não foi possível restagar a vantagem');
        }
    }
    
    useEffect(() => {
        getVantagens();
    }, []);

    return (
        <>
            <div className="page">
                    <Typography color="primary" variant="h4" align="left">Listar Vantagens</Typography>
                    {
                        vantagens.length === 0 ? (
                            <Card className="flex-to-start account-card" elevation="10">
                                <Typography color="primary" variant="h4" align="left">Lista Vazia</Typography>
                            </Card>
                        ) : (
                            vantagens.map((vantagem) => (
                                <>
                                    {
                                        !vantagem.resgatadoPor && (
                                            <Card className="flex-to-start account-card" elevation="10">
                                                <Avatar alt="Remy Sharp" src={vantagem.foto} />
                                                
                                                <Typography color="primary" variant="h4" align="left">
                                                    {
                                                        `custo: ${vantagem.custo}`
                                                    }
                                                </Typography>
                                                <Typography color="primary" variant="h4" align="left">
                                                    {
                                                        `descrição: ${vantagem.descricao}`
                                                    }
                                                </Typography>
                                                <Typography color="primary" variant="h4" align="left">
                                                    {
                                                        `login empresa: ${vantagem.loginEmpresa}`
                                                    }
                                                </Typography>
                                                {
                                                (JSON.parse(window.localStorage.getItem('user')).tipo === "aluno") ?
                                                
                                                <Button
                                                    color="primary"
                                                    type="submit"
                                                    align="center"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleReceiveVantagem(vantagem.id, vantagem.custo, vantagem.loginEmpresa, vantagem.descricao);
                                                    }}
                                                >
                                                    RESGATAR
                                                </Button>
                                                : ''
                                                }
                                            </Card>
                                        )
                                    }
                                </>
                            ))
                        )
                    }
            </div>
        </>
    )
}

export default Vantagens;