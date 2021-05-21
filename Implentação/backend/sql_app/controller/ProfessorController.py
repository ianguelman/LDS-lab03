from sqlalchemy.orm import Session

from ..models import ProfessorModel
from ..models.schemas import ProfessorSchema

def get_professores(db: Session, skip: int = 0, limit: int = 100):
    return db.query(ProfessorModel.Professor).offset(skip).limit(limit).all()

def get_professor(db: Session,  login: str):
    return db.query(ProfessorModel.Professor).get(login)

def create_professor(db: Session, professor: ProfessorSchema.ProfessorCreate):
    db_professor = ProfessorModel.Professor(
        cpf = professor.cpf,
        login = professor.login, 
        senha = professor.senha,
        instituicaoEnsino = professor.instituicaoEnsino,
        departamento = professor.departamento,
        saldo = professor.saldo,
    )
    db.add(db_professor)
    db.commit()
    db.refresh(db_professor)
    return db_professor

