from sqlalchemy.orm import Session

from . import models, schemas

def get_empresas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.empresa).offset(skip).limit(limit).all()

def create_empresa(db: Session, empresa: schemas.empresaCreate):
    db_empresa = models.empresa(
        cnpj = empresa.cnpj,
        nome = empresa.nome,
        vantages = empresa.vantages,
        codigo = empresa.codigo,
    )
    db.add(db_empresa)
    db.commit()
    db.refresh(db_empresa)
    return db_empresa