from sqlalchemy.orm import Session

from ..models import TransacaoModel
from ..models.schemas import TransacaoSchema, AlunoSchema, ProfessorSchema

from ..controller import AlunoController, ProfessorController


from fastapi.encoders import jsonable_encoder
from typing import List

def get_transacaoes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(TransacaoModel.Transacao).offset(skip).limit(limit).all()

def create_transacao(db: Session, transacao: TransacaoSchema.TransacaoCreate):
    db_transacao = TransacaoModel.Transacao(
        id = transacao.id,
        loginAluno = transacao.loginAluno, 
        loginProfessor = transacao.loginProfessor,
        valor = transacao.valor,
    )
    db_aluno = creditAluno(db, transacao.loginAluno, transacao.valor)
    db.add(db_aluno)
    dbProfessor = debitProfessor(db, transacao.loginProfessor, transacao.valor)
    db.add(db_professor)
    db.add(db_transacao)
    db.commit()
    db.refresh(db_transacao)
    db.refresh(db_professor)
    db.refresh(db_aluno)
    return db_transacao

def debitAluno(db: Session, loginAluno: str, valor: float):
    db_aluno = list(AlunoController.get_aluno(db=db, login=loginAluno)) 
    print(jsonable_encoder(db_aluno[0]))
    return db_aluno

def creditAluno(db: Session, loginAluno: str, valor: float):
    db_aluno = list(AlunoController.get_aluno(db=db, login=loginAluno))
    print(jsonable_encoder(db_aluno[0]))
    return db_aluno

def debitProfessor(db: Session, loginProfessor: str, valor: float):
    db_professor = ProfessorController.get_professor(db, loginProfessor)
    print(jsonable_encoder(db_professor))
    return db_professor