from typing import List

from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

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
def create_aluno(aluno: schemas.AlunoCreate, db: Session = Depends(get_db)):
    # db_user = crud.get_user_by_email(db, email=user.email)
    # if db_user:
    #     raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_aluno(db=db, aluno=aluno)


@app.get("/alunos/", response_model=List[schemas.Aluno])
def read_alunos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    alunos = crud.get_alunos(db, skip=skip, limit=limit)
    return alunos

