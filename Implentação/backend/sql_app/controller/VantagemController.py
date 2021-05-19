from sqlalchemy.orm import Session

from . import models, schemas

def get_vantagems(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.vantagem).offset(skip).limit(limit).all()

def create_vantagem(db: Session, vantagem: schemas.vantagemCreate):
    db_vantagem = models.vantagem(
        codigo = vantagem.codigo,
        codigoEmpresa = vantagem.codigoEmpresa,
        custo = vantagem.custo,
        descricao = vantagem.descricao,
        foto = vantagem.foto
    )
    db.add(db_vantagem)
    db.commit()
    db.refresh(db_vantagem)
    return db_vantagem