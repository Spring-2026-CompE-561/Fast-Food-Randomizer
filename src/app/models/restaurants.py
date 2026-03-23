from sqlalchemy import Column, Integer, String, DateTime
from database import Base

class Restaurant(Base):
    __tablename__ = 'restaurants'