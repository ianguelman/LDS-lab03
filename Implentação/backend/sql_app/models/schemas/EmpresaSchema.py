from typing import List, Optional

from pydantic import BaseModel

class EmpresaBase(BaseModel):
    cnpj: str
    nome: str
    login: str
    senha: str

class EmpresaCreate(EmpresaBase):
    pass

class Empresa(EmpresaBase):
    cnpj: str
    nome: str
    login: str
    senha: str

    class Config:
        orm_mode = True