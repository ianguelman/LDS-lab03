from sqlalchemy.orm import Session

from ..models import TransacaoModel, AlunoModel, ProfessorModel
from ..models.schemas import TransacaoSchema, AlunoSchema, ProfessorSchema

from ..controller import AlunoController, ProfessorController


from fastapi.encoders import jsonable_encoder
from typing import List

def get_transacaoes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(TransacaoModel.Transacao).offset(skip).limit(limit).all()

def create_transacao(db: Session, transacao: TransacaoSchema.TransacaoCreate):
    db_transacao = TransacaoModel.Transacao(
        loginAluno = transacao.loginAluno, 
        loginProfessor = transacao.loginProfessor,
        valor = transacao.valor,
    )
    db_aluno = creditAluno(db, transacao.loginAluno, transacao.valor)
    db_professor = debitProfessor(db, transacao.loginProfessor, transacao.valor)
    db.add(db_transacao)
    db.commit()
    db.refresh(db_transacao)
    return db_transacao

def debitAluno(db: Session, loginAluno: str, valor: float):
    return db.query(AlunoModel.Aluno).filter(AlunoModel.Aluno.login == loginAluno)\
        .update({AlunoModel.Aluno.saldo: AlunoModel.Aluno.saldo - valor}, synchronize_session = False)


def creditAluno(db: Session, loginAluno: str, valor: float):
    return db.query(AlunoModel.Aluno).filter(AlunoModel.Aluno.login == loginAluno)\
        .update({AlunoModel.Aluno.saldo: AlunoModel.Aluno.saldo + valor}, synchronize_session = False)

def debitProfessor(db: Session, loginProfessor: str, valor: float):
    return db.query(ProfessorModel.Professor).filter(ProfessorModel.Professor.login == loginProfessor)\
        .update({ProfessorModel.Professor.saldo: ProfessorModel.Professor.saldo - valor}, synchronize_session = False)
