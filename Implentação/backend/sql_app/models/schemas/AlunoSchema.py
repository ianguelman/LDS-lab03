from typing import List, Optional

from pydantic import BaseModel

class AlunoBase(BaseModel):
    cpf: str
    login: str
    email: str
    senha: str
    rg: str
    endereco: str
    instituicaoEnsino: str
    curso: str
    saldo: int

class AlunoCreate(AlunoBase):
    pass

class Aluno(AlunoBase):
    cpf: str
    login: str
    email: str
    senha: str
    rg: str
    endereco: str
    instituicaoEnsino: str
    curso: str
    saldo: int

    class Config:
        orm_mode = True