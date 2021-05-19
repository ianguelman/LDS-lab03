from sqlalchemy.orm import Session

from . import models, schemas

def get_professors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.professor).offset(skip).limit(limit).all()

def create_professor(db: Session, professor: schemas.professorCreate):
    db_professor = models.professor(
        cpf = professor.cpf,
        login = professor.login, 
        senha = professor.senha,
        instituicaoEnsino = professor.instituicaoEnsino,
        dpartamento = professor.dpartamento,
    )
    db.add(db_professor)
    db.commit()
    db.refresh(db_professor)
    return db_professor