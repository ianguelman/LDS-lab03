from sqlalchemy.orm import Session

from ..models import VantagemModel
from ..models.schemas import VantagemSchema

def get_vantagems(db: Session, skip: int = 0, limit: int = 100):
    return db.query(VantagemModel.Vantagem).offset(skip).limit(limit).all()

def create_vantagem(db: Session, vantagem: VantagemSchema.VantagemCreate):
    db_vantagem = VantagemModel.Vantagem(
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