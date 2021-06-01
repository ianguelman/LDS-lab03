from sqlalchemy import Column, ForeignKey, Integer, String, DECIMAL

from ..database import Base
class Vantagem(Base):

    __tablename__ = "Vantagem"

    id = Column(Integer, primary_key=True)
    loginEmpresa = Column(String)
    custo = Column(DECIMAL(precision=10, scale=2))
    descricao = Column(String)
    foto = Column(String)
    resgatadoPor = Column(String, nullable=True)
