from sqlalchemy import Column, String, Integer

from ..database import Base

class Empresa(Base):

    __tablename__ = "Empresa"

    cnpj = Column(String, index=True, primary_key=True)
    nome = Column(String)
    login = Column(String)
    senha = Column(String)

    # owner_id = Column(Integer, ForeignKey("users.id"))

    # owner = relationship("User", back_populates="items")