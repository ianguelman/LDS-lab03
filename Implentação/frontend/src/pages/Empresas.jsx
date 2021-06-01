import React, { useEffect, useState } from 'react'
import { Card, Typography } from '@material-ui/core';
import './Default.sass';
import api from '../api';

export default function Empresas() {
    const [empresas, setEmpresas] = useState([]);

    async function getEmpresas() {
        try {
            const response = await api.get('/empresas');
            setEmpresas(response.data);
        } catch {
            window.alert('Erro ao retornar os dados dos empresas');
        }
    }
    useEffect(() => {
        async function didMount() {
            await getEmpresas();
        }
        didMount();
    }, []);
    return (
        <div className="page empresas">
            {
                empresas.map((empresa) => (
                    <Card className="flex-to-start account-card" elevation={10}>
                        <div className="new-experience">
                            <Typography color="primary" variant="h6" align="left">
                                {
                                "CNPJ: " + empresa.cnpj
                                }
                            </Typography>
                        </div>

                        <div className="new-experience">
                            <Typography color="primary" variant="h6" align="left">
                                {
                                "Nome: " + empresa.nome
                                }
                            </Typography>
                        </div>

                        <div className="new-experience">
                            <Typography color="primary" variant="h6" align="left">
                                {
                                "Vantagens: " + empresa.vantagens
                                }
                            </Typography>
                        </div>

                        <div className="new-experience">
                            <Typography color="primary" variant="h6" align="left">
                                {
                                "Código: " + empresa.codigo
                                }
                            </Typography>
                        </div>
                    </Card> 
                ))
            }
        </div>
    )
}
