from pydantic import BaseModel
from typing import Optional

class ParticipanteBase(BaseModel):
    nombre: str
    email: str
    edad: int
    ciudad: str

class ParticipanteCreate(ParticipanteBase):
    pass

class Participante(ParticipanteBase):
    id: int

    class Config:
        from_attributes = True
