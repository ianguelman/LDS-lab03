from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DECIMAL
from sqlalchemy.orm import relationship


from .database import Base


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

    # items = relationship("Item", back_populates="owner")



class Empresa(Base):

    __tablename__ = "Empresa"


    cnpj = Column(String, index=True)
    nome = Column(String)
    vantages = Column(Integer)
    codigo = Column(Integer, primary_key=True, index=True)
    # owner_id = Column(Integer, ForeignKey("users.id"))

    # owner = relationship("User", back_populates="items")

class Professor(Base):

    __tablename__ = "Professor"


    cpf = Column(String, primary_key=True, index=True)
    login = Column(String)
    senha = Column(String)
    instituicaoEnsino = Column(String)
    departamento = Column(String)

    # items = relationship("Item", back_populates="owner")

class Vantagem(Base):

    __tablename__ = "Vantagem"


    codigo = Column(Integer, primary_key=True, index=True)
    codigoEmpresa = Column(Integer, ForeignKey("Empresa.codigo"))
    custo = Column(DECIMAL(precision=10, scale=2))
    descricao = Column(String)
    foto = Column(String)
