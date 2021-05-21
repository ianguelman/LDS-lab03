from typing import List, Optional

from pydantic import BaseModel

class TransacaoBase(BaseModel):
    id: int
    loginAluno: str 
    loginProfessor: str 
    valor: float

class TransacaoCreate(TransacaoBase):
    pass

class Transacao(TransacaoBase):
    id: int
    loginAluno: str 
    loginProfessor: str 
    valor: float

    class Config:
        orm_mode = True