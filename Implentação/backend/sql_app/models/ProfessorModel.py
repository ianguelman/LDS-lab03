from sqlalchemy import Column, String, Integer


from ..database import Base


class Professor(Base):

    __tablename__ = "Professor"


    cpf = Column(String, primary_key=True, index=True)
    login = Column(String)
    senha = Column(String)
    instituicaoEnsino = Column(String)
    departamento = Column(String)
    saldo = Column(Integer)

    # items = relationship("Item", back_populates="owner")
