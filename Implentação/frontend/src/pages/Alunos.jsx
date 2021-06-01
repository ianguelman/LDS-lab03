import React, { useEffect, useState } from 'react'
import { Card, Typography } from '@material-ui/core';
import './Default.sass';
import api from '../api';

export default function Alunos() {
    const [alunos, setAlunos] = useState([]);

    async function getAlunos() {
        try {
            const response = await api.get('/alunos');
            setAlunos(response.data);
        } catch {
            window.alert('Erro ao retornar os dados dos alunos');
        }
    }
    useEffect(() => {
        async function didMount() {
            await getAlunos();
        }
        didMount();
    }, []);
    return (
        <div className="page alunos">
            {
                alunos.map((aluno) => (
                    <Card className="flex-to-start account-card" elevation={10}>
                        <div className="new-experience">
                            <Typography color="primary" variant="h6" align="left">
                                {
                                "CPF: " + aluno.cpf
                                }
                            </Typography>
                        </div>

                        <div className="new-experience">
                            <Typography color="primary" variant="h6" align="left">
                                {
                                "Login: " + aluno.login
                                }
                            </Typography>
                        </div>

                        <div className="new-experience">
                            <Typography color="primary" variant="h6" align="left">
                                {
                                "Email: " + aluno.email
                                }
                            </Typography>
                        </div>

                        <div className="new-experience">
                            <Typography color="primary" variant="h6" align="left">
                                {
                                "RG: " + aluno.rg
                                }
                            </Typography>
                        </div>

                        <div className="new-experience">
                            <Typography color="primary" variant="h6" align="left">
                                {
                                "Endereco: " +  aluno.endereco
                                }
                            </Typography>
                        </div>

                        <div className="new-experience">
                            <Typography color="primary" variant="h6" align="left">
                                {
                                "Instituição de Ensino: " + aluno.instituicaoEnsino
                                }
                            </Typography>
                        </div>

                        <div className="new-experience">
                            <Typography color="primary" variant="h6" align="left">
                                {
                                "Curso: " + aluno.curso
                                }
                            </Typography>
                        </div>

                        <div className="new-experience">
                            <Typography color="primary" variant="h6" align="left">
                                {
                                "Saldo: " + aluno.saldo
                                }
                            </Typography>
                        </div>
                    </Card> 
                ))
            }
        </div>
    )
}
