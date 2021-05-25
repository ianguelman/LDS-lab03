from typing import List, Optional

from pydantic import BaseModel

class TransacaoBase(BaseModel):
    id: int
    loginDestinatario: str 
    loginRemetente: str 
    valor: float
    motivo: str

class TransacaoCreate(TransacaoBase):
    pass

class Transacao(TransacaoBase):
    id: int
    loginDestinatario: str 
    loginRemetente: str 
    valor: float
    motivo: str

    class Config:
        orm_mode = True