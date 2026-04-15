from sqlalchemy import Column, Integer, String
from database import Base

class Participante(Base):
    __tablename__ = "participantes"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), index=True)
    email = Column(String(100), unique=True, index=True)
    edad = Column(Integer)
    ciudad = Column(String(100))
