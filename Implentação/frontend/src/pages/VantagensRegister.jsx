import React, {useState} from 'react';
import { TextField, Card, Typography, Button } from '@material-ui/core';
import api from '../api';

export default function VantagensRegister() {
    const [vantagem, setVantagem] = useState(
        {
            custo: "",
            descricao: "",
            foto: "",
            loginEmpresa: JSON.parse(window.localStorage.getItem('user')).login,
            resgatadoPor: null,
            id:9,
        }
    );
    async function handleStoreVantagem(e) {
        e.preventDefault();
        try {
            await api.post('/vantagens', vantagem);
            window.alert("Vantagem cadastrado com sucesso!");
        } catch {
            window.alert("Erro no cadastro da Vantagem!");
        }
    }
  return (
    <>
    <div className="page">
            <Typography color="primary" variant="h4" align="left">Registrar vantagens</Typography>
            <Card className="flex-to-start account-card" elevation="10">
                <form onSubmit={handleStoreVantagem} >
                    <TextField
                        variant="outlined"
                        placeholder="Custo"
                        value={vantagem.custo}
                        onChange={(e) => setVantagem({ ...vantagem, custo: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Descrição"
                        value={vantagem.descricao}
                        onChange={(e) => setVantagem({ ...vantagem, descricao: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Foto"
                        value={vantagem.foto}
                        onChange={(e) => setVantagem({ ...vantagem, foto: e.target.value })}
                    />
                    <Button color="primary" type="submit"align="center">REGISTRAR</Button>
                </form>
            </Card>
    </div>
    </>
  );
}
