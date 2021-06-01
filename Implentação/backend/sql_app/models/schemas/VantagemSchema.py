from typing import List, Optional

from pydantic import BaseModel

class VantagemBase(BaseModel):
    custo: float
    descricao: str
    foto: str
    id: int
    loginEmpresa: str
    resgatadoPor: Optional[str]

class VantagemCreate(VantagemBase):
    pass

class Vantagem(VantagemBase):
    custo: float
    descricao: str
    foto: str
    id: int
    loginEmpresa: str
    resgatadoPor: Optional[str]

    class Config:
        orm_mode = True