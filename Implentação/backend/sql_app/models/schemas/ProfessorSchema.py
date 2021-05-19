from typing import List, Optional

from pydantic import BaseModel

class ProfessorBase(BaseModel):
    cpf: str
    login: str
    senha: str
    instituicaoEnsino: str
    departamento: str

class ProfessorCreate(ProfessorBase):
    pass

class Professor(ProfessorBase):
    cpf: str
    login: str
    senha: str
    instituicaoEnsino: str
    departamento: str

    class Config:
        orm_mode = True