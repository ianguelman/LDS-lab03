from typing import List, Optional

from pydantic import BaseModel

class EmpresaBase(BaseModel):
    cnpj: str
    nome: str
    vantagens: int

class EmpresaCreate(EmpresaBase):
    pass

class Empresa(EmpresaBase):
    cnpj: str
    nome: str
    vantagens: int

    class Config:
        orm_mode = True