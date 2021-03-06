from sqlalchemy import Column, String, Integer

from ..database import Base

class Aluno(Base):

    __tablename__ = "Aluno"

    cpf = Column(String, primary_key=True, index=True)
    login = Column(String)
    email = Column(String)
    senha = Column(String)
    rg = Column(String)
    endereco = Column(String)
    instituicaoEnsino = Column(String)
    curso = Column(String)
    saldo = Column(Integer)

    # items = relationship("Item", back_populates="owner")
    