from sqlalchemy import Column, String, Integer, Float
from sqlalchemy.sql.sqltypes import BigInteger


from ..database import Base


class Transacao(Base):

    __tablename__ = "Transacao"

    id = Column(Integer, primary_key=True)
    loginDestinatario = Column(String)
    loginRemetente = Column(String)
    valor = Column(Float)
    motivo = Column(String)

    # items = relationship("Item", back_populates="owner")
