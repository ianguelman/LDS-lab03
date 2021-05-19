import React, { useEffect, useState } from 'react'
import { TextField, Card, Paper, Typography, Button } from '@material-ui/core';
import './Default.sass';
import api from '../api';

export default function Professores() {
    const [professores, setProfessores] = useState([]);

    async function getProfessores() {
        try {
            const response = await api.get('/professores');
            setProfessores(response.data);
        } catch {
            window.alert('Erro ao retornar os dados dos professores');
        }
    }
    useEffect(() => {
        async function didMount() {
            await getProfessores();
        }
        didMount();
    }, []);
    return (
        <div className="professores">
            {
                professores.map((professores) => (
                    <Card className="flex-to-start account-card" elevation={10}>
                        <div className="new-experience">
                            <Typography color="primary" variant="h6" align="left">
                                {
                                "Login: " + professores.login
                                }
                            </Typography>
                        </div>

                        <div className="new-experience">
                            <Typography color="primary" variant="h6" align="left">
                                {
                                "CPF: " + professores.cpf
                                }
                            </Typography>
                        </div>

                        <div className="new-experience">
                            <Typography color="primary" variant="h6" align="left">
                                {
                                "Intituição: " + professores.instituicaoEnsino
                                }
                            </Typography>
                        </div>

                        <div className="new-experience">
                            <Typography color="primary" variant="h6" align="left">
                                {
                                "Departamento: " + professores.departamento
                                }
                            </Typography>
                        </div>
                    </Card> 
                ))
            }
        </div>
    )
}
