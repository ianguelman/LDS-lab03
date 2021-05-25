from sqlalchemy import Column, String, Integer, Float
from sqlalchemy.sql.sqltypes import BigInteger


from ..database import Base


class Transacao(Base):

    __tablename__ = "Transacao"

    id = Column(Integer, primary_key=True)
    loginAluno = Column(String)
    loginProfessor = Column(String)
    valor = Column(Float)

    # items = relationship("Item", back_populates="owner")
