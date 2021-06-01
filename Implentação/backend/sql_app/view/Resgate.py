from pydantic import BaseModel

class Resgate(BaseModel):
    resgatadoPor: str
    idVantagem: int
    custo: str
    destinatario: str
    descricao: str