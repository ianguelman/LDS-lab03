from typing import List

from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session
from ..controller import AlunoController, EmpresaController, ProfessorController, VantagemController, TransacaoController
from ..database import SessionLocal, engine

from ..models import AlunoModel, EmpresaModel, ProfessorModel, VantagemModel, TransacaoModel
from ..models.schemas import AlunoSchema, EmpresaSchema, ProfessorSchema, VantagemSchema, TransacaoSchema

from .User import User

AlunoModel.Base.metadata.create_all(bind=engine)
EmpresaModel.Base.metadata.create_all(bind=engine)
ProfessorModel.Base.metadata.create_all(bind=engine)
VantagemModel.Base.metadata.create_all(bind=engine)
TransacaoModel.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins='http://*',
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/alunos/")
def create_aluno(aluno: AlunoSchema.AlunoCreate, db: Session = Depends(get_db)):
    return AlunoController.create_aluno(db=db, aluno=aluno)

@app.get("/alunos/", response_model=List[AlunoSchema.Aluno])
def read_alunos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    alunos = AlunoController.get_alunos(db, skip=skip, limit=limit)
    return alunos

@app.post("/professores/")
def create_professor(professor: ProfessorSchema.ProfessorCreate, db: Session = Depends(get_db)):
    return ProfessorController.create_professor(db=db, professor=professor)

@app.get("/professores/", response_model=List[ProfessorSchema.Professor])
def read_professores(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    professores = ProfessorController.get_professores(db, skip=skip, limit=limit)
    return professores

@app.post("/empresas/")
def create_empresa(empresa: EmpresaSchema.EmpresaCreate, db: Session = Depends(get_db)):
    return EmpresaController.create_empresa(db=db, empresa=empresa)

@app.get("/empresas/", response_model=List[EmpresaSchema.Empresa])
def read_empresas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    empresas = EmpresaController.get_empresas(db, skip=skip, limit=limit)
    return empresas

@app.post("/vantagens/")
def create_vantagem(vantagem: VantagemSchema.VantagemCreate, db: Session = Depends(get_db)):
    return VantagemController.create_vantagem(db=db, vantagem=vantagem)

@app.get("/vantagens/", response_model=List[VantagemSchema.Vantagem])
def read_vantagens(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    vantagens = VantagemController.get_vantagens(db, skip=skip, limit=limit)
    return vantagens

@app.post("/login/")
def login(user: User, db: Session = Depends(get_db)):
    if user.tipo == 'professor':
        data = ProfessorController.get_professores(db, skip=0, limit=100)
    elif user.tipo == 'aluno':
        data = AlunoController.get_alunos(db, skip=0, limit=100)
    # elif user.tipo == 'empresa':

    for item in data:
        if item.login == user.login and item.senha == user.password:
            return {'response':'true'}
            
    return {'response':'false'}

@app.post("/transacao/")
def transacao(transacao: TransacaoSchema.TransacaoCreate, db: Session = Depends(get_db)):
   return TransacaoController.create_transacao(db, transacao)

@app.post("/saldo/")
def saldo(user: User, db: Session = Depends(get_db)):
    if user.tipo == 'professor':
        return {'saldo': ProfessorController.get_professor(db, user.login).saldo}
    elif user.tipo == 'aluno':
        return {'saldo': AlunoController.get_aluno(db, user.login).saldo}