from sqlalchemy import Column, ForeignKey, Integer, String, DECIMAL

from ..database import Base
class Vantagem(Base):

    __tablename__ = "Vantagem"

    codigo = Column(Integer, primary_key=True, index=True)
    codigoEmpresa = Column(Integer, ForeignKey("Empresa.codigo"))
    custo = Column(DECIMAL(precision=10, scale=2))
    descricao = Column(String)
    foto = Column(String)
