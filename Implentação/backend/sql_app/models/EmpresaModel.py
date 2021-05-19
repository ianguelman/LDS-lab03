from sqlalchemy import Column, String, Integer

from ..database import Base

class Empresa(Base):

    __tablename__ = "Empresa"

    cnpj = Column(String, index=True)
    nome = Column(String)
    vantagens = Column(Integer)
    codigo = Column(Integer, primary_key=True, index=True)
    # owner_id = Column(Integer, ForeignKey("users.id"))

    # owner = relationship("User", back_populates="items")