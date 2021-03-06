from sqlalchemy.orm import Session

from ..models import AlunoModel
from ..models.schemas import AlunoSchema

def get_alunos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(AlunoModel.Aluno).offset(skip).limit(limit).all()

def get_aluno(db: Session, login: str):
    return db.query(AlunoModel.Aluno).filter(AlunoModel.Aluno.login == login).all()[0]

def create_aluno(db: Session, aluno: AlunoSchema.AlunoCreate):
    db_aluno = AlunoModel.Aluno(
        cpf = aluno.cpf,
        login = aluno.login,
        email = aluno.email,
        senha = aluno.senha,
        rg = aluno.rg,
        endereco = aluno.endereco,
        instituicaoEnsino = aluno.instituicaoEnsino,
        curso = aluno.curso,
        saldo = aluno.saldo,
    )
    db.add(db_aluno)
    db.commit()
    db.refresh(db_aluno)
    return db_aluno