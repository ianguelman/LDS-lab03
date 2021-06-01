from sqlalchemy.orm import Session

from ..models import TransacaoModel, AlunoModel, ProfessorModel
from ..models.schemas import TransacaoSchema, AlunoSchema, ProfessorSchema

from ..controller import AlunoController, ProfessorController

from ..view import User


from fastapi.encoders import jsonable_encoder
from typing import List

def get_transacaoes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(TransacaoModel.Transacao).offset(skip).limit(limit).all()

def create_transacao(db: Session, transacao: TransacaoSchema.TransacaoCreate, user: User):
    db_transacao = TransacaoModel.Transacao(
        loginDestinatario = transacao.loginDestinatario, 
        loginRemetente = transacao.loginRemetente,
        valor = transacao.valor,
        motivo = transacao.motivo, )
    if "RESGATE" not in transacao.motivo: 
        creditAluno(db, transacao.loginDestinatario, transacao.valor)
    debit(db, transacao.loginRemetente, transacao.valor, user.tipo)
    db.add(db_transacao)
    db.commit()
    db.refresh(db_transacao)
    return db_transacao

def debit(db: Session, loginRemetente: str, valor: float, tipo: str):
    if tipo == "aluno":
        return db.query(AlunoModel.Aluno).filter(AlunoModel.Aluno.login == loginRemetente)\
            .update({AlunoModel.Aluno.saldo: AlunoModel.Aluno.saldo - valor}, synchronize_session = False)
    elif tipo == "professor":
        return db.query(ProfessorModel.Professor).filter(ProfessorModel.Professor.login == loginRemetente)\
            .update({ProfessorModel.Professor.saldo: ProfessorModel.Professor.saldo - valor}, synchronize_session = False)


def creditAluno(db: Session, loginDestinatario: str, valor: float):
    return db.query(AlunoModel.Aluno).filter(AlunoModel.Aluno.login == loginDestinatario)\
        .update({AlunoModel.Aluno.saldo: AlunoModel.Aluno.saldo + valor}, synchronize_session = False)

def get_extrato(db: Session, login: str):
    return db.query(TransacaoModel.Transacao).filter(TransacaoModel.Transacao.loginRemetente == login).all() + db.query(TransacaoModel.Transacao).filter(TransacaoModel.Transacao.loginDestinatario == login).all()

