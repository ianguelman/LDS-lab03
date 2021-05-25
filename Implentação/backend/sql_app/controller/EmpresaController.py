from sqlalchemy.orm import Session

from ..models import EmpresaModel
from ..models.schemas import EmpresaSchema


def get_empresas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(EmpresaModel.Empresa).offset(skip).limit(limit).all()

def create_empresa(db: Session, empresa: EmpresaSchema.EmpresaCreate):
    db_empresa = EmpresaModel.Empresa(
        cnpj = empresa.cnpj,
        nome = empresa.nome,
        vantagens = empresa.vantagens,
    )
    db.add(db_empresa)
    db.commit()
    db.refresh(db_empresa)
    return db_empresa