from typing import List, Optional

from pydantic import BaseModel

class EmpresaBase(BaseModel):
    cnpj: str
    nome: str
    vantagens: int
    codigo: str

class EmpresaCreate(EmpresaBase):
    pass

class Empresa(EmpresaBase):
    cnpj: str
    nome: str
    vantagens: int
    codigo: str

    class Config:
        orm_mode = True