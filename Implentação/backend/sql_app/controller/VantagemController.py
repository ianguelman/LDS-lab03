from sqlalchemy.orm import Session

from ..models import VantagemModel
from ..models import AlunoModel
from ..models.schemas import VantagemSchema

def get_vantagens(db: Session, skip: int = 0, limit: int = 100):
    return db.query(VantagemModel.Vantagem).offset(skip).limit(limit).all()

def create_vantagem(db: Session, vantagem: VantagemSchema.VantagemCreate):
    db_vantagem = VantagemModel.Vantagem(
        id = vantagem.id,
        loginEmpresa = vantagem.loginEmpresa,
        custo = vantagem.custo,
        descricao = vantagem.descricao,
        foto = vantagem.foto,
        resgatadoPor = vantagem.resgatadoPor,
    )
    db.add(db_vantagem)
    db.commit()
    db.refresh(db_vantagem)
    return db_vantagem

def resgatarVantagem(db: Session, resgatadoPor: str, idVantagem: int):
    db.query(VantagemModel.Vantagem).filter(VantagemModel.Vantagem.id == idVantagem)\
        .update({VantagemModel.Vantagem.resgatadoPor: resgatadoPor}, synchronize_session = False)
    db.commit()